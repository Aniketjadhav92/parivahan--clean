import { useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'

const METHODS = [
  { id: 'upi',  icon: '📱', label: 'UPI (GPay / PhonePe / Paytm)' },
  { id: 'card', icon: '💳', label: 'Debit / Credit Card' },
  { id: 'net',  icon: '🏦', label: 'Net Banking' },
]

export default function Payment({ go, goBack, booking }) {
  const [method, setMethod] = useState('upi')
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  // � DOWNLOAD PDF TICKET
  const downloadPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.text('Bus Ticket', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.text(`Booking ID: PRV-${Math.floor(Math.random() * 90000) + 10000}`, 20, 40)
    doc.text(`Name: ${booking?.name}`, 20, 50)
    doc.text(`Mobile: ${booking?.mobile}`, 20, 60)
    doc.text(`Email: ${booking?.email}`, 20, 70)
    doc.text(`Bus: ${booking?.bus?.busName}`, 20, 80)
    doc.text(`Route: ${booking?.bus?.from} → ${booking?.bus?.to}`, 20, 90)
    doc.text(`Seats: ${booking?.seats?.join(', ')}`, 20, 100)
    doc.text(`Date: ${booking?.date}`, 20, 110)
    doc.text(`Total: ₹${booking?.total}`, 20, 120)
    
    doc.save('ticket.pdf')
  }

  // �💳 MANUAL PAYMENT FUNCTION (for testing)
  const pay = async () => {
    setLoading(true)

    try {
      const routeId = booking?.routeId || booking?.bus?.routeId

      if (!routeId) {
        alert('Invalid booking data: missing routeId')
        setLoading(false)
        return
      }

      await axios.post('http://localhost:5000/api/bookings/book', {
        routeId,
        seats: booking.seats,
        totalPrice: booking.total,
        date: booking.date,
        name: booking.name,
        mobile: booking.mobile,
        email: booking.email
      })

      setPaid(true)
    } catch (err) {
      console.error('Booking error:', err)
      alert('Booking failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  // 🎉 SUCCESS SCREEN
  if (paid) {
    return (
      <div className="fadeIn" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 64, margin: '40px 0 16px' }}>✅</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#2e7d32' }}>
          Payment Successful!
        </div>
        <div style={{ fontSize: 14, color: '#666', marginTop: 6 }}>
          Ticket booked for {booking?.name}
        </div>

        {/* Ticket Card */}
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 12,
          padding: 20,
          marginTop: 28,
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#888' }}>
            BOOKING DETAILS
          </div>

          <div style={{ marginTop: 10 }}>
            <p><b>Bus:</b> {booking?.bus?.busName}</p>
            <p><b>Route:</b> {booking?.bus?.from} → {booking?.bus?.to}</p>
            <p><b>Seats:</b> {booking?.seats?.join(', ')}</p>
            <p><b>Name:</b> {booking?.name}</p>
            <p><b>Mobile:</b> {booking?.mobile}</p>
            <p><b>Total:</b> ₹{booking?.total}</p>
          </div>

          <div style={{
            marginTop: 16,
            padding: 12,
            background: '#e8f5e9',
            borderRadius: 8,
            textAlign: 'center',
            fontWeight: 600,
            color: '#2e7d32'
          }}>
            🎫 Booking ID: PRV-{Math.floor(Math.random() * 90000) + 10000}
          </div>
        </div>

        <button
          onClick={downloadPDF}
          style={{
            width: '100%',
            marginTop: 16,
            padding: 14,
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600
          }}
        >
          📄 Download Ticket PDF
        </button>

        <button
          onClick={() => go('home')}
          style={{
            width: '100%',
            marginTop: 8,
            padding: 14,
            background: '#1a73e8',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // 💳 PAYMENT UI
  return (
    <div className="fadeIn">
      {/* Header */}
      <div style={{
        background: '#1a73e8',
        padding: '16px 20px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <button
          onClick={goBack}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20 }}
        >
          ←
        </button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>
          Payment
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Summary */}
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 10,
          padding: 16,
          marginBottom: 14
        }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>
            Order Summary
          </div>

          <p><b>Bus:</b> {booking?.bus?.busName}</p>
          <p><b>Seats:</b> {booking?.seats?.join(', ')}</p>
          <p><b>Name:</b> {booking?.name}</p>

          <div style={{
            marginTop: 10,
            fontWeight: 700,
            fontSize: 16,
            color: '#1a73e8'
          }}>
            Total: ₹{booking?.total}
          </div>
        </div>

        {/* Payment methods (UI only) */}
        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 10,
          padding: 16,
          marginBottom: 16
        }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>
            Select Payment Method
          </div>

          {METHODS.map(m => (
            <div
              key={m.id}
              onClick={() => setMethod(m.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                border: `2px solid ${method === m.id ? '#1a73e8' : '#ddd'}`,
                borderRadius: 8,
                marginBottom: 8,
                cursor: 'pointer',
                background: method === m.id ? '#f0f7ff' : '#fff'
              }}
            >
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <span>{m.label}</span>
              {method === m.id && <span style={{ marginLeft: 'auto' }}>✔</span>}
            </div>
          ))}
        </div>

        {/* Pay button */}
        <button
          onClick={pay}
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            background: loading ? '#90caf9' : '#1a73e8',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          {loading ? "Processing..." : `Pay ₹${booking?.total}`}
        </button>

        <div style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#999',
          marginTop: 10
        }}>
          🔒 Secure Payment Powered by Razorpay
        </div>

      </div>
    </div>
  )
}
