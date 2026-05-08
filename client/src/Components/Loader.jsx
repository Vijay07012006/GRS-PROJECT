import React from 'react';

// Premium Loader Styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.8)', // Light neutral with transparency
    backdropFilter: 'blur(8px)', // Modern glass effect
    zIndex: 9999,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  loaderWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '100px',
  },
  outerRing: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '28px', // Squircle shape
    border: '3px solid #E2E8F0',
    borderTopColor: '#4F46E5', // Indigo primary
    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
  },
  innerPulse: {
    width: '40px',
    height: '40px',
    backgroundColor: '#4F46E5',
    borderRadius: '14px',
    animation: 'pulse 1.5s ease-in-out infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: '800',
    boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
  },
  loadingText: {
    marginTop: '24px',
    fontSize: '15px',
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  subText: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#64748B',
    fontWeight: '500',
  }
};

const Loader = () => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.8; }
          }
        `}
      </style>
      
      <div style={styles.overlay}>
        <div style={styles.loaderWrapper}>
          <div style={styles.outerRing}></div>
          <div style={styles.innerPulse}>
            LN
          </div>
        </div>
        
        <div style={styles.loadingText}>Synchronizing</div>
        <div style={styles.subText}>Preparing your dashboard experience...</div>
      </div>
    </>
  );
};

export default Loader;