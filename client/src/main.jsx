import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Sabse pehle Bootstrap CSS (taaki hamari custom CSS ise override kar sake)
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// 2. Bootstrap JS (Dropdowns aur Modals ke liye)
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// 3. Aapki apni Custom Styling (Jo design maine pehle diya tha)
import './index.css';

// 4. Main App Component
import App from './App.jsx';

// Root element ko target karke render karna
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);