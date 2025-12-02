
import React, { useState } from 'react';

const DocLink = ({ active, children, onClick }) => (
    <div 
        onClick={onClick}
        style={{
            padding: '10px 16px',
            cursor: 'pointer',
            color: active ? '#fff' : '#888',
            borderLeft: active ? '2px solid #A56FFF' : '2px solid transparent',
            background: active ? 'rgba(165, 111, 255, 0.05)' : 'transparent',
            transition: 'all 0.2s',
            fontSize: '14px'
        }}
    >
        {children}
    </div>
);

const CodeBlock = ({ code, language = 'javascript' }) => (
    <div style={{
        background: '#0F0F13',
        border: '1px solid #2A2A35',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '10px',
            color: '#666',
            textTransform: 'uppercase'
        }}>{language}</div>
        <pre style={{margin: 0, overflowX: 'auto'}}>
            <code style={{fontFamily: 'JetBrains Mono, monospace', color: '#ccc', fontSize: '13px'}}>
                {code}
            </code>
        </pre>
    </div>
);

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const renderContent = () => {
      switch(activeSection) {
          case 'intro':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Introduction</h1>
                      <p className="doc-text">
                          FiberScope is a next-generation developer tool that bridges the gap between your React code and the rendered DOM. 
                          Unlike traditional devtools, FiberScope runs entirely in user-space, allowing for direct manipulation of the Fiber tree without browser extensions.
                      </p>
                      <div className="info-box">
                          <strong>Note:</strong> FiberScope is currently in Beta. Some internal React APIs may change between versions.
                      </div>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>Why FiberScope?</h3>
                      <p className="doc-text">
                          React's internal Fiber architecture is complex. FiberScope demystifies it by providing a visual, interactive interface to explore the component tree, inspect state and props, and even modify them in real-time.
                      </p>
                  </div>
              );
          case 'install':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Installation</h1>
                      <p className="doc-text">Get started by installing the package via npm or yarn.</p>
                      <CodeBlock code="npm install @fiberscope/core" language="bash" />
                      <p className="doc-text">Or using yarn:</p>
                      <CodeBlock code="yarn add @fiberscope/core" language="bash" />
                      <h3 style={{color: '#fff', marginTop: '30px'}}>Requirements</h3>
                      <ul className="doc-list" style={{color: '#ccc', lineHeight: '1.8', paddingLeft: '20px'}}>
                          <li>React 16.8 or higher</li>
                          <li>ReactDOM 16.8 or higher</li>
                          <li>Modern browser (Chrome, Firefox, Safari, Edge)</li>
                      </ul>
                  </div>
              );
          case 'usage':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Basic Usage</h1>
                      <p className="doc-text">Wrap your application root with the <code>FiberScope</code> provider. This enables the inspection overlay.</p>
                      <CodeBlock code={`import { FiberScope } from '@fiberscope/core';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <FiberScope enabled={process.env.NODE_ENV === 'development'}>
    <App />
  </FiberScope>
);`} />
                      <p className="doc-text">
                          Once installed, you will see the FiberScope trigger in the bottom-right corner of your application. Click it to open the inspector.
                      </p>
                  </div>
              );
          case 'architecture':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Architecture</h1>
                      <p className="doc-text">
                          FiberScope works by traversing the Fiber tree starting from the root container. It uses the internal `_reactRootContainer` or `_reactListening` properties attached to the DOM node to locate the Fiber root.
                      </p>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>The Injection Process</h3>
                      <p className="doc-text">
                          1. <strong>Detection:</strong> FiberScope scans the DOM for React root markers.<br/>
                          2. <strong>Traversal:</strong> It uses a `TreeWalker` algorithm to traverse `child` and `sibling` pointers.<br/>
                          3. <strong>Extraction:</strong> For each node, it extracts relevant data (props, state, hooks) using a `FiberResolver`.<br/>
                          4. <strong>Visualization:</strong> The data is rendered into the FiberScope UI overlay.
                      </p>
                  </div>
              );
          case 'fiber':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Fiber Nodes</h1>
                      <p className="doc-text">
                          A Fiber is a JavaScript object that contains information about a component, its input, and its output. It is the fundamental unit of work in React.
                      </p>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>Key Properties</h3>
                      <CodeBlock code={`interface Fiber {
  tag: WorkTag;           // Function, Class, Host, etc.
  key: null | string;     // Unique identifier
  elementType: any;       // The component function/class
  type: any;              // Resolved type
  stateNode: any;         // The DOM node or class instance
  return: Fiber | null;   // Parent
  child: Fiber | null;    // First child
  sibling: Fiber | null;  // Next sibling
  memoizedProps: any;     // Props used for last render
  memoizedState: any;     // State used for last render
}`} language="typescript" />
                  </div>
              );
          case 'reconciliation':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Reconciliation</h1>
                      <p className="doc-text">
                          Reconciliation is the process through which React updates the DOM. FiberScope allows you to visualize which nodes are being reconciled.
                      </p>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>Render vs Commit</h3>
                      <p className="doc-text">
                          <strong>Render Phase:</strong> React traverses the Fiber tree and determines changes. This phase can be interrupted.<br/>
                          <strong>Commit Phase:</strong> React applies the changes to the DOM. This phase is synchronous.
                      </p>
                      <p className="doc-text">
                          FiberScope highlights updates by tracking changes in `memoizedProps` and `memoizedState` between renders.
                      </p>
                  </div>
              );
          case 'api':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>API Reference</h1>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>useFiber()</h3>
                      <p className="doc-text">A hook to access the current component's fiber node programmatically.</p>
                      <CodeBlock code={`const { fiber, forceUpdate } = useFiber();

console.log(fiber.memoizedState);`} />
                      <h3 style={{color: '#fff', marginTop: '30px'}}>FiberScope Props</h3>
                      <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#ccc'}}>
                          <thead>
                              <tr style={{borderBottom: '1px solid #333', textAlign: 'left'}}>
                                  <th style={{padding: '10px'}}>Prop</th>
                                  <th style={{padding: '10px'}}>Type</th>
                                  <th style={{padding: '10px'}}>Description</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td style={{padding: '10px', color: '#A56FFF'}}>enabled</td>
                                  <td style={{padding: '10px'}}>boolean</td>
                                  <td style={{padding: '10px'}}>Enables or disables the inspector overlay.</td>
                              </tr>
                              <tr>
                                  <td style={{padding: '10px', color: '#A56FFF'}}>theme</td>
                                  <td style={{padding: '10px'}}>'dark' | 'light'</td>
                                  <td style={{padding: '10px'}}>Sets the UI theme. Default is 'dark'.</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              );
          case 'cli':
              return (
                  <div className="doc-content-fade">
                      <h1 style={{fontSize: '36px', marginBottom: '20px'}}>CLI Tools</h1>
                      <p className="doc-text">
                          FiberScope includes a CLI for analyzing bundle size and generating fiber reports during build time.
                      </p>
                      <h3 style={{color: '#fff', marginTop: '30px'}}>Commands</h3>
                      <CodeBlock code={`# Analyze bundle for Fiber compatibility
npx fiberscope analyze ./src

# Generate a static report of the component tree
npx fiberscope report --out ./report.html`} language="bash" />
                  </div>
              );
          default:
              return null;
      }
  };

  return (
    <div className="page-container" style={{display: 'flex', minHeight: 'calc(100vh - 80px)', paddingTop: '0'}}>
      
      {/* Sidebar */}
      <div style={{
          width: '280px', 
          borderRight: '1px solid #222', 
          padding: '40px 0',
          position: 'sticky',
          top: '80px',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          background: '#050505'
      }}>
          <div style={{padding: '0 20px 20px 20px', color: '#666', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px'}}>GETTING STARTED</div>
          <DocLink active={activeSection === 'intro'} onClick={() => setActiveSection('intro')}>Introduction</DocLink>
          <DocLink active={activeSection === 'install'} onClick={() => setActiveSection('install')}>Installation</DocLink>
          <DocLink active={activeSection === 'usage'} onClick={() => setActiveSection('usage')}>Usage Guide</DocLink>
          
          <div style={{padding: '30px 20px 20px 20px', color: '#666', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px'}}>CORE CONCEPTS</div>
          <DocLink active={activeSection === 'architecture'} onClick={() => setActiveSection('architecture')}>Architecture</DocLink>
          <DocLink active={activeSection === 'fiber'} onClick={() => setActiveSection('fiber')}>Fiber Nodes</DocLink>
          <DocLink active={activeSection === 'reconciliation'} onClick={() => setActiveSection('reconciliation')}>Reconciliation</DocLink>

          <div style={{padding: '30px 20px 20px 20px', color: '#666', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px'}}>REFERENCE</div>
          <DocLink active={activeSection === 'api'} onClick={() => setActiveSection('api')}>API Reference</DocLink>
          <DocLink active={activeSection === 'cli'} onClick={() => setActiveSection('cli')}>CLI Tools</DocLink>
      </div>

      {/* Main Content */}
      <div style={{flex: 1, padding: '60px 80px', maxWidth: '1000px'}}>
          {renderContent()}
      </div>

    </div>
  );
};

export default Documentation;
