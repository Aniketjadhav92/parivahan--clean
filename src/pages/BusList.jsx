import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BusList({ go, goBack, search, setBus }) {
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const select = (bus) => {
    setBus(bus)
    go('book')
  }

  useEffect(() => {
    const fetchBuses = async () => {
      if (!search.from || !search.to) return

      setLoading(true)
      setError('')

      try {
        const response = await axios.get('http://localhost:5000/api/routes', {
          params: {
            from: search.from.trim(),
            to: search.to.trim(),
          }
        })

        const results = response.data.flatMap(route =>
  route.departures.map((departure, index) => ({
    id: `${route._id}-${index}`,
    routeId: route._id,
    routeName: route.routeName,
    from: route.from,
    to: route.to,
    duration: route.duration,
    ...departure,
  }))
)

        setBuses(results)

      } catch (err) {
        console.error('Failed to load routes:', err)
        const message =
          err.response?.data?.message ||
          err.message ||
          'Unable to load buses. Please try again.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchBuses()
  }, [search.from, search.to])

  return (
    <div className="fadeIn">
      {/* Header */}
      <div style={{ background: '#1a73e8', padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, padding: 0 }}>
          ←
        </button>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            {search.from} → {search.to}
          </div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            {search.date} · {buses.length} buses
          </div>
        </div>
      </div>

      {/* Bus list */}
      <div style={{ padding: 16 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>Loading buses…</div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#d32f2f' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>{error}</div>
          </div>
        ) : buses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>No buses found</div>
            <div style={{ fontSize: 14 }}>Try searching for a different route</div>
          </div>
        ) : (
          buses.map(bus => (
            <div key={bus.id} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              
              {/* Name + Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{bus.busName}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{bus.type}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#1a73e8' }}>
                  ₹{bus.price}
                </div>
              </div>

              {/* Timing */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>{bus.departure} ({search.from})</div>
                <div>{bus.duration}</div>
                <div>{bus.arrival} ({search.to})</div>
              </div>

              {/* Button */}
              <button onClick={() => select(bus)}>
                Book
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  )
}
