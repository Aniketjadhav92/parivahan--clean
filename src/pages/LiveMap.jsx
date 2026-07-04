import { useState, useEffect } from 'react'

const STOPS = [
  { name: 'Patna Bus Stand',  time: '06:30 AM', done: true },
  { name: 'Danapur Chowk',   time: '07:05 AM', done: true },
  { name: 'Buxar Junction',  time: 'ETA 08:35', done: false, current: true },
  { name: 'Ghazipur Road',   time: 'ETA 09:40', done: false },
  { name: 'Varanasi Cantt.', time: 'ETA 10:50', done: false },
]

export default function LiveMap({ go, goBack, booking, search }) {
  const [busPos, setBusPos] = useState(28) // percentage across road
  const [speed,  setSpeed]  = useState(68)

  // Simulate bus moving slowly
  useEffect(() => {
    const t = setInterval(() => {
      setBusPos(p => p >= 72 ? 72 : p + 0.05)
      setSpeed(Math.floor(60 + Math.random() * 20))
    }, 300)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fadeIn">
      {/* Header */}
      <div style={{ background: '#1a73e8', padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, padding: 0 }}>←</button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Live Tracking</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{search?.from} → {search?.to}</div>
          </div>
        </div>
        <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 20 }}>
          🟢 LIVE
        </span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Simple map */}
        <div style={{ background: '#e8f4ea', border: '1px solid #c8e6c9', borderRadius: 12, height: 200, position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
          {/* Sky */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '55%', background: '#d0e8f5' }} />

          {/* Road */}
          <div style={{ position: 'absolute', bottom: '25%', left: 0, right: 0, height: 18, background: '#90a4ae', borderRadius: 2 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: '#fff', opacity: 0.3, transform: 'translateY(-50%)', backgroundImage: 'repeating-linear-gradient(90deg,#fff 0,#fff 20px,transparent 20px,transparent 40px)' }} />
          </div>

          {/* City labels */}
          <div style={{ position: 'absolute', bottom: '44%', left: '6%', fontSize: 10, fontWeight: 700, color: '#1a73e8' }}>
            📍 {search?.from || 'Patna'}
          </div>
          <div style={{ position: 'absolute', bottom: '44%', right: '4%', fontSize: 10, fontWeight: 700, color: '#2e7d32' }}>
            📍 {search?.to || 'Varanasi'}
          </div>

          {/* Progress line */}
          <div style={{ position: 'absolute', bottom: '32%', left: '8%', width: `${busPos - 8}%`, height: 4, background: '#1a73e8', borderRadius: 2 }} />

          {/* Bus */}
          <div style={{
            position: 'absolute', bottom: '30%', left: `${busPos}%`,
            fontSize: 26, transform: 'translateX(-50%)',
            transition: 'left 0.3s linear',
          }}>
            🚌
          </div>

          {/* Trees decorative */}
          {[15, 40, 85].map(x => (
            <div key={x} style={{ position: 'absolute', bottom: '42%', left: `${x}%`, fontSize: 18 }}>🌳</div>
          ))}

          {/* Speed badge */}
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
            {speed} km/h
          </div>
        </div>

        {/* Bus info */}
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{booking?.bus?.name || 'Bihar Roadways'}</div>
            <span style={{ fontSize: 12, color: '#2e7d32', background: '#e8f5e9', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>On Time</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
            {[['🚀', `${speed} km/h`, 'Speed'], ['⏱', '~2h 15m', 'ETA'], ['📍', 'Near Buxar', 'Location']].map(([ic, val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontSize: 20 }}>{ic}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{val}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Route stops */}
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Route Stops</div>
          {STOPS.map((stop, i) => (
            <div key={stop.name} style={{ display: 'flex', gap: 14, paddingBottom: i < STOPS.length - 1 ? 16 : 0 }}>
              {/* dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                  background: stop.done ? '#2e7d32' : stop.current ? '#1a73e8' : '#ddd',
                  border: stop.current ? '3px solid #90caf9' : 'none',
                }} />
                {i < STOPS.length - 1 && (
                  <div style={{ width: 2, flex: 1, marginTop: 3, background: stop.done ? '#c8e6c9' : '#e0e0e0' }} />
                )}
              </div>
              {/* text */}
              <div style={{ paddingBottom: 2 }}>
                <div style={{ fontSize: 14, fontWeight: stop.current ? 700 : 500, color: stop.done ? '#555' : stop.current ? '#1a73e8' : '#888' }}>
                  {stop.name} {stop.current && <span style={{ fontSize: 11, background: '#e3f2fd', color: '#1a73e8', padding: '1px 7px', borderRadius: 10, marginLeft: 4 }}>Next</span>}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{stop.time}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => go('home')} style={{ width: '100%', marginTop: 16, padding: 13, background: '#f5f5f5', color: '#333', border: 'none', borderRadius: 8, fontSize: 15 }}>
          Back to Home
        </button>
      </div>
    </div>
  )
}
