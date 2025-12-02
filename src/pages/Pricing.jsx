
import React, { useState } from 'react';

const CheckIcon = () => <span style={{color: '#00F0FF', marginRight: '10px'}}>✓</span>;
const CrossIcon = () => <span style={{color: '#444', marginRight: '10px'}}>✕</span>;

const PricingCard = ({ title, price, period, desc, features, recommended, buttonText }) => (
    <div className="pricing-card" style={{
        background: recommended ? 'linear-gradient(180deg, rgba(165, 111, 255, 0.08) 0%, #0A0A0A 100%)' : '#0A0A0A',
        border: recommended ? '1px solid #A56FFF' : '1px solid #222',
        borderRadius: '24px',
        padding: '40px',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: recommended ? '0 0 40px rgba(165, 111, 255, 0.1)' : 'none',
        transform: recommended ? 'scale(1.05)' : 'scale(1)',
        zIndex: recommended ? 2 : 1
    }}>
        {recommended && (
            <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#A56FFF',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
                MOST POPULAR
            </div>
        )}
        <h3 style={{color: '#fff', fontSize: '24px', margin: '0 0 10px 0'}}>{title}</h3>
        <div style={{fontSize: '42px', fontWeight: 'bold', color: '#fff', marginBottom: '20px'}}>
            ${price} <span style={{fontSize: '14px', color: '#666', fontWeight: 'normal'}}>/ {period}</span>
        </div>
        <p style={{color: '#888', marginBottom: '30px', lineHeight: '1.5'}}>{desc}</p>
        
        <ul style={{listStyle: 'none', padding: 0, margin: '0 0 40px 0', color: '#ccc', lineHeight: '2.5'}}>
            {features.map((f, i) => (
                <li key={i} style={{display: 'flex', alignItems: 'center', opacity: f.included ? 1 : 0.5}}>
                    {f.included ? <CheckIcon /> : <CrossIcon />}
                    {f.text}
                </li>
            ))}
        </ul>
        
        <button className={recommended ? "btn btn-primary" : "btn btn-secondary"} style={{width: '100%', marginTop: 'auto'}}>
            {buttonText}
        </button>
    </div>
);

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="page-container">
      <section className="hero" style={{padding: '80px 20px', textAlign: 'center'}}>
        <h1 className="hero-title">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
        <p className="hero-subtitle">Start for free, upgrade when you need power.</p>
        
        {/* Toggle */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '40px'}}>
            <span style={{color: !annual ? '#fff' : '#666', cursor: 'pointer'}} onClick={() => setAnnual(false)}>Monthly</span>
            <div 
                onClick={() => setAnnual(!annual)}
                style={{
                    width: '50px',
                    height: '26px',
                    background: '#222',
                    borderRadius: '13px',
                    position: 'relative',
                    cursor: 'pointer',
                    border: '1px solid #333'
                }}
            >
                <div style={{
                    width: '20px',
                    height: '20px',
                    background: '#A56FFF',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: annual ? '26px' : '2px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }} />
            </div>
            <span style={{color: annual ? '#fff' : '#666', cursor: 'pointer'}} onClick={() => setAnnual(true)}>
                Yearly <span style={{color: '#00F0FF', fontSize: '12px', marginLeft: '4px'}}>(Save 20%)</span>
            </span>
        </div>
      </section>

      <div className="pricing-grid" style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '32px', 
          padding: '40px', 
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
      }}>
        
        <PricingCard 
            title="Starter"
            price="0"
            period="forever"
            desc="Essential tools for hobbyists and students learning React."
            buttonText="Start Free"
            features={[
                {text: "Basic Fiber Inspection", included: true},
                {text: "Prop Editing", included: true},
                {text: "Community Support", included: true},
                {text: "AI Refactoring", included: false},
                {text: "Team Collaboration", included: false},
            ]}
        />

        <PricingCard 
            title="Pro"
            price={annual ? "12" : "15"}
            period="month"
            recommended={true}
            desc="Advanced features for professional developers and freelancers."
            buttonText="Get Pro"
            features={[
                {text: "Everything in Starter", included: true},
                {text: "Unlimited AI Requests", included: true},
                {text: "Time Travel Debugging", included: true},
                {text: "Code Export", included: true},
                {text: "Priority Support", included: true},
            ]}
        />

        <PricingCard 
            title="Enterprise"
            price={annual ? "49" : "59"}
            period="month"
            desc="Security and control for large engineering teams."
            buttonText="Contact Sales"
            features={[
                {text: "Everything in Pro", included: true},
                {text: "SSO & SAML", included: true},
                {text: "On-premise Deployment", included: true},
                {text: "Custom Contracts", included: true},
                {text: "Dedicated Success Manager", included: true},
            ]}
        />

      </div>

      {/* FAQ Section */}
      <section style={{maxWidth: '800px', margin: '80px auto', padding: '0 20px'}}>
          <h2 style={{textAlign: 'center', color: '#fff', marginBottom: '40px'}}>Frequently Asked Questions</h2>
          <div style={{display: 'grid', gap: '20px'}}>
              <div style={{background: '#111', padding: '20px', borderRadius: '8px'}}>
                  <h4 style={{color: '#fff', marginBottom: '10px'}}>Does this work in production?</h4>
                  <p style={{color: '#888', fontSize: '14px'}}>Yes, but we recommend disabling it for end-users. FiberScope is optimized to have zero runtime overhead when inactive.</p>
              </div>
              <div style={{background: '#111', padding: '20px', borderRadius: '8px'}}>
                  <h4 style={{color: '#fff', marginBottom: '10px'}}>Do you support Next.js / Remix?</h4>
                  <p style={{color: '#888', fontSize: '14px'}}>Absolutely. FiberScope works with any React 16.8+ environment, including SSR frameworks (client-side hydration required).</p>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Pricing;
