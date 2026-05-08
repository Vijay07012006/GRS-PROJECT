import React from 'react';

// Premium Glassmorphism Navbar Styles
const styles = {
  navWrapper: {
    position: 'sticky',
    top: '20px',
    zIndex: 1000,
    padding: '0 30px',
  },
  navContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(231, 235, 241, 0.5)',
    borderRadius: '24px',
    height: '74px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchBar: {
    backgroundColor: '#F1F5F9',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '14px',
    fontSize: '14px',
    width: '280px',
    outline: 'none',
    color: '#475569',
    transition: 'all 0.3s ease',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notificationIcon: {
    position: 'relative',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#64748B',
    padding: '8px',
    borderRadius: '12px',
    transition: 'background 0.2s',
  },
  notifDot: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '8px',
    height: '8px',
    backgroundColor: '#EF4444',
    borderRadius: '50%',
    border: '2px solid white',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 6px 6px 14px',
    backgroundColor: '#F8FAFC',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    backgroundColor: '#4F46E5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)',
  }
};

const Navbar = () => {
  return (
    <div style={styles.navWrapper}>
      <nav style={styles.navContainer}>
        {/* Left Side: Search or Branding */}
        <div style={styles.leftSection}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '10px', color: '#94A3B8' }}>🔍</span>
            <input 
              style={{ ...styles.searchBar, paddingLeft: '40px' }} 
              placeholder="Search anything..." 
              onFocus={(e) => {
                e.target.style.width = '320px';
                e.target.style.backgroundColor = '#fff';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.width = '280px';
                e.target.style.backgroundColor = '#F1F5F9';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Right Side: Icons & Profile */}
        <div style={styles.rightSection}>
          {/* Notifications */}
          <div 
            style={styles.notificationIcon}
            onMouseOver={(e) => e.target.style.backgroundColor = '#F1F5F9'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🔔
            <div style={styles.notifDot}></div>
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0' }}></div>

          {/* User Profile Info */}
          <div 
            style={styles.userProfile}
            onMouseOver={(e) => e.target.style.borderColor = '#4F46E5'}
            onMouseOut={(e) => e.target.style.borderColor = '#E2E8F0'}
          >
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>Aryan Raj</p>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#94A3B8' }}>Student ID: #8842</p>
            </div>
            <div style={styles.userAvatar}>
              AR
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;