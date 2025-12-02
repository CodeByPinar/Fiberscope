
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-desc">{desc}</p>
  </div>
);

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✨ v2.0 Now Available</span>
          <h1 className="hero-title">
            Debug React<br /><span>Like Never Before</span>
          </h1>
          <p className="hero-subtitle">
            Stop guessing component structures. Inspect, modify, and rewrite your UI directly from the browser with AI-powered tools.
          </p>
          <div className="hero-buttons">
            <Link to="/signup">
              <button className="btn btn-primary">Get Started Free</button>
            </Link>
            <Link to="/docs">
              <button className="btn btn-secondary">Read Documentation</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2 className="section-title">Everything you need to debug faster</h2>
          <p className="section-desc">Powerful tools designed for modern React development workflows.</p>
        </div>
        <div className="features-grid">
          <FeatureCard 
            icon="🔍" 
            title="Deep Inspection" 
            desc="Traverse the Fiber tree to understand exactly how your components are rendered, re-rendered, and structured in real-time." 
          />
          <FeatureCard 
            icon="🤖" 
            title="AI Modification" 
            desc="Use natural language to modify props, styles, and content. Let our AI agent be your personal UI architect." 
          />
          <FeatureCard 
            icon="⚡" 
            title="Live Editing" 
            desc="Tweak properties, state, and hooks in real-time. Export the generated code back to your editor with one click." 
          />
          <FeatureCard 
            icon="📊" 
            title="Performance Metrics" 
            desc="Track render counts, commit times, and wasted renders to optimize your application's performance." 
          />
          <FeatureCard 
            icon="🔌" 
            title="Zero Config" 
            desc="Drop it into any React project. No complex setup, no build step configuration required." 
          />
          <FeatureCard 
            icon="🛡️" 
            title="Type Safe" 
            desc="Built with TypeScript in mind. Full support for inspecting typed props and generic components." 
          />
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-desc">Three simple steps to master your React debugging.</p>
        </div>
        <div className="steps-grid">
          <StepCard 
            number="01"
            title="Install the Package"
            desc="Add FiberScope to your project using npm or yarn. It's lightweight and dev-dependency friendly."
          />
          <StepCard 
            number="02"
            title="Wrap Your App"
            desc="Import the FiberScope provider and wrap your root component. That's all the setup you need."
          />
          <StepCard 
            number="03"
            title="Start Inspecting"
            desc="Open your app, click the FiberScope trigger, and start exploring your component tree instantly."
          />
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Ready to level up?</h2>
          <p className="cta-desc">Join thousands of developers who are debugging smarter, not harder.</p>
          <Link to="/signup">
            <button className="btn btn-primary" style={{padding: '16px 32px', fontSize: '18px'}}>Start for Free</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
