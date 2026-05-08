import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // ✅ redirect to dashboard
      navigate('/admin-dashboard');
    }, 1000);
  };

  return (
    <div className="login-screen">
      <style>{`
        .login-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f0f2f5;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-box {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 380px;
        }

        .login-box h2 {
          margin-bottom: 10px;
          text-align: center;
        }

        .login-box p {
          font-size: 14px;
          text-align: center;
          margin-bottom: 20px;
          color: #666;
        }

        .input-container {
          margin-bottom: 15px;
        }

        .input-container label {
          font-size: 13px;
          font-weight: 600;
        }

        .input-container input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          margin-top: 5px;
        }

        .input-container input:focus {
          border-color: #007bff;
          outline: none;
        }

        .error-banner {
          background: #ffebe6;
          color: red;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: #0056b3;
        }

        .toggle-btn {
          margin-top: 5px;
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-size: 12px;
        }
      `}</style>

      <div className="login-box">
        <h2>Admin Portal</h2>
        <p>Login to manage your dashboard</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Loading..." : "Admin Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;