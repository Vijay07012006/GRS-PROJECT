import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// COMPONENTS
import Protected from './Components/Protected';
import ProtectedAdmin from './Components/ProtectedAdmin';

// GENERAL PAGES
import Home from './pages/Home';

// ADMIN PAGES
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdLogout from './pages/admin/AdLogout';

// STUDENT PAGES
import StudentDashboard from './pages/student/StudentDashboard';
import Register from './pages/student/Register';
import Login from './pages/student/Login';
import Logout from './pages/student/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin-login' element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedAdmin />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-logout' element={<AdLogout />} />
        </Route>

        {/* STUDENT PROTECTED ROUTES */}
        <Route path='/student' element={<Protected />}>
          {/* Default student dashboard */}
          <Route index element={<StudentDashboard />} />

          {/* Correct nested paths */}
          <Route path='dashboard' element={<StudentDashboard />} />
          <Route path='logout' element={<Logout />} />
        </Route>

        {/* 404 PAGE */}
        <Route
          path='*'
          element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;