
import React, { useState } from 'react';

const FeatureCard = ({ icon, title, desc, delay }) => (
    <div 
        className="feature-card" 
        style={{
            animation: `fadeInUp 0.6s ease-out ${delay}s backwards`,
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <div className="feature-glow" />
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
    </div>
);

const TechSpec = ({ label, value }) => (
    <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '12px 0', 
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
        <span style={{color: '#888'}}>{label}</span>
        <span style={{color: '#fff', fontFamily: 'monospace'}}>{value}</span>
    </div>
);

const Features = () => {
  const [activeTab, setActiveTab] = useState('core');

  return (
    <div className="page-container">
      <section className="hero" style={{padding: '80px 20px', textAlign: 'center'}}>
        <div className="badge" style={{marginBottom: '20px'}}>VERSION 2.0 NOW AVAILABLE</div>
        <h1 className="hero-title">Engineered for <span className="gradient-text">Perfection</span></h1>
        <p className="hero-subtitle">
            The most advanced React inspection tool ever built. 
            Dive deep into the Fiber architecture with zero overhead.
        </p>
      </section>

      {/* Interactive Feature Grid */}
      <div className="features-grid" style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '32px', 
          padding: '0 40px 80px 40px', 
          maxWidth: '1400px', 
          margin: '0 auto'
      }}>
        <FeatureCard 
            delay={0.1}
            icon="🔍" 
            title="Deep Fiber Inspection" 
            desc="Traverse the React Fiber tree with surgical precision. View memoized props, state, and context consumers for any component node." 
        />
        <FeatureCard 
            delay={0.2}
            icon="⚡" 
            title="Zero-Latency Editing" 
            desc="Modify props and state in real-time. Our direct memory manipulation engine ensures changes are reflected instantly without full re-renders." 
        />
        <FeatureCard 
            delay={0.3}
            icon="🧠" 
            title="Neural AI Assistant" 
            desc="Integrated LLM context awareness allows you to refactor components using natural language. 'Make this button pop' is all you need to say." 
        />
        <FeatureCard 
            delay={0.4}
            icon="🎨" 
            title="Atomic Style Injection" 
            desc="Manipulate CSS-in-JS and utility classes directly. Supports Tailwind, Styled Components, and raw CSS injection." 
        />
        <FeatureCard 
            delay={0.5}
            icon="🔄" 
            title="Time Travel Debugging" 
            desc="Step back through prop and state changes. Our immutable history log lets you undo mistakes and replay component lifecycles." 
        />
        <FeatureCard 
            delay={0.6}
            icon="📦" 
            title="Production Ready" 
            desc="Tree-shakeable and lightweight. FiberScope automatically disables itself in production builds unless explicitly configured." 
        />
      </div>

      {/* Technical Deep Dive Section */}
      <section style={{background: '#0A0A0A', padding: '80px 20px', borderTop: '1px solid #222'}}>
          <div style={{maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px'}}>
              <div>
                  <h2 style={{fontSize: '32px', marginBottom: '20px', color: '#fff'}}>Technical Specifications</h2>
                  <p style={{color: '#888', marginBottom: '40px', lineHeight: '1.6'}}>
                      FiberScope hooks directly into the React Reconciler, bypassing the standard DevTools protocol for faster, more granular access to the component tree.
                  </p>
                  
                  <div style={{display: 'flex', gap: '20px', marginBottom: '40px'}}>
                      <button 
                        onClick={() => setActiveTab('core')}
                        style={{
                            background: activeTab === 'core' ? '#A56FFF' : 'transparent',
                            border: activeTab === 'core' ? 'none' : '1px solid #333',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                      >
                          Core Engine
                      </button>
                      <button 
                        onClick={() => setActiveTab('perf')}
                        style={{
                            background: activeTab === 'perf' ? '#A56FFF' : 'transparent',
                            border: activeTab === 'perf' ? 'none' : '1px solid #333',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                      >
                          Performance
                      </button>
                  </div>

                  {activeTab === 'core' ? (
                      <div className="tech-specs">
                          <TechSpec label="React Version Support" value="v16.8+" />
                          <TechSpec label="Fiber Traversal" value="Depth-First Search" />
                          <TechSpec label="State Resolution" value="Linked List Parsing" />
                          <TechSpec label="Bundle Size" value="< 12KB (Gzipped)" />
                      </div>
                  ) : (
                      <div className="tech-specs">
                          <TechSpec label="Render Overhead" value="< 0.5ms" />
                          <TechSpec label="Memory Footprint" value="~2MB" />
                          <TechSpec label="Frame Rate Impact" value="Negligible" />
                          <TechSpec label="Lazy Loading" value="Enabled" />
                      </div>
                  )}
              </div>
              
              <div style={{
                  background: '#111', 
                  borderRadius: '16px', 
                  border: '1px solid #333', 
                  padding: '30px',
                  position: 'relative',
                  overflow: 'hidden'
              }}>
                  <div style={{
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '4px', 
                      background: 'linear-gradient(90deg, #A56FFF, #00F0FF)'
                  }} />
                  <h3 style={{color: '#fff', marginBottom: '20px'}}>Architecture Diagram</h3>
                  <div style={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '10px', 
                      fontFamily: 'monospace', 
                      color: '#666'
                  }}>
                      <div style={{padding: '10px', border: '1px dashed #444', borderRadius: '4px', textAlign: 'center'}}>React DOM</div>
                      <div style={{textAlign: 'center'}}>⬇️</div>
                      <div style={{padding: '10px', border: '1px solid #A56FFF', borderRadius: '4px', color: '#A56FFF', textAlign: 'center', background: 'rgba(165, 111, 255, 0.1)'}}>FiberScope Injector</div>
                      <div style={{textAlign: 'center'}}>⬇️</div>
                      <div style={{display: 'flex', gap: '10px'}}>
                          <div style={{flex: 1, padding: '10px', border: '1px solid #333', borderRadius: '4px', textAlign: 'center'}}>Prop Mutator</div>
                          <div style={{flex: 1, padding: '10px', border: '1px solid #333', borderRadius: '4px', textAlign: 'center'}}>Tree Walker</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Features;
