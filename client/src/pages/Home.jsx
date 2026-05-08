import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '2px solid #e2e8f0',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#fff', fontSize: '16px' }}>🎓</span>
          </div>
          <span style={{ fontSize: '25px', fontWeight: '600', color: '#0f172a' }}>
            Mohd Hasan P G College Jaunpur
          </span>
        </div>
        <span style={{
          fontSize: '12px', color: '#64748b',
          background: '#f1f5f9', padding: '4px 14px',
          borderRadius: '20px', border: '1px solid #e2e8f0'
        }}>
          Academic Portal 2026
        </span>
      </nav>

      {/* Hero Section */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#eff6ff', color: '#1d4ed8',
            padding: '5px 14px', borderRadius: '20px',
            fontSize: '12px', fontWeight: '600', marginBottom: '20px'
          }}>
            🔒 Secure Collage Management System
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', margin: '0 0 12px' }}>
            College Access Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
            Select your login type to manage Collage activities.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>

          {/* Admin Card */}
          <CardItem
            icon="🔐"
            iconBg="#f1f5f9"
            title="Admin Dashboard"
            desc="System management and user verification for administrators.."
            btnLabel="Admin Dashboard"
            btnBg="#1e293b"
            to="/admin-login"
          />

          {/* Register Card */}
          <CardItem
            icon="📝"
            iconBg="#f0fdf4"
            title="New Registration"
            desc="Create a new account if you are a student or faculty member.."
            btnLabel="Register Now"
            btnBg="#15803d"
            to="/register"
          />

          {/* Student Card — Featured */}
          <CardItem
            icon="👨‍🎓"
            iconBg="#eff6ff"
            title="Student Portal"
            desc="Check results and schedules, and manage your profile.."
            btnLabel="Sign In to Portal"
            btnBg="#1d4ed8"
            to="/login"
            featured={true}
          />

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '32px',
        borderTop: '1px solid #e2e8f0', marginTop: '20px'
      }}>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
          © Mohd Hasan P G College Jaunpur — Secure Management System
        </p>
      </footer>

    </div>
  );
};

const CardItem = ({ icon, iconBg, title, desc, btnLabel, btnBg, to, featured }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: featured ? '1px solid #1d4ed8' : `1px solid ${hovered ? '#94a3b8' : '#e2e8f0'}`,
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.08)' : 'none'
      }}
    >
      {featured && (
        <span style={{
          fontSize: '11px', fontWeight: '600',
          padding: '3px 12px', borderRadius: '0 0 8px 8px'
        }}>
         
        </span>
      )}
      <div style={{
        width: '44px', height: '44px', borderRadius: '10px',
        background: iconBg, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '20px'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '0 0 6px' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{desc}</p>
      </div>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <button style={{
          width: '100%', padding: '11px',
          background: btnBg, color: '#fff',
          border: 'none', borderRadius: '8px',
          fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', transition: 'opacity 0.2s'
        }}>
          {btnLabel}
        </button>
      </Link>
    </div>
  );
};

export default Home;