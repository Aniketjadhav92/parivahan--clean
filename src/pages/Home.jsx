import { useState } from 'react'
import logo from '../images/logo.png'
import screenshotImage from '../images/Screenshot 2026-04-08 211906.png'

const CITIES = ['Vita', 'Mayni', 'Sangli', 'Tasgaon', 'Karad', 'Kadegaon', 'Kolhapur', 'Satara', 'Khanapur', 'Jat']

export default function Home({ go, search, setSearch, user }) {
  const [from, setFrom] = useState(search.from || '')
  const [to,   setTo]   = useState(search.to   || '')
  const [date, setDate] = useState(search.date  || '')
  const [err,  setErr]  = useState('')

  const swap = () => { setFrom(to); setTo(from) }

  const handleSearch = () => {
    if (!from || !to || !date) { setErr('Please fill all fields'); return }
    if (from === to)           { setErr('From and To cannot be the same'); return }
    setErr('')
    setSearch({ from, to, date })
    go('buslist')
  }

  const inp = {
    width: '100%', padding: '12px 14px',
    border: '1px solid #ddd', borderRadius: 8,
    fontSize: 15, background: '#fafafa',
  }

  return (
    <div className="fadeIn">
      {/* Header */}
      <div style={{ background: '#77879e', padding: '24px 20px 40px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={logo} alt="LaalParii logo" style={{ width: 52, height: 'auto', borderRadius: 16, background: 'rgba(255,255,255,0.15)', padding: 10 }} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>LaalParii</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 , fontFamily: 'Arial, sans-serif' }}>Book your bus ticket</div>
          </div>
        </div>
        {user && (
          <button
            onClick={() => go('profile')}
            style={{
              background: 'none',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              overflow: 'hidden'
            }}
            title="Profile"
          >
            <img
              src={screenshotImage}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fff'
              }}
            />
          </button>
        )}
      </div>

      {/* Search card */}
      <div style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.1)', margin: '-20px 16px 0', background: '#fff', borderRadius: 12, padding: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 , fontFamily: 'Arial, sans-serif' }}>Where are you going    ?</div>

        {/* From */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: 28, fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>FROM</label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={inp}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Swap button */}
        <div style={{ textAlign: 'center', marginBottom: 10}}>
          <button onClick={swap} style={{marginTop: 22 , background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 20, padding: '4px 16px', fontSize: 18, color: '#555' }}>⇅</button>
        </div>

        {/* To */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>TO</label>
          <select value={to} onChange={e => setTo(e.target.value)} style={inp}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Date */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>DATE</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inp}
            min={new Date().toISOString().split('T')[0]} />
        </div>

        {err && <div style={{ color: 'red', fontSize: 13, marginBottom: 10 }}>{err}</div>}

        <button onClick={handleSearch} style={{
          width: '100%', padding: '14px', background: '#77879e',
          color: '#fff', border: 'none', borderRadius: 8,
          fontSize: 16, fontWeight: 600,
        }}>
          Search Buses
        </button>
      </div>

      {/* Popular routes */}
      <div style={{ padding: '28px 16px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: '#333', fontFamily: 'Arial, sans-serif'  }}>Popular Routes</div>
        {[
          ['Sangli', 'Vita', '₹180'],
          ['Karad', 'Vita', '₹120'],
          ['Tasgaon', 'Vita', '₹160'],
          ['Mayni', 'Vita', '₹110'],
        ].map(([f, t, p]) => (
          <div key={f + t} onClick={() => { 
            setFrom(f); 
            setTo(t); 
            setDate(new Date().toISOString().split('T')[0]); // Set today's date
          }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
            <span style={{ fontSize: 14 }}>{f} → {t}</span>
            <span style={{ fontSize: 14, color: '#1a73e8', fontWeight: 600 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
