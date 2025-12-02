import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Documentation from './pages/Documentation';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import './App.css'

// Navbar Component
const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo-text" style={{textDecoration: 'none'}}>FiberScope</Link>
    <div className="nav-links">
      <Link to="/features" className="nav-link">Features</Link>
      <Link to="/docs" className="nav-link">Documentation</Link>
      <Link to="/pricing" className="nav-link">Pricing</Link>
    </div>
    <Link to="/signin">
        <button className="btn btn-secondary" style={{padding: '8px 16px', fontSize: '13px'}}>Sign In</button>
    </Link>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <p>© 2025 FiberScope Inc. All rights reserved.</p>
  </footer>
);

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
