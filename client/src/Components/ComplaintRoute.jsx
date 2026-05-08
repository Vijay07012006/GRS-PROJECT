import React from 'react';

// Premium Workflow Routing Styles
const styles = {
  container: {
    padding: '50px 30px',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  header: {
    maxWidth: '900px',
    margin: '0 auto 40px auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: '-1px',
  },
  routePath: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: '31px',
    top: '40px',
    bottom: '40px',
    width: '2px',
    background: 'linear-gradient(to bottom, #4F46E5, #E2E8F0)',
    zIndex: 1,
  },
  nodeCard: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '24px 30px',
    marginLeft: '70px',
    border: '1px solid #F1F5F9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
  },
  nodeIndicator: {
    position: 'absolute',
    left: '-52px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '4px solid #4F46E5',
    zIndex: 3,
  },
  deptName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1E293B',
    margin: '0 0 4px 0',
  },
  roleBadge: {
    fontSize: '11px',
    fontWeight: '800',
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    padding: '4px 10px',
    borderRadius: '8px',
    textTransform: 'uppercase',
  },
  timeEstimate: {
    textAlign: 'right',
    fontSize: '13px',
    color: '#94A3B8',
  }
};

const ComplaintRoute = () => {
  const workflow = [
    { id: 1, dept: "Student Helpdesk", role: "Initial Screening", time: "Instant", icon: "🤝" },
    { id: 2, dept: "Department Head", role: "Approval & Review", time: "12-24 Hours", icon: "👨‍🏫" },
    { id: 3, dept: "Technical Support", role: "Resolution Phase", time: "2-3 Days", icon: "🛠️" },
    { id: 4, dept: "Quality Assurance", role: "Final Verification", time: "4 Hours", icon: "✨" },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Grievance Routing Map</h1>
        <p style={{ color: '#64748B', marginTop: '10px' }}>
          Visualizing the lifecycle of a complaint from submission to resolution.
        </p>
      </header>

      <div style={styles.routePath}>
        <div style={styles.verticalLine}></div>
        
        {workflow.map((step) => (
          <div 
            key={step.id} 
            style={styles.nodeCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(10px)';
              e.currentTarget.style.borderColor = '#4F46E5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.borderColor = '#F1F5F9';
            }}
          >
            <div style={styles.nodeIndicator}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '28px' }}>{step.icon}</div>
              <div>
                <h3 style={styles.deptName}>{step.dept}</h3>
                <span style={styles.roleBadge}>{step.role}</span>
              </div>
            </div>

            <div style={styles.timeEstimate}>
              <div style={{ fontWeight: '700', color: '#1E293B', marginBottom: '2px' }}>{step.time}</div>
              <span>Avg. Processing Time</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintRoute;