import screenshotImage from '../images/Screenshot 2026-04-08 211906.png'

export default function Profile({ go, goBack, user, logout }) {
  if (!user) {
    go('signin')
    return null
  }

  return (
    <div className="fadeIn">
      {/* Header */}
      <div style={{ background: '#77879e', padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, padding: 0 }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Profile</div>
      </div>

      {/* Profile Content */}
      <div style={{ padding: 20 }}>
        {/* Profile Picture and Basic Info */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img
            src={screenshotImage}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              marginBottom: 16,
              border: '4px solid #77879e'
            }}
          />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 4 }}>{user.name}</div>
          <div style={{ fontSize: 14, color: '#666' }}>{user.email}</div>
        </div>

        {/* User Details Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Contact Information */}
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#333' }}>Contact Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#666' }}>Phone</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{user.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#666' }}>Email</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#333' }}>Account Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#666' }}>Member Since</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{user.memberSince}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#666' }}>Total Bookings</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{user.totalBookings}</span>
              </div>
            </div>
          </div>

          {/* Favorite Routes */}
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#333' }}>Favorite Routes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {user.favoriteRoutes.map((route, index) => (
                <div key={index} style={{
                  padding: '8px 12px',
                  background: '#f5f5f5',
                  borderRadius: 6,
                  fontSize: 14
                }}>
                  {route}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{
            width: '100%',
            padding: '14px',
            background: '#77879e',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Edit Profile
          </button>
          <button style={{
            width: '100%',
            padding: '14px',
            background: '#fff',
            color: '#666',
            border: '1px solid #ddd',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Settings
          </button>
          <button style={{
            width: '100%',
            padding: '14px',
            background: '#fff',
            color: '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}