import { useState } from 'react'
import logo from '../images/logo.png'

export default function SignIn({ go, goBack, login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    const success = login(email.trim(), password.trim())
    if (success) {
      setError('')
      go('home')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f2f5fb', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', fontSize: 22, color: '#1a73e8', padding: 0 }}>←</button>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Sign In</div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src={logo} alt="LaalParii logo" style={{ width: 96, height: 'auto', margin: '0 auto 18px', borderRadius: 20, background: '#f2f5fb', padding: 12, boxShadow: '0 18px 38px rgba(0,0,0,0.08)' }} />
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12 }}>Welcome Back</div>
          <div style={{ color: '#666', marginTop: 8, fontSize: 14 }}>Sign in to continue to LaalParii</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #ddd', marginBottom: 16, fontSize: 15 }}
          />

          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #ddd', marginBottom: 16, fontSize: 15 }}
          />

          {error && <div style={{ color: '#d32f2f', marginBottom: 16, fontSize: 14 }}>{error}</div>}

          <button type="submit" style={{ width: '100%', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: 22, textAlign: 'center', color: '#777', fontSize: 14 }}>
          New user? <span onClick={() => go('home')} style={{ color: '#1a73e8', cursor: 'pointer' }}>Continue as guest</span>
        </div>
      </div>
    </div>
  )
}
