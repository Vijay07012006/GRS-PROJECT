import React from 'react';

// Modern Form Styles for Add Complaint
const styles = {
  pageWrapper: {
    padding: '50px 20px',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  formCard: {
    backgroundColor: 'white',
    maxWidth: '600px',
    width: '100%',
    padding: '40px',
    borderRadius: '32px',
    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
    border: '1px solid #F1F5F9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '35px',
  },
  iconHeader: {
    fontSize: '32px',
    marginBottom: '15px',
    display: 'inline-block',
    padding: '15px',
    backgroundColor: '#EEF2FF',
    borderRadius: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0F172A',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748B',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '8px',
    marginLeft: '4px',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '15px',
    minHeight: '120px',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#4F46E5', // Indigo primary
    color: 'white',
    padding: '16px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
    transition: 'transform 0.2s ease',
  },
  helperText: {
    fontSize: '12px',
    color: '#94A3B8',
    marginTop: '6px',
    display: 'block',
  }
};

const AddComplaint = () => {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <div style={styles.iconHeader}>✍️</div>
          <h2 style={styles.title}>Submit a Grievance</h2>
          <p style={styles.subtitle}>We are here to help. Tell us what went wrong.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Complaint Subject</label>
            <input 
              style={styles.input} 
              placeholder="Briefly describe the issue (e.g. WiFi not working)" 
              onFocus={(e) => {e.target.style.borderColor = '#4F46E5'; e.target.style.backgroundColor = '#fff'}}
              onBlur={(e) => {e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'}}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select style={{...styles.input, appearance: 'none'}}>
              <option>Select Category</option>
              <option>Academic</option>
              <option>Hostel</option>
              <option>Infrastructure</option>
              <option>Fees</option>
            </select>
            <span style={styles.helperText}>Select the most relevant department.</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Detailed Description</label>
            <textarea 
              style={styles.textarea} 
              placeholder="Provide more details so we can act faster..."
              onFocus={(e) => {e.target.style.borderColor = '#4F46E5'; e.target.style.backgroundColor = '#fff'}}
              onBlur={(e) => {e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'}}
            ></textarea>
          </div>

          <button 
            style={styles.submitBtn}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Send Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;