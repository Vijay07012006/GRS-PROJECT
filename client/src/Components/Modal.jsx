import React from 'react';

// Premium Modal Styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Deep slate with transparency
    backdropFilter: 'blur(6px)', // Modern glass effect
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalCard: {
    backgroundColor: 'white',
    maxWidth: '500px',
    width: '100%',
    borderRadius: '28px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    animation: 'modalShow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  header: {
    padding: '24px 32px',
    borderBottom: '1px solid #F1F5F9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  closeBtn: {
    backgroundColor: '#F8FAFC',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#64748B',
    fontSize: '18px',
    transition: 'all 0.2s',
  },
  body: {
    padding: '32px',
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.6',
  },
  footer: {
    padding: '20px 32px',
    backgroundColor: '#F8FAFC',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  primaryBtn: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)',
  },
  secondaryBtn: {
    backgroundColor: 'white',
    color: '#64748B',
    padding: '12px 24px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  }
};

const Modal = ({ isOpen = true, title = "Confirm Action", onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes modalShow {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
      
      <div style={styles.overlay}>
        <div style={styles.modalCard}>
          {/* Modal Header */}
          <header style={styles.header}>
            <h3 style={styles.title}>{title}</h3>
            <button 
              style={styles.closeBtn} 
              onClick={onClose}
              onMouseOver={(e) => e.target.style.backgroundColor = '#F1F5F9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#F8FAFC'}
            >
              ×
            </button>
          </header>

          {/* Modal Body */}
          <div style={styles.body}>
            Are you sure you want to proceed with this request? This action will be recorded in the LNMU system logs.
          </div>

          {/* Modal Footer */}
          <footer style={styles.footer}>
            <button style={styles.secondaryBtn} onClick={onClose}>Cancel</button>
            <button 
              style={styles.primaryBtn}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4338CA'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4F46E5'}
            >
              Confirm & Save
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;