import React from 'react';

// Premium Status Dashboard Styles
const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#F8FAFC',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid #F1F5F9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#64748B',
    margin: '0 0 8px 0',
  },
  value: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1E293B',
    margin: 0,
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  trend: {
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  chartPlaceholder: {
    marginTop: '20px',
    height: '4px',
    backgroundColor: '#F1F5F9',
    borderRadius: '2px',
    overflow: 'hidden',
  }
};

const StatusBased = () => {
  const stats = [
    { label: "Total Raised", value: "42", trend: "+12%", color: "#6366F1", bg: "#EEF2FF", icon: "📋" },
    { label: "In Progress", value: "12", trend: "Active", color: "#F59E0B", bg: "#FFFBEB", icon: "⏳" },
    { label: "Resolved", value: "28", trend: "85%", color: "#10B981", bg: "#ECFDF5", icon: "✅" },
    { label: "Rejected", value: "02", trend: "-5%", color: "#EF4444", bg: "#FEF2F2", icon: "🚫" },
  ];

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Activity Overview</h2>
        <p style={{ color: '#94A3B8', fontSize: '14px', marginTop: '4px' }}>Real-time status of your university grievances.</p>
      </div>

      <div style={styles.grid}>
        {stats.map((item, index) => (
          <div 
            key={index} 
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
            }}
          >
            <div style={{ ...styles.iconWrapper, backgroundColor: item.bg, color: item.color }}>
              {item.icon}
            </div>
            
            <p style={styles.label}>{item.label}</p>
            
            <div style={styles.value}>
              {item.value}
              <span style={{ 
                ...styles.trend, 
                backgroundColor: item.bg, 
                color: item.color 
              }}>
                {item.trend}
              </span>
            </div>

            <div style={styles.chartPlaceholder}>
              <div style={{ 
                width: `${(parseInt(item.value) / 50) * 100}%`, 
                height: '100%', 
                backgroundColor: item.color 
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBased;