import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const colors = {
    primary: "#2563eb",
    dark: "#1e293b",
    lightText: "#64748b",
    white: "#ffffff",
    borderColor: "#e2e8f0"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email aur password dono fill karein.');
      return;
    }

    setLoading(true);

    try {
      const getApiUrl = () => {
        const base = import.meta.env.VITE_API_URL || "https://grivance.onrender.com";
        return base.replace(/\/api\/?$/, "").replace(/\/+$/, "");
      };
      const apiBase = getApiUrl();
      const res = await fetch(`${apiBase}/api/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,       // ✅ formData se lo
          password: formData.password  // ✅ formData se lo
        })
      });

      const json = await res.json();

    // ✅ Naya — sab possible formats handle karta hai
if (res.ok) {
// ✅ BAAD — yeh lagao
const id = json.studentId;
const name = json.name;
const token = json.token;
  // Debug ke liye — fix hone ke baad hata sakte ho
  console.log("Login response:", json);
  console.log("Saved studentId:", id);

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('studentName', name);
  localStorage.setItem('studentId', id);
  localStorage.setItem('token', token);
  navigate('/student/dashboard');
} else {
        setError(json.msg || 'Invalid email ya password.');
        setLoading(false);
      }

    } catch (err) {
      setError('Server se connect nahi ho pa raha. Dobara try karein.',err);
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: `1px solid ${colors.borderColor}`,
    fontSize: '14px',
    outline: 'none',
    marginBottom: '18px',
    color: colors.dark,
    boxSizing: 'border-box'
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>

      <nav style={{ padding: '16px 5%', backgroundColor: colors.white, borderBottom: `1px solid ${colors.borderColor}`, textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: colors.primary }}>
          Mohd   Hasan    P  G    College Jaunpur
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '16px',
          border: `1px solid ${colors.borderColor}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          padding: '40px 36px',
          width: '100%',
          maxWidth: '420px'
        }}>

          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #6C63FF, #3ECFCF)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', margin: '0 auto 20px'
          }}>👨‍🎓</div>

          <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: '700', color: colors.dark, marginBottom: '6px' }}>
            Student Login
          </h2>
          <p style={{ textAlign: 'center', color: colors.lightText, fontSize: '13px', marginBottom: '28px' }}>
           Please log in to access your account
          </p>
  
          {error && (   
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#dc2626', padding: '10px 14px',
              borderRadius: '8px', fontSize: '13px', marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              style={inputStyle}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? '#93c5fd' : colors.primary,
                color: 'white', border: 'none',
                borderRadius: '10px', fontSize: '15px',
                fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Logging in...' : 'Sign In to Portal'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: colors.lightText }}>
            <Link to="/register" style={{ color: colors.primary, fontWeight: '600', textDecoration: 'none' }}>
            No account? Sign up here
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: colors.lightText }}>
            <Link to="/" style={{ color: colors.primary, fontWeight: '600', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '12px' }}>
        © 2026 Mohd Hasan P  G College Secure Management System.
      </footer>
    </div>
  );
};

export default Login; 
