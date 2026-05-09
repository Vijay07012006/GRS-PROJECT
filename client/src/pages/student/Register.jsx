import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", fatherName: "", email: "", mobile: "",
    gender: "", dob: "", pincode: "", course: "BCA",
    address: "", password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ URL fix kiya
      const res = await axios.post("https://grs-5.onrender.com/api/student/register", formData);
 if (res.data.msg === "Student added successfully") {
  alert("Registration successful!");

  // ✅ correct data store karo
  localStorage.setItem("studentName", res.data.name);
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("studentId", res.data.studentId);

  // ✅ redirect
  navigate("/student/dashboard");
}
 else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("Registration Failed! " + (err.response?.data?.msg || err.message));
    }
  };

  const styles = {
    container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f1f5f9", padding: "20px", fontFamily: 'sans-serif' },
    box: { width: "100%", maxWidth: "700px", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
    header: { background: "#2563eb", padding: "20px", textAlign: "center", color: "#fff" },
    body: { padding: "30px" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" },
    input: { padding: "10px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", width: "100%", boxSizing: "border-box" },
    label: { fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "5px", display: "block" },
    button: { width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", marginTop: "10px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Student Registration</h2>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Create your academic account</p>
        </div>
        <form style={styles.body} onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <div><label style={styles.label}>Full Name</label><input style={styles.input} name="name" onChange={handleChange} required /></div>
            <div><label style={styles.label}>Father's Name</label><input style={styles.input} name="fatherName" onChange={handleChange} required /></div>
          </div>
          <div style={styles.grid}>
            <div><label style={styles.label}>Email Address</label><input style={styles.input} type="email" name="email" onChange={handleChange} required /></div>
            <div><label style={styles.label}>Mobile Number</label><input style={styles.input} name="mobile" maxLength="10" onChange={handleChange} required /></div>
          </div>
          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Gender</label>
              <select style={styles.input} name="gender" onChange={handleChange} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div><label style={styles.label}>Date of Birth</label><input style={styles.input} type="date" name="dob" onChange={handleChange} required /></div>
          </div>
          <div style={styles.grid}>
            <div><label style={styles.label}>Pincode</label><input style={styles.input} name="pincode" onChange={handleChange} required /></div>
            <div>
              <label style={styles.label}>Course</label>
              <select style={styles.input} name="course" onChange={handleChange}>
                <option>BCA</option>
                <option>MCA</option>
                <option>B.Tech</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={styles.label}>Address</label>
            <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }}
              name="address" onChange={handleChange} required placeholder="Enter your full address" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" style={styles.button}>Register Now</button>
          <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '15px' }}>
            Already registered? <Link to="/login" style={{ color: '#2563eb' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
