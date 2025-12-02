import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Shared Components ---
const StatCard = ({ title, value, change }) => (
    <div style={{
        background: '#111',
        border: '1px solid #222',
        borderRadius: '12px',
        padding: '20px',
        flex: 1
    }}>
        <div style={{color: '#888', fontSize: '14px', marginBottom: '10px'}}>{title}</div>
        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '5px'}}>{value}</div>
        <div style={{color: change.startsWith('+') ? '#00F0FF' : '#FF4444', fontSize: '12px'}}>
            {change} from last month
        </div>
    </div>
);

const Button = ({ children, variant = 'primary', onClick, style }) => (
    <button 
        onClick={onClick}
        style={{
            background: variant === 'primary' ? '#A56FFF' : '#222',
            color: '#fff',
            border: variant === 'primary' ? 'none' : '1px solid #333',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            ...style
        }}
    >
        {children}
    </button>
);

// --- Views ---

const DashboardView = () => (
    <>
        {/* Stats Grid */}
        <div style={{display: 'flex', gap: '20px', marginBottom: '40px'}}>
            <StatCard title="Total Users" value="12,450" change="+12%" />
            <StatCard title="Active Sessions" value="843" change="+5%" />
            <StatCard title="Revenue" value="$45,200" change="+18%" />
            <StatCard title="Server Load" value="24%" change="-2%" />
        </div>

        {/* Recent Activity */}
        <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '20px'}}>
            <h3 style={{color: '#fff', marginBottom: '20px', fontSize: '18px'}}>Recent Activity</h3>
            <table style={{width: '100%', borderCollapse: 'collapse', color: '#ccc'}}>
                <thead>
                    <tr style={{borderBottom: '1px solid #333', textAlign: 'left'}}>
                        <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>USER</th>
                        <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>ACTION</th>
                        <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>DATE</th>
                        <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {[1,2,3,4].map((i) => (
                        <tr key={i} style={{borderBottom: '1px solid #1a1a1a'}}>
                            <td style={{padding: '15px'}}>user_{i}@example.com</td>
                            <td style={{padding: '15px'}}>Updated profile settings</td>
                            <td style={{padding: '15px'}}>2 mins ago</td>
                            <td style={{padding: '15px'}}><span style={{color: '#00F0FF', background: 'rgba(0, 240, 255, 0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>Completed</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

const UsersView = () => (
    <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '20px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <input 
                placeholder="Search users..." 
                style={{background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '6px', color: '#fff', width: '300px'}}
            />
            <Button>+ Add User</Button>
        </div>
        <table style={{width: '100%', borderCollapse: 'collapse', color: '#ccc'}}>
            <thead>
                <tr style={{borderBottom: '1px solid #333', textAlign: 'left'}}>
                    <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>NAME</th>
                    <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>ROLE</th>
                    <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>STATUS</th>
                    <th style={{padding: '15px', color: '#666', fontSize: '12px'}}>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {[
                    {name: 'Alice Johnson', role: 'Admin', status: 'Active'},
                    {name: 'Bob Smith', role: 'Editor', status: 'Offline'},
                    {name: 'Charlie Brown', role: 'Viewer', status: 'Active'},
                    {name: 'Diana Prince', role: 'Admin', status: 'Active'},
                ].map((u, i) => (
                    <tr key={i} style={{borderBottom: '1px solid #1a1a1a'}}>
                        <td style={{padding: '15px'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <div style={{width: '30px', height: '30px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{u.name[0]}</div>
                                {u.name}
                            </div>
                        </td>
                        <td style={{padding: '15px'}}>{u.role}</td>
                        <td style={{padding: '15px'}}>
                            <span style={{
                                color: u.status === 'Active' ? '#00F0FF' : '#888', 
                                background: u.status === 'Active' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.05)', 
                                padding: '4px 8px', borderRadius: '4px', fontSize: '12px'
                            }}>
                                {u.status}
                            </span>
                        </td>
                        <td style={{padding: '15px'}}>
                            <Button variant="secondary" style={{fontSize: '12px', padding: '4px 8px'}}>Edit</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const AnalyticsView = () => (
    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px'}}>
        <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '20px', height: '300px'}}>
            <h3 style={{color: '#fff', marginBottom: '20px'}}>Traffic Overview</h3>
            <div style={{display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid #333'}}>
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} style={{flex: 1, background: '#A56FFF', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8}}></div>
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#666', fontSize: '12px'}}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>
        <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '20px'}}>
            <h3 style={{color: '#fff', marginBottom: '20px'}}>Device Usage</h3>
            <div style={{marginTop: '40px'}}>
                <div style={{marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '5px'}}><span>Desktop</span><span>65%</span></div>
                    <div style={{height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '65%', height: '100%', background: '#00F0FF', borderRadius: '4px'}}></div></div>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '5px'}}><span>Mobile</span><span>25%</span></div>
                    <div style={{height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '25%', height: '100%', background: '#A56FFF', borderRadius: '4px'}}></div></div>
                </div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '5px'}}><span>Tablet</span><span>10%</span></div>
                    <div style={{height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '10%', height: '100%', background: '#FF4444', borderRadius: '4px'}}></div></div>
                </div>
            </div>
        </div>
    </div>
);

const SettingsView = () => (
    <div style={{maxWidth: '800px'}}>
        <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '30px', marginBottom: '30px'}}>
            <h3 style={{color: '#fff', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>Profile Settings</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div>
                    <label style={{display: 'block', color: '#888', marginBottom: '8px'}}>Full Name</label>
                    <input defaultValue="Admin User" style={{width: '100%', padding: '10px', background: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff'}} />
                </div>
                <div>
                    <label style={{display: 'block', color: '#888', marginBottom: '8px'}}>Email</label>
                    <input defaultValue="admin@fiberscope.dev" style={{width: '100%', padding: '10px', background: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff'}} />
                </div>
            </div>
            <Button>Save Changes</Button>
        </div>

        <div style={{background: '#0A0A0A', border: '1px solid #222', borderRadius: '16px', padding: '30px'}}>
            <h3 style={{color: '#fff', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>Notifications</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {['Email Alerts', 'Push Notifications', 'Weekly Reports', 'Security Alerts'].map((item, i) => (
                    <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span style={{color: '#ccc'}}>{item}</span>
                        <div style={{width: '40px', height: '20px', background: i % 2 === 0 ? '#A56FFF' : '#333', borderRadius: '10px', position: 'relative', cursor: 'pointer'}}>
                            <div style={{width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: i % 2 === 0 ? '22px' : '2px', transition: 'all 0.2s'}}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
      switch(activeTab) {
          case 'users': return <UsersView />;
          case 'analytics': return <AnalyticsView />;
          case 'settings': return <SettingsView />;
          default: return <DashboardView />;
      }
  };

  const NavItem = ({ id, label }) => (
      <div 
        onClick={() => setActiveTab(id)}
        style={{
            padding: '10px', 
            background: activeTab === id ? 'rgba(165, 111, 255, 0.1)' : 'transparent', 
            color: activeTab === id ? '#fff' : '#888', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            borderLeft: activeTab === id ? '3px solid #A56FFF' : '3px solid transparent',
            transition: 'all 0.2s'
        }}
      >
          {label}
      </div>
  );

  return (
    <div className="page-container" style={{display: 'flex', minHeight: 'calc(100vh - 80px)', paddingTop: 0}}>
      {/* Sidebar */}
      <div style={{
          width: '250px',
          borderRight: '1px solid #222',
          background: '#050505',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
      }}>
          <div style={{color: '#666', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', paddingLeft: '10px'}}>MENU</div>
          <NavItem id="dashboard" label="Dashboard" />
          <NavItem id="users" label="Users" />
          <NavItem id="analytics" label="Analytics" />
          <NavItem id="settings" label="Settings" />

          <div style={{color: '#666', fontSize: '12px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', paddingLeft: '10px'}}>SITE LINKS</div>
          <Link to="/features" style={{textDecoration: 'none', display: 'block', padding: '10px 10px 10px 20px', color: '#888', fontSize: '14px', transition: 'color 0.2s'}} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#888'}>Features</Link>
          <Link to="/docs" style={{textDecoration: 'none', display: 'block', padding: '10px 10px 10px 20px', color: '#888', fontSize: '14px', transition: 'color 0.2s'}} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#888'}>Documentation</Link>
          <Link to="/pricing" style={{textDecoration: 'none', display: 'block', padding: '10px 10px 10px 20px', color: '#888', fontSize: '14px', transition: 'color 0.2s'}} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#888'}>Pricing</Link>
          
          <div style={{marginTop: 'auto'}}>
            <Link to="/" style={{textDecoration: 'none'}}>
                <div style={{padding: '10px', color: '#FF4444', cursor: 'pointer'}}>Sign Out</div>
            </Link>
          </div>
      </div>

      {/* Main Content */}
      <div style={{flex: 1, padding: '40px', overflowY: 'auto', height: 'calc(100vh - 80px)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
              <h1 style={{fontSize: '24px', color: '#fff', textTransform: 'capitalize'}}>{activeTab}</h1>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#A56FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold'}}>A</div>
                  <span style={{color: '#fff'}}>Admin User</span>
              </div>
          </div>

          {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;