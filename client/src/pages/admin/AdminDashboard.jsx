import React, { useState, useEffect } from "react";

const styles = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; }
.wrap { display: flex; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
.sidebar { width: 240px; background: #0f172a; display: flex; flex-direction: column; padding: 24px 14px; flex-shrink: 0; overflow-y: auto; }
.brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 28px; border-bottom: 1px solid #1e293b; margin-bottom: 16px; }
.brand-icon { width: 36px; height: 36px; border-radius: 10px; background: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #fff; flex-shrink: 0; }
.brand-text { color: #f1f5f9; font-size: 16px; font-weight: 600; }
.nav-group-label { font-size: 11px; color: #475569; text-transform: uppercase; font-weight: 700; margin: 16px 0 6px 14px; letter-spacing: 0.06em; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; color: #64748b; font-size: 14px; transition: all 0.15s; border-left: 3px solid transparent; }
.nav-item:hover { background: #1e293b; color: #f1f5f9; }
.nav-item.active { background: #1e293b; color: #f1f5f9; font-weight: 500; border-left-color: #1d4ed8; }
.spacer { flex: 1; }
.logout { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; color: #f87171; font-size: 14px; margin-top: 8px; transition: background 0.15s; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
.logout:hover { background: rgba(248,113,113,0.08); }
.main { flex: 1; background: #f8fafc; overflow-y: auto; display: flex; flex-direction: column; min-width: 0; }
.topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 60px; position: sticky; top: 0; z-index: 50; }
.topbar-title { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
.topbar-left { display: flex; align-items: center; gap: 12px; }
.hamburger-btn { display: none; align-items: center; justify-content: center; background: none; border: 1px solid #e2e8f0; border-radius: 7px; width: 36px; height: 36px; font-size: 18px; cursor: pointer; flex-shrink: 0; line-height: 1; }
.content { padding: 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 28px; }
.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; }
.stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.05em; }
.stat-val { font-size: 28px; font-weight: 700; color: #0f172a; }
.section-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
.section-head h2 { font-size: 16px; font-weight: 600; color: #0f172a; }
.user-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.user-table th { background: #f8fafc; padding: 10px 16px; text-align: left; font-size: 11px; color: #64748b; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em; }
.user-table td { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0f172a; }
.btn-primary { background: #1d4ed8; color: #fff; padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; transition: opacity 0.15s; display: inline-flex; align-items: center; justify-content: center; }
.btn-primary:hover { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.btn-danger { background: #fef2f2; color: #dc2626; padding: 6px 14px; border-radius: 6px; border: 1px solid #fecaca; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600; transition: background 0.15s; display: inline-flex; align-items: center; justify-content: center; }
.btn-danger:hover { background: #fee2e2; }
.btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
.inp { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: inherit; font-size: 14px; outline: none; transition: border 0.2s; background: #fff; color: #0f172a; }
.inp:focus { border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29,78,216,0.1); }
.btn-resolve { color: #15803d; border: 1px solid #86efac; background: #f0fdf4; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
.btn-resolve:hover { background: #dcfce7; }
.btn-pending  { color: #1e40af; border: 1px solid #93c5fd; background: #eff6ff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
.btn-pending:hover { background: #dbeafe; }
.btn-reject   { color: #b91c1c; border: 1px solid #fca5a5; background: #fef2f2; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; }
.btn-reject:hover { background: #fee2e2; }
.badge-resolved   { background: #f0fdf4; color: #15803d; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-pending    { background: #fffbeb; color: #92400e; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-rejected   { background: #fef2f2; color: #991b1b; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-inprogress { background: #eff6ff; color: #1e40af; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-login  { background: #f0fdf4; color: #15803d; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.badge-logout { background: #fef2f2; color: #b91c1c; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.form-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.form-field { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 140px; }
.form-field label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
.msg { padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 16px; }
.msg.success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.msg.error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.code-badge { background: #eff6ff; color: #1e40af; padding: 3px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; font-family: monospace; }
.user-chip { margin-top: auto; border-top: 1px solid #1e293b; padding-top: 16px; }
.user-chip-inner { padding: 10px 12px; background: #1e293b; border-radius: 10px; display: flex; align-items: center; gap: 10px; }
.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #fff; flex-shrink: 0; }
.sidebar-close-btn { display: none; background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; margin-left: auto; line-height: 1; padding: 2px 4px; }
.overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; }

@media (max-width: 768px) {
  .wrap { flex-direction: row; }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    padding: 16px 12px;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .overlay.open {
    display: block;
  }

  .sidebar-close-btn {
    display: block;
  }

  .hamburger-btn {
    display: flex;
  }

  .main {
    width: 100%;
    margin-left: 0;
  }

  .topbar {
    padding: 0 14px;
    height: auto;
    min-height: 56px;
  }

  .topbar-college {
    display: none;
  }

  .content {
    padding: 14px;
  }

  .stat-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .form-box {
    flex-direction: column;
    align-items: stretch;
  }

  .form-field {
    width: 100%;
    min-width: unset;
  }

  .table-wrapper {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .user-table {
    min-width: 500px;
  }

  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .btn-resolve,
  .btn-pending,
  .btn-reject {
    flex: 1;
  }

  .section-card {
    padding: 16px;
  }
}
`;

const API = "https://grivance.onrender.com/api";

// ─── ChangePassword ──────────────────────────────────────────────────────────
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setMsg(null);
    if (!oldPassword || !newPassword) {
      setMsg({ type: "error", text: "❗ Dono fields fill karna zaroori hai" });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: "error", text: "❗ New password kam se kam 6 characters ka hona chahiye" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsg({ type: "success", text: "✅ Password successfully update ho gaya!" });
        setOldPassword("");
        setNewPassword("");
      } else {
        setMsg({ type: "error", text: `❌ ${json.msg || "Password update nahi ho saka"}` });
      }
    } catch {
      setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card" style={{ maxWidth: "480px" }}>
      <div className="section-head"><h2>Change Password</h2></div>
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
          Old Password
        </label>
        <input
          className="inp"
          type="password"
          placeholder="Current password dalein"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
          New Password
        </label>
        <input
          className="inp"
          type="password"
          placeholder="Naya password dalein (min 6 char)"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </div>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      <button className="btn-primary" onClick={handleUpdate} disabled={loading}>
        {loading ? "⏳ Updating..." : "🔒 Update Password"}
      </button>
    </div>
  );
}

// ─── ForumAdmin ──────────────────────────────────────────────────────────────
function ForumAdmin({ posts, fetchData }) {
  const [replyText, setReplyText] = useState({});
  const [msg, setMsg] = useState({});

  const handleAdminReply = async (postId) => {
    const reply = replyText[postId];
    if (!reply?.trim()) return;
    try {
      const res = await fetch(`${API}/forum/posts/${postId}/admin-reply`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      if (res.ok) { setMsg(p => ({ ...p, [postId]: "✅ Reply sent & resolved!" })); setReplyText(p => ({ ...p, [postId]: "" })); fetchData(); }
      else setMsg(p => ({ ...p, [postId]: "❌ Reply send nahi ho saka" }));
    } catch { setMsg(p => ({ ...p, [postId]: "❌ Server error" })); }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Kya aap ye post delete karna chahte hain?")) return;
    try {
      const res = await fetch(`${API}/forum/posts/${postId}`, { method: "DELETE" });
      if (res.ok) fetchData(); else alert("❌ Post delete nahi ho saki.");
    } catch { alert("❌ Server se connect nahi ho saka."); }
  };

  return (
    <div className="section-card">
      <div className="section-head"><h2>Discussion Forum</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
      {posts.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>💬 Koi discussion nahi hai abhi</p>
      ) : posts.map(post => (
        <div key={post._id} style={{ marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "500", color: "#0f172a" }}>{post.title}</h4>
                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: post.status === "resolved" ? "#f0fdf4" : "#fffbeb", color: post.status === "resolved" ? "#15803d" : "#92400e" }}>
                  {post.status === "resolved" ? "✅ Resolved" : "⏳ Open"}
                </span>
              </div>
              <p style={{ margin: "6px 0 4px", fontSize: "13px", color: "#64748b" }}>{post.content || "No description"}</p>
              <small style={{ color: "#94a3b8" }}>By <b>{post.authorName || "Student"}</b> · {new Date(post.createdAt).toLocaleDateString("en-IN")} · {post.replies?.length || 0} replies</small>
            </div>
            <button className="btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
          {post.replies?.length > 0 && (
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "8px", background: "#fff" }}>
              {post.replies.map((r, i) => (
                <div key={i} style={{ padding: "10px 14px", background: r.isAdmin ? "#eff6ff" : "#f0fdf4", borderLeft: `3px solid ${r.isAdmin ? "#1d4ed8" : "#10B981"}`, borderRadius: "0 6px 6px 0" }}>
                  <b style={{ fontSize: "12px", color: r.isAdmin ? "#1e40af" : "#15803d" }}>{r.isAdmin ? "👨‍💼 Admin" : `👤 ${r.authorName}`}</b>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#374151" }}>{r.reply}</p>
                </div>
              ))}
            </div>
          )}
          {post.status !== "resolved" && (
            <div style={{ padding: "14px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
              <textarea rows={2} placeholder="Admin reply likhein aur issue resolve karein..." value={replyText[post._id] || ""} onChange={e => setReplyText(p => ({ ...p, [post._id]: e.target.value }))} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "8px", fontFamily: "inherit" }} />
              {msg[post._id] && <div style={{ fontSize: "12px", marginBottom: "8px", color: msg[post._id].includes("✅") ? "#15803d" : "#dc2626" }}>{msg[post._id]}</div>}
              <button className="btn-primary" onClick={() => handleAdminReply(post._id)}>✅ Reply & Mark Resolved</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SessionManagement ───────────────────────────────────────────────────────
function SessionManagement({ sessions, fetchData }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [msg, setMsg] = useState(null);
  const [adding, setAdding] = useState(false);
  const [closingId, setClosingId] = useState(null);

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "❗ Session Name required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/session`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), description: form.description.trim() }) });
      if (res.ok) { setMsg({ type: "success", text: "✅ Session successfully add ho gaya!" }); setForm({ name: "", description: "" }); fetchData(); }
      else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.msg || "Session add nahi ho saka"}` }); }
    } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka" }); }
    finally { setAdding(false); }
  };

  const handleClose = async (id) => {
    if (!window.confirm("Ye session close karna chahte hain?")) return;
    setClosingId(id);
    try {
      const res = await fetch(`${API}/session/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: false }) });
      if (res.ok) fetchData(); else alert("❌ Session close nahi ho saka");
    } catch { alert("❌ Server error"); }
    finally { setClosingId(null); }
  };

  return (
    <div className="section-card">
      <div className="section-head"><h2>Session Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
      <div className="form-box">
        <div className="form-field"><label>Session Name *</label><input className="inp" placeholder="e.g. 2024-25" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
        <div className="form-field"><label>Description</label><input className="inp" placeholder="e.g. Annual session" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
        <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ whiteSpace: "nowrap", alignSelf: "flex-end" }}>{adding ? "⏳ Adding..." : "+ Add Session"}</button>
      </div>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      {sessions.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📅 Koi session nahi hai. Upar form se add karein.</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead><tr><th>#</th><th>Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {sessions.map((s, idx) => (
                <tr key={s._id}>
                  <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "#64748b" }}>{s.description || "—"}</td>
                  <td>{s.isActive ? <span className="badge-resolved">✅ Active</span> : <span className="badge-rejected">❌ Closed</span>}</td>
                  <td>{s.isActive && <button className="btn-danger" onClick={() => handleClose(s._id)} disabled={closingId === s._id}>{closingId === s._id ? "Closing..." : "Close"}</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── ComplaintManagement ─────────────────────────────────────────────────────
function ComplaintManagement({ complaints, fetchData }) {
  const [replyText, setReplyText] = useState({});
  const [msg, setMsg] = useState({});

  const handleAction = async (id, status) => {
    const adminResponse = replyText[id]?.trim();
    if (!adminResponse) { setMsg(p => ({ ...p, [id]: "❗ Pehle reply likhein" })); return; }
    try {
      const res = await fetch(`${API}/complaint/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminResponse, status }) });
      if (res.ok) { setMsg(p => ({ ...p, [id]: `✅ Complaint ${status} kar di gayi!` })); setReplyText(p => ({ ...p, [id]: "" })); fetchData(); }
      else setMsg(p => ({ ...p, [id]: "❌ Action fail ho gaya" }));
    } catch { setMsg(p => ({ ...p, [id]: "❌ Server error" })); }
  };

  const getBadge = (status) => {
    if (status === "closed" || status === "resolved") return <span className="badge-resolved">✅ Resolved</span>;
    if (status === "rejected") return <span className="badge-rejected">❌ Rejected</span>;
    if (status === "in-progress") return <span className="badge-inprogress">🔄 In Progress</span>;
    return <span className="badge-pending">⏳ Pending</span>;
  };

  return (
    <div className="section-card">
      <div className="section-head"><h2>Complaint Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
      {complaints.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📭 Koi complaint nahi hai abhi</p>
      ) : complaints.map(c => {
        const isResolved = c.status === "closed" || c.status === "resolved";
        return (
          <div key={c._id} style={{ marginBottom: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", background: "#f8fafc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                <b style={{ fontSize: "14px", color: "#0f172a" }}>{c.complaintType?.name || "General"}</b>
                {getBadge(c.status)}
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 6px" }}>{c.complaintText}</p>
              <small style={{ color: "#94a3b8" }}>By <b>{c.studentId?.name || "Student"}</b> · {c.studentId?.email} · {new Date(c.createdAt).toLocaleDateString("en-IN")}</small>
            </div>
            <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
              {c.adminResponse && (
                <div style={{ marginBottom: "14px", padding: "12px 16px", background: "#f0fdf4", borderLeft: "3px solid #10B981", borderRadius: "0 8px 8px 0" }}>
                  <div style={{ fontSize: "11px", color: "#15803d", fontWeight: "700", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Admin Response</div>
                  <div style={{ fontSize: "13px", color: "#374151" }}>{c.adminResponse}</div>
                </div>
              )}
              {!isResolved ? (
                <>
                  <textarea rows={3} placeholder="Student ko reply likhein..." value={replyText[c._id] || ""} onChange={e => setReplyText(p => ({ ...p, [c._id]: e.target.value }))} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", resize: "none", fontSize: "13px", outline: "none", marginBottom: "12px", fontFamily: "inherit" }} />
                  {msg[c._id] && <div style={{ fontSize: "12px", marginBottom: "10px", color: msg[c._id].includes("✅") ? "#15803d" : "#dc2626", fontWeight: "600" }}>{msg[c._id]}</div>}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button className="btn-resolve" onClick={() => handleAction(c._id, "resolved")}>✅ Resolve</button>
                    <button className="btn-pending" onClick={() => handleAction(c._id, "pending")}>⏳ Pending</button>
                    <button className="btn-reject"  onClick={() => handleAction(c._id, "rejected")}>❌ Reject</button>
                  </div>
                </>
              ) : (
                <div style={{ padding: "10px 14px", background: "#f0fdf4", borderRadius: "8px", fontSize: "13px", color: "#15803d", fontWeight: "500" }}>✅ Ye complaint already {c.status} hai</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CollegeManagement ───────────────────────────────────────────────────────
function CollegeManagement({ colleges, fetchData }) {
  const [form, setForm] = useState({ name: "", code: "", location: "" });
  const [msg, setMsg] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleAdd = async () => {
    if (!form.name.trim()) { setMsg({ type: "error", text: "❗ College Name required hai" }); return; }
    if (!form.code.trim()) { setMsg({ type: "error", text: "❗ College Code required hai" }); return; }
    setAdding(true); setMsg(null);
    try {
      const res = await fetch(`${API}/college`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name.trim(), code: form.code.trim(), location: form.location.trim() }) });
      if (res.ok) { setMsg({ type: "success", text: "✅ College successfully add ho gaya!" }); setForm({ name: "", code: "", location: "" }); fetchData(); }
      else { const err = await res.json().catch(() => ({})); setMsg({ type: "error", text: `❌ ${err.message || "College add nahi ho saka"}` }); }
    } catch { setMsg({ type: "error", text: "❌ Server se connect nahi ho saka." }); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap ye college delete karna chahte hain?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/college/${id}`, { method: "DELETE" });
      if (res.ok) fetchData(); else alert("❌ College delete nahi ho saka.");
    } catch { alert("❌ Server se connect nahi ho saka."); }
    finally { setDeletingId(null); }
  };

  return (
    <div className="section-card">
      <div className="section-head"><h2>College Management</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
      <div className="form-box">
        <div className="form-field"><label>College Name *</label><input className="inp" placeholder="e.g. Government Polytechnic" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
        <div className="form-field"><label>College Code *</label><input className="inp" placeholder="e.g. GP001" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
        <div className="form-field"><label>Location</label><input className="inp" placeholder="e.g. Lucknow, UP" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} /></div>
        <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ whiteSpace: "nowrap", alignSelf: "flex-end" }}>{adding ? "⏳ Adding..." : "+ Add College"}</button>
      </div>
      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      {colleges.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>🏫 Koi college nahi hai. Upar form se add karein.</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead><tr><th>#</th><th>Code</th><th>Name</th><th>Location</th><th>Action</th></tr></thead>
            <tbody>
              {colleges.map((c, idx) => (
                <tr key={c._id}>
                  <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
                  <td><span className="code-badge">{c.code}</span></td>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ color: "#64748b" }}>{c.location || "—"}</td>
                  <td><button className="btn-danger" onClick={() => handleDelete(c._id)} disabled={deletingId === c._id}>{deletingId === c._id ? "Deleting..." : "Delete"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main AdminDashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({ complaints: [], students: [], colleges: [], sessions: [], logs: [], forumPosts: [] });

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = ['complaint','student','college','session','forum/posts','user-logs'];
      const results = await Promise.all(
        endpoints.map(e => fetch(`${API}/${e}`).then(async res => {
          if (!res.ok) return { data: [] };
          const json = await res.json();
          return { data: Array.isArray(json) ? json : (json.data ?? []) };
        }).catch(() => ({ data: [] })))
      );
      setData({ complaints: results[0].data, students: results[1].data, colleges: results[2].data, sessions: results[3].data, forumPosts: results[4].data, logs: results[5].data });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  // Body scroll lock jab sidebar open ho
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNavClick = (id) => {
    setActive(id);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div className="stat-grid">
            <div className="stat-card"><div className="stat-label">Total Complaints</div><div className="stat-val">{data.complaints.length}</div></div>
            <div className="stat-card"><div className="stat-label">Active Colleges</div><div className="stat-val">{data.colleges.length}</div></div>
            <div className="stat-card"><div className="stat-label">Registered Students</div><div className="stat-val">{data.students.length}</div></div>
            <div className="stat-card"><div className="stat-label">Total Logs</div><div className="stat-val">{data.logs.length}</div></div>
          </div>
        );
      case "college": return <CollegeManagement colleges={data.colleges} fetchData={fetchData} />;
      case "complaints": return <ComplaintManagement complaints={data.complaints} fetchData={fetchData} />;
      case "session": return <SessionManagement sessions={data.sessions} fetchData={fetchData} />;
      case "blocked":
        return (
          <div className="section-card">
            <div className="section-head"><h2>Blocked Users</h2></div>
            <div className="table-wrapper">
              <table className="user-table">
                <thead><tr><th>Name</th><th>Email</th><th>Reason</th><th>Action</th></tr></thead>
                <tbody>
                  {data.students.filter(s => s.isBlocked).length === 0
                    ? <tr><td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: "30px" }}>Koi blocked user nahi hai</td></tr>
                    : data.students.filter(s => s.isBlocked).map(s => (
                      <tr key={s._id}><td>{s.name}</td><td>{s.email}</td><td>Terms Violation</td><td><button className="btn-primary">Unblock</button></td></tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        );
      case "forum": return <ForumAdmin posts={data.forumPosts} fetchData={fetchData} />;
      case "password":
        return <ChangePassword />;
      case "user-logs":
        return (
          <div className="section-card">
            <div className="section-head"><h2>User Logs</h2><button className="btn-primary" onClick={fetchData}>🔄 Refresh</button></div>
            {data.logs.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>📜 Koi log nahi hai. Student login/logout kare tab dikhai dega.</p>
            ) : (
              <div className="table-wrapper">
                <table className="user-table">
                  <thead><tr><th>#</th><th>User Name</th><th>Email</th><th>Action</th><th>IP Address</th><th>Date & Time</th></tr></thead>
                  <tbody>
                    {data.logs.map((log, idx) => (
                      <tr key={log._id}>
                        <td style={{ color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</td>
                        <td style={{ fontWeight: 500 }}>{log.userName}</td>
                        <td style={{ color: "#64748b" }}>{log.userEmail}</td>
                        <td>{log.action === "login" ? <span className="badge-login">🟢 Login</span> : <span className="badge-logout">🔴 Logout</span>}</td>
                        <td style={{ color: "#64748b", fontSize: "12px", fontFamily: "monospace" }}>{log.ipAddress || "—"}</td>
                        <td style={{ color: "#64748b", fontSize: "12px" }}>{new Date(log.createdAt).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      default: return <div>Select an option</div>;
    }
  };

  const navGroups = [
    { label: "Core", items: [
      { id: "dashboard", icon: "🏠", label: "Overview" },
      { id: "college",   icon: "🏫", label: "Colleges" },
      { id: "session",   icon: "📅", label: "Sessions" },
    ]},
    { label: "Management", items: [
      { id: "complaints", icon: "📂", label: "Complaints" },
      { id: "user-logs",  icon: "📜", label: "User Logs" },
    ]},
    { label: "Safety & Community", items: [
      { id: "blocked", icon: "🚫", label: "Blocked Users" },
      { id: "forum",   icon: "💬", label: "Forum" },
    ]},
    { label: "System", items: [
      { id: "password", icon: "🔒", label: "Security" },
    ]},
  ];

  const pageTitle = navGroups.flatMap(g => g.items).find(i => i.id === active)?.label || active;

  return (
    <div className="wrap">
      <style>{styles}</style>

      {/* Overlay — mobile pe sidebar ke peeche dark background */}
      <div
        className={`overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">A</div>
          <div className="brand-text">Admin Panel</div>
          {/* Mobile close button */}
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {navGroups.map(group => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span style={{ fontSize: "15px" }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="spacer" />
        <button className="logout" onClick={handleLogout}>🚪 Logout Session</button>

        <div className="user-chip">
          <div className="user-chip-inner">
            <div className="user-avatar">A</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500", color: "#f1f5f9" }}>Administrator</div>
              <div style={{ fontSize: "11px", color: "#475569" }}>Super Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            {/* Hamburger — sirf mobile pe dikhega */}
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>☰</button>
            <span className="topbar-title">{pageTitle}</span>
          </div>
          <span className="topbar-college" style={{ fontSize: "13px", color: "#64748b" }}>
            Mohd Hasan P G College
          </span>
        </div>

        <div className="content">
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
              <div style={{ fontSize: "14px" }}>Backend se data load ho raha hai...</div>
            </div>
          ) : renderContent()}
        </div>
      </div>
    </div>
  );
}