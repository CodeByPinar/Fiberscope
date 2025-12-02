import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup logic
    console.log('Signup attempt:', { name, email, password });
  };

  return (
    <div className="page-container" style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 160px)'
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
            <h1 style={{fontSize: '28px', color: '#fff', marginBottom: '10px'}}>Create Account</h1>
            <p style={{color: '#888'}}>Join FiberScope today</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px'}}>Full Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="John Doe"
                    onFocus={(e) => e.target.style.borderColor = '#A56FFF'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                />
            </div>

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
                <label style={{display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px'}}>Password</label>
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
                    placeholder="Create a password"
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
                Sign Up
            </button>
        </form>

        <div style={{marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px'}}>
            <p style={{color: '#666', fontSize: '14px'}}>
                Already have an account? <Link to="/signin" style={{color: '#fff', textDecoration: 'none'}}>Sign in</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;