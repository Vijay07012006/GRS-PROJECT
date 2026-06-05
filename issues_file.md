# 🚨 GRS Project - Analyzed Issues File

This file lists all the identified issues, bugs, and gaps in the Grievance Redressal System (GRS) project across the frontend (Client) and backend (Server).

---

## 1. Student Complaint Retrieval Bug (My Complaints Section)
* **Problem**: When a student submits a complaint, it registers successfully but does not show up in the **My Complaints** section.
* **Root Cause**:
  * In `client/src/pages/student/StudentDashboard.jsx` (line 5), the API base URL is defined as:
    `const API = "https://grivance.onrender.com/api";` (which already ends with `/api`).
  * In the `fetchComplaints` function (line 96), the code makes a request to:
    `${API}/api/complaint/student/${studentIdToUse}`
  * This resolves to the URL:
    `https://grivance.onrender.com/api/api/complaint/student/${studentIdToUse}`
  * The double `/api/api` path causes a `404 Not Found` response from the backend, failing to load any complaints.
* **Similar Occurrences in `StudentDashboard.jsx`**:
  * Fetching complaint categories: `${API}/api/complaint-type` -> `/api/api/complaint-type` (404)
  * Fetching forum posts: `${API}/api/forum/posts` -> `/api/api/forum/posts` (404)
  * Adding a complaint: `${API}/api/complaint` -> `/api/api/complaint` (404)
  * Updating student profile: `${API}/api/student/update-profile` -> `/api/api/student/update-profile` (404)
  * Changing password: `${API}/api/student/change-password` -> `/api/api/student/change-password` (404)
  * Creating a forum post: `${API}/api/forum/posts/${studentId}/reply` -> `/api/api/forum/posts/...` (404)

---

## 2. Hardcoded API URLs
* **Problem**: The frontend files contain a hardcoded Render URL (`https://grivance.onrender.com/api`), which prevents local testing.
* **Root Cause**:
  * In `StudentDashboard.jsx`, `Register.jsx`, `Login.jsx`, `Logout.jsx`, and `AdminDashboard.jsx`, the API endpoints are hardcoded to the production server.
  * Local development `.env` configuration (`VITE_API_URL`) is completely ignored.
* **Solution**: Replace hardcoded strings with `import.meta.env.VITE_API_URL` as the base URL, with the production URL as a fallback.

---

## 3. Discussion Forum Post Creation Bug
* **Problem**: Creating a new discussion forum post fails or maps to the wrong route.
* **Root Cause**:
  * In `StudentDashboard.jsx` (line 250), `handleNewForumPost` sends a POST request to:
    `${API}/api/forum/posts/${studentId}/reply`
  * This matches the reply route (`/posts/:id/reply`) instead of the create post route (`/posts`).
  * The backend route for creating a post is a POST request to `/api/forum/posts`.

---

## 4. Fake Admin Login
* **Problem**: Anyone can log into the Admin panel using any credentials.
* **Root Cause**:
  * In `client/src/pages/admin/AdminLogin.jsx`, the login handler does not communicate with the backend. It uses a `setTimeout` to wait 1 second and then directly navigates to `/admin-dashboard`.
* **Solution**: Connect the form to the backend endpoint `/api/admin/login` and save the returned token and credentials in `localStorage`.

---

## 5. Lacking Admin Route Protection
* **Problem**: The Admin panel is insecure and accessible without authentication.
* **Root Cause**:
  * In `client/src/App.jsx`, the `/admin-dashboard` route is directly accessible. There is no route guard checking for admin authentication status.
* **Solution**: Create a `ProtectedAdmin` route wrapper (similar to `Protected.jsx` for students) to verify the admin session.

---

## 6. Non-Functional Admin Logout page (`AdLogout.jsx`)
* **Problem**: The admin logout confirmation buttons do nothing when clicked.
* **Root Cause**:
  * `client/src/pages/admin/AdLogout.jsx` has buttons with styling and hover effects but lacks any `onClick` event listeners. It does not clear local storage or redirect.

---

## 7. Mismatched Session Keys in Student Logout (`Logout.jsx`)
* **Problem**: After student logout, the student still appears to be logged in, or local storage is not properly cleaned up.
* **Root Cause**:
  * During login (`Login.jsx`), the keys saved in local storage are: `isLoggedIn`, `studentName`, `studentId`, and `token`.
  * During logout (`Logout.jsx`), the keys deleted are: `token`, `id`, `name`, and `email`.
  * The keys `isLoggedIn`, `studentName`, and `studentId` remain in local storage, keeping the session active.

---

## 8. Missing Student Logout Endpoint on Backend
* **Problem**: Student logout calls a non-existent API route.
* **Root Cause**:
  * In `Logout.jsx`, a request is made to `/student/logout` on the backend, but the backend server (`studentRoute.js` or `studentController.js`) does not expose a logout route.
  * Express returns a `404 Not Found` for the logout API call.

---

## 9. Security/Auth Enforcement Gap
* **Problem**: The backend routes do not enforce JWT authentication.
* **Root Cause**:
  * While the frontend sends `Authorization: Bearer <token>` headers on some calls, the server does not have any authentication middleware to verify the tokens.
* **Solution**: In the future, a JWT authentication middleware should be created and applied to secure routes.
