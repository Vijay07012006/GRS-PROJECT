import React from 'react';
import { useNavigate } from 'react-router-dom';

// Premium Logout Styles
const styles = {
  overlay: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9', // Light neutral background
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  logoutCard: {
    backgroundColor: 'white',
    padding: '48px',
    borderRadius: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    maxWidth: '420px',
    width: '90%',
    border: '1px solid #E2E8F0',
  },
  iconCircle: {
    width: '72px',
    height: '72px',
    backgroundColor: '#FFF1F2',
    color: '#E11D48',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    margin: '0 auto 24px auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  message: {
    fontSize: '15px',
    color: '#64748B',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  confirmBtn: {
    backgroundColor: '#0F172A',
    color: 'white',
    padding: '14px',
    borderRadius: '14px',
    border: 'none',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    color: '#64748B',
    padding: '14px',
    borderRadius: '14px',
    border: '1px solid #E2E8F0',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  footerNote: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#94A3B8',
    fontWeight: '500',
  }
};

const AdLogout = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminRole");
    window.location.href = "/admin-login";
  };

  const handleCancelLogout = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.logoutCard}>
        <div style={styles.iconCircle}>
          👋
        </div>
        
        <h2 style={styles.title}>Logging Out?</h2>
        <p style={styles.message}>
          Are you sure you want to end your session? Make sure your unsaved changes are safe.
        </p>

        <div style={styles.btnGroup}>
          <button 
            onClick={handleConfirmLogout}
            style={styles.confirmBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1E293B'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0F172A'}
          >
            Yes, Log Me Out
          </button>
          
          <button 
            onClick={handleCancelLogout}
            style={styles.cancelBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#F8FAFC'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Stay on Portal
          </button>
        </div>

        <p style={styles.footerNote}>
          LNM University Management Portal v2.0
        </p>
      </div>
    </div>
  );
};

export default AdLogout;