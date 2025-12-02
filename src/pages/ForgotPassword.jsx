import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock reset logic
    console.log('Reset password for:', email);
    setSubmitted(true);
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
            <h1 style={{fontSize: '28px', color: '#fff', marginBottom: '10px'}}>Reset Password</h1>
            <p style={{color: '#888'}}>Enter your email to receive reset instructions</p>
        </div>

        {!submitted ? (
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '30px'}}>
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
                        required
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
                    Send Reset Link
                </button>
            </form>
        ) : (
            <div style={{textAlign: 'center', padding: '20px 0'}}>
                <div style={{fontSize: '48px', marginBottom: '20px'}}>✉️</div>
                <h3 style={{color: '#fff', marginBottom: '10px'}}>Check your email</h3>
                <p style={{color: '#888', marginBottom: '30px'}}>
                    We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <button 
                    onClick={() => setSubmitted(false)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Try another email
                </button>
            </div>
        )}

        <div style={{marginTop: '30px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px'}}>
            <Link to="/signin" style={{color: '#666', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <span>←</span> Back to Sign In
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;