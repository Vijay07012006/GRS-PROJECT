import React from 'react';

// Premium Sidebar Styles
const styles = {
  sidebar: {
    width: '280px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #F1F5F9',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 20px',
    position: 'sticky',
    top: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 12px 40px 12px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#4F46E5',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: '18px',
    boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: '-0.5px',
  },
  menuLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    margin: '20px 12px 12px 12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 16px',
    borderRadius: '14px',
    color: '#64748B',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    marginBottom: '4px',
    cursor: 'pointer',
  },
  activeNavItem: {
    backgroundColor: '#F5F7FF',
    color: '#4F46E5',
  },
  icon: {
    fontSize: '18px',
  },
  footerCard: {
    marginTop: 'auto',
    backgroundColor: '#F8FAFC',
    padding: '16px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #F1F5F9',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: '#E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  }
};

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'My Profile', icon: '👤', active: false },
    { name: 'Complaints', icon: '📝', active: false },
    { name: 'Track Status', icon: '📍', active: false },
  ];

  const adminItems = [
    { name: 'User Management', icon: '👥', active: false },
    { name: 'System Logs', icon: '🛡️', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
  ];

  return (
    <div style={styles.sidebar}>
      {/* Branding */}
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>L</div>
        <div style={styles.logoText}>LNMU Portal</div>
      </div>

      {/* Main Menu */}
      <div style={styles.menuLabel}>Main Menu</div>
      {menuItems.map((item, index) => (
        <div 
          key={index} 
          style={{...styles.navItem, ...(item.active ? styles.activeNavItem : {})}}
          onMouseOver={(e) => !item.active && (e.currentTarget.style.backgroundColor = '#F8FAFC')}
          onMouseOut={(e) => !item.active && (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span style={styles.icon}>{item.icon}</span>
          {item.name}
        </div>
      ))}

      {/* Admin Section */}
      <div style={styles.menuLabel}>Administrative</div>
      {adminItems.map((item, index) => (
        <div 
          key={index} 
          style={styles.navItem}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={styles.icon}>{item.icon}</span>
          {item.name}
        </div>
      ))}

      {/* User Footer */}
      <div style={styles.footerCard}>
        <div style={styles.avatar}>🎓</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            Aryan Raj
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>Student Account</div>
        </div>
        <div style={{ cursor: 'pointer', color: '#94A3B8', fontSize: '14px' }}>↪️</div>
      </div>
    </div>
  );
};

export default Sidebar;