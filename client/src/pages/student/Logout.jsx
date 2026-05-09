import React, { useState } from 'react';

const API = "https://grs-wiu6.vercel.app/api";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const userId    = localStorage.getItem("id");
      const userName  = localStorage.getItem("name");
      const userEmail = localStorage.getItem("email");

      await fetch(`${API}/student/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, userEmail }),
      });

    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      window.location.href = "/login";
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        width: '340px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚪</div>

        <h2 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '10px' }}>
          Logout karna chahte hain?
        </h2>

        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
          Logged in as:
        </p>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '28px' }}>
          {localStorage.getItem("name") || "Student"}
        </p>

        <button
          onClick={handleLogout}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#fca5a5' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '10px'
          }}
        >
          {loading ? "Logging out..." : "Confirm Logout"}
        </button>

        <button
          onClick={() => window.history.back()}
          style={{
            width: '100%',
            padding: '12px',
            background: 'white',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Wapas jao
        </button>
      </div>
    </div>
  );
};

export default Logout;
