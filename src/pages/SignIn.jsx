import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    console.log('Login attempt:', { email, password });
    // Redirect to Admin Panel
    navigate('/admin');
  };

  return (
    <div className="page-container" style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 160px)' // Adjust for header/footer
    }}>
      <div style={{
          background: '#0A0A0A',
          border: '1px solid #222',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <h1 style={{fontSize: '28px', color: '#fff', marginBottom: '10px'}}>Welcome Back</h1>
            <p style={{color: '#888'}}>Sign in to your FiberScope account</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px'}}>Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#111',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    placeholder="name@company.com"
                    onFocus={(e) => e.target.style.borderColor = '#A56FFF'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                />
            </div>

            <div style={{marginBottom: '30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                    <label style={{color: '#ccc', fontSize: '14px'}}>Password</label>
                    <Link to="/forgot-password" style={{color: '#A56FFF', fontSize: '12px', textDecoration: 'none'}}>Forgot password?</Link>
                </div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#111',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    placeholder="••••••••"
                    onFocus={(e) => e.target.style.borderColor = '#A56FFF'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                />
            </div>

            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{
                    width: '100%', 
                    padding: '12px', 
                    fontSize: '16px',
                    background: 'linear-gradient(90deg, #A56FFF, #8844FF)',
                    border: 'none'
                }}
            >
                Sign In
            </button>
        </form>

        <div style={{marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px'}}>
            <p style={{color: '#666', fontSize: '14px'}}>
                Don't have an account? <Link to="/signup" style={{color: '#fff', textDecoration: 'none'}}>Sign up</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;