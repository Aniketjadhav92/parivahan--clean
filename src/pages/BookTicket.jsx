import { useState, useEffect } from 'react'
import axios from 'axios'

const COLS = ['A', 'B', 'C', 'D']

export default function BookTicket({ go, goBack, bus, search, setBooking }) {

  const [seats, setSeats] = useState([])
  const [picked, setPicked] = useState([])
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')

  // 🔥 FETCH SEATS FROM BACKEND
  useEffect(() => {

    const fetchSeats = async () => {
      try {

        const res = await axios.get(
          'http://localhost:5000/api/bookings/seat',
          {
            params: {
             routeId: bus.routeId,
              date: search.date
            }
          }
        )

        const backendSeats = res.data.seats

        // convert flat seats → grid
        const grid = []

        for (let i = 0; i < 8; i++) {
          grid.push(
            backendSeats
              .slice(i * 4, i * 4 + 4)
              .map(s => s.isBooked ? 1 : 0)
          )
        }

        setSeats(grid)

      } catch (err) {
        console.error("Seat fetch error:", err)
      }
    }

    if (bus?.id) {
      fetchSeats()
    }

  }, [bus, search.date])

  // 🔥 TOGGLE SEAT
  const toggleSeat = (r, c) => {

    if (seats[r][c] === 1) return

    const id = `${r + 1}${COLS[c]}`

    const newSeats = seats.map(row => [...row])

    if (seats[r][c] === 2) {

      newSeats[r][c] = 0

      setPicked(prev =>
        prev.filter(s => s !== id)
      )

    } else {

      newSeats[r][c] = 2

      setPicked(prev => [...prev, id])
    }

    setSeats(newSeats)
  }

  const total = picked.length * (bus?.price || 0)

  // 🔥 PROCEED TO PAYMENT
  const proceed = () => {

    if (picked.length === 0) {
      setErr('Select at least one seat')
      return
    }

    if (!name || !mobile) {
      setErr('Name and mobile are required')
      return
    }

    setErr('')

    setBooking({
      bus,
      seats: picked,
      name,
      mobile,
      email,
      total,
      date: search.date
    })

    go('payment')
  }

  const inp = {
    width: '100%',
    padding: '11px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 10
  }

  return (
    <div className="fadeIn">

      {/* HEADER */}
      <div
        style={{
          background: '#1a73e8',
          padding: '16px 20px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >

        <button
          onClick={goBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 20
          }}
        >
          ←
        </button>

        <div>
          <div style={{ fontWeight: 700 }}>
            {bus?.busName}
          </div>

          <div
            style={{
              fontSize: 13,
              opacity: 0.85
            }}
          >
            {search.from} → {search.to} · {bus?.departure}
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* SEAT MAP */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16
          }}
        >

          <div
            style={{
              fontWeight: 600,
              marginBottom: 14
            }}
          >
            Select Seat
          </div>

          {/* DRIVER */}
          <div
            style={{
              background: '#f5f5f5',
              borderRadius: 8,
              padding: 8,
              textAlign: 'center',
              marginBottom: 12
            }}
          >
            🕹️ Driver Cabin
          </div>

          {/* SEATS */}
          {seats.map((row, r) => (

            <div
              key={r}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 10
              }}
            >

              {/* LEFT SIDE */}
              <div style={{ display: 'flex', gap: 8 }}>

                {[0, 1].map(c => {

                  const t = seats[r][c]

                  return (
                    <div
                      key={c}
                      onClick={() => toggleSeat(r, c)}
                      style={{
                        width: 42,
                        height: 38,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: t === 1 ? 'not-allowed' : 'pointer',
                        background:
                          t === 1
                            ? '#e0e0e0'
                            : t === 2
                              ? '#2196f3'
                              : '#4caf50',
                        color: '#fff',
                        fontWeight: 600
                      }}
                    >
                      {r + 1}{COLS[c]}
                    </div>
                  )
                })}
              </div>

              {/* RIGHT SIDE */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'flex-end'
                }}
              >

                {[2, 3].map(c => {

                  const t = seats[r][c]

                  return (
                    <div
                      key={c}
                      onClick={() => toggleSeat(r, c)}
                      style={{
                        width: 42,
                        height: 38,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: t === 1 ? 'not-allowed' : 'pointer',
                        background:
                          t === 1
                            ? '#e0e0e0'
                            : t === 2
                              ? '#2196f3'
                              : '#4caf50',
                        color: '#fff',
                        fontWeight: 600
                      }}
                    >
                      {r + 1}{COLS[c]}
                    </div>
                  )
                })}
              </div>

            </div>
          ))}

          {/* SELECTED */}
          {picked.length > 0 && (

            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: '1px solid #eee'
              }}
            >
              <div style={{ marginBottom: 6 }}>
                Seats:
                <strong style={{ color: '#1a73e8' }}>
                  {' '} {picked.join(', ')}
                </strong>
              </div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16
                }}
              >
                Total: ₹{total}
              </div>
            </div>
          )}
        </div>

        {/* PASSENGER FORM */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16
          }}
        >

          <input
            style={inp}
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            style={inp}
            placeholder="Mobile"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />

          <input
            style={inp}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {err && (
          <div
            style={{
              color: 'red',
              marginBottom: 10
            }}
          >
            {err}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={proceed}
          style={{
            width: '100%',
            padding: 14,
            background: '#1a73e8',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          Proceed →
        </button>

      </div>
    </div>
  )
}