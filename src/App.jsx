import { useState } from 'react'
import axios from 'axios'
import Splash    from './pages/Splash'
import SignIn    from './pages/SignIn'
import Home      from './pages/Home'
import BusList   from './pages/BusList'
import BookTicket from './pages/BookTicket'
import Payment   from './pages/Payment'
import LiveMap   from './pages/LiveMap'
import Profile   from './pages/Profile'

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState({ from: '', to: '', date: '' })
  const [bus, setBus]       = useState(null)
  const [booking, setBooking] = useState(null)
  const [user, setUser]     = useState(null)

  // Check for stored token on app load
  useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // TODO: Validate token and set user
    }
  })

  const go = (s) => {
    setHistory((prev) => [...prev, screen])
    setScreen(s)
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) {
        setScreen('home')
        return []
      }
      const previous = prev[prev.length - 1]
      setScreen(previous)
      return prev.slice(0, -1)
    })
    window.scrollTo(0, 0)
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    setScreen('signin')
  }

  const props = { go, goBack, search, setSearch, bus, setBus, booking, setBooking, user, login, logout }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fff', position: 'relative' }}>
      {screen === 'splash'   && <Splash   {...props} />}
      {screen === 'signin'   && <SignIn   {...props} />}
      {screen === 'home'     && <Home     {...props} />}
      {screen === 'buslist'  && <BusList  {...props} />}
      {screen === 'book'     && <BookTicket {...props} />}
      {screen === 'payment'  && <Payment  {...props} />}
      {screen === 'livemap'  && <LiveMap  {...props} />}
      {screen === 'profile'  && <Profile  {...props} />}
    </div>
  )
}
