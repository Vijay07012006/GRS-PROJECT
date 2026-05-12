import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  header: { textAlign: 'center', marginBottom: '35px' },
  iconHeader: {
    fontSize: '32px', marginBottom: '15px', display: 'inline-block',
    padding: '15px', backgroundColor: '#EEF2FF', borderRadius: '20px',
  },
  title: { fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: '#64748B' },
  inputGroup: { marginBottom: '24px' },
  label: {
    display: 'block', fontSize: '13px', fontWeight: '700',
    color: '#334155', marginBottom: '8px', marginLeft: '4px',
  },
  input: {
    width: '100%', padding: '14px 18px', borderRadius: '16px',
    border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '14px 18px', borderRadius: '16px',
    border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC',
    fontSize: '15px', minHeight: '120px', resize: 'vertical',
    outline: 'none', boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%', backgroundColor: '#4F46E5', color: 'white',
    padding: '16px', borderRadius: '16px', border: 'none',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    marginTop: '10px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
    transition: 'transform 0.2s ease',
  },
  helperText: { fontSize: '12px', color: '#94A3B8', marginTop: '6px', display: 'block' },
  errorText: { fontSize: '13px', color: '#EF4444', marginTop: '8px', textAlign: 'center' },
  successText: { fontSize: '13px', color: '#10B981', marginTop: '8px', textAlign: 'center' },
};

const AddComplaint = () => {
  const [complaintTypes, setComplaintTypes] = useState([]);  // API se aayega
  const [formData, setFormData] = useState({
    subject: '',
    complaintType: '',   // ObjectId store hoga
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ✅ Step 1: Complaint types API se fetch karo (real ObjectIds)
  useEffect(() => {
    const fetchComplaintTypes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/complaint-type`);
        setComplaintTypes(res.data.data || res.data); // apne response structure ke hisaab se
      } catch (err) {
        console.error('Complaint types fetch error:', err);
      }
    };
    fetchComplaintTypes();
  }, []);

  // ✅ Step 2: Input change handler
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ Step 3: Submit handler — student ID localStorage se lo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Basic validation
    if (!formData.subject || !formData.complaintType || !formData.description) {
      setMessage({ type: 'error', text: 'Sabhi fields fill karna zaroori hai.' });
      return;
    }

    try {
      setLoading(true);

      const student = JSON.parse(localStorage.getItem('student')); // ya jahan aap store karte ho
      const token = localStorage.getItem('token');

      const payload = {
  complaintText: formData.description,  // ✅ 'description' ko 'complaintText' naam do
  complaintType: formData.complaintType,
  studentId: student._id,              // ✅ 'student' ko 'studentId' karo
};

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/complaint`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: 'success', text: 'Complaint successfully submit ho gayi! ✅' });
      setFormData({ subject: '', complaintType: '', description: '' }); // form reset

    } catch (err) {
      console.error('Submit error:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Kuch galat hua, dobara try karo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <div style={styles.iconHeader}>✍️</div>
          <h2 style={styles.title}>Submit a Grievance</h2>
          <p style={styles.subtitle}>We are here to help. Tell us what went wrong.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Complaint Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. WiFi not working"
              onFocus={(e) => { e.target.style.borderColor = '#4F46E5'; e.target.style.backgroundColor = '#fff'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
            />
          </div>

          {/* ✅ Category — Ab real ObjectId value aayegi */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              style={{ ...styles.input, appearance: 'none' }}
            >
              <option value="">-- Category Select Karo --</option>
              {complaintTypes.map(type => (
                <option key={type._id} value={type._id}>  {/* ✅ _id as value */}
                  {type.name}   {/* Display name */}
                </option>
              ))}
            </select>
            <span style={styles.helperText}>Select the most relevant department.</span>
          </div>

          {/* Description */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Detailed Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Provide more details so we can act faster..."
              onFocus={(e) => { e.target.style.borderColor = '#4F46E5'; e.target.style.backgroundColor = '#fff'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
            />
          </div>

          {/* Messages */}
          {message.text && (
            <p style={message.type === 'error' ? styles.errorText : styles.successText}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {loading ? 'Submitting...' : 'Send Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;