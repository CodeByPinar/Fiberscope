
import React, { useState, useEffect, useRef } from 'react';
import { updateFiberProp } from '../core/prop-mutator';
import { processAiPrompt } from '../core/ai-engine';
import { generateCodeSnippet } from '../core/code-generator';
import { parseHooks } from '../core/hook-parser';
import { getLocalTree } from '../core/tree-walker';
import { getFiberMetrics, logFiberToConsole } from '../core/fiber-metrics';
import { FiberScopeLogo } from './Logo';

const AiInput = ({ onPromptSubmit, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        await onPromptSubmit(prompt);
        setLoading(false);
        setPrompt('');
    };

    return (
        <div className="fs-ai-container">
            <div className="fs-ai-header">
                <span style={{display:'flex', alignItems:'center', gap:'6px'}}>
                    🤖 AI Architect
                </span>
                <button onClick={onClose} className="fs-ai-close">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    type="text"
                    className="fs-ai-input"
                    placeholder="Describe changes (e.g. 'make it red and big')..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading}
                />
                {loading && <div className="fs-ai-loading">Processing...</div>}
            </form>
        </div>
    );
};

const CodeExportModal = ({ code, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fs-modal-overlay">
            <div className="fs-modal">
                <div className="fs-modal-header">
                    <span>Generated Code</span>
                    <button onClick={onClose} className="fs-modal-close">✕</button>
                </div>
                <pre className="fs-code-block">{code}</pre>
                <div className="fs-modal-footer">
                    <button onClick={handleCopy} className="fs-btn-primary">
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PropEditor = ({ name, value, onChange }) => {
    const [localValue, setLocalValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleCommit = () => {
        let finalValue = localValue;
        // Try to parse numbers if the original was a number
        if (typeof value === 'number') {
            finalValue = Number(localValue);
        }
        onChange(name, finalValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleCommit();
    };

    // Boolean Toggle
    if (typeof value === 'boolean') {
        return (
            <label className="fs-toggle">
                <input 
                    type="checkbox" 
                    checked={localValue} 
                    onChange={(e) => onChange(name, e.target.checked)} 
                />
                <span className="fs-toggle-slider"></span>
            </label>
        );
    }

    // Function
    if (typeof value === 'function') {
        return <span className="fs-prop-value function">ƒ()</span>;
    }

    // Object
    if (typeof value === 'object' && value !== null) {
        return <span className="fs-prop-value object">{'{...}'}</span>;
    }

    // Color detection
    const isColor = typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'));

    if (isEditing) {
        return (
            <div className="fs-prop-edit-container">
                {isColor && (
                    <input 
                        type="color" 
                        value={localValue} 
                        onChange={(e) => setLocalValue(e.target.value)}
                        className="fs-color-input"
                    />
                )}
                <input
                    autoFocus
                    className="fs-prop-input"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleCommit}
                />
            </div>
        );
    }

    return (
        <div className="fs-prop-value-wrapper">
            {isColor && (
                <div 
                    className="fs-color-preview" 
                    style={{backgroundColor: value}} 
                    onClick={() => setIsEditing(true)}
                />
            )}
            <span 
                className={`fs-prop-value editable ${typeof value}`} 
                onClick={() => setIsEditing(true)}
                title={String(value)}
            >
                {String(value)}
            </span>
        </div>
    );
};

const TreeView = ({ tree, onSelect }) => {
    if (!tree) return null;
    return (
        <div className="fs-tree-view">
            <div className="fs-tree-node current">
                <span className="fs-tree-icon">📍</span>
                <span className="fs-tree-name">{tree.name}</span>
            </div>
            {tree.children.length > 0 && (
                <div className="fs-tree-children">
                    {tree.children.map((child, i) => (
                        <div 
                            key={i} 
                            className="fs-tree-node child clickable"
                            onClick={() => onSelect(child.fiber)}
                            title="Click to inspect"
                        >
                            <span className="fs-tree-line">└─</span>
                            <span className="fs-tree-name">{child.name}</span>
                            {child.hasChildren && <span className="fs-tree-badge">+</span>}
                        </div>
                    ))}
                </div>
            )}
            {tree.fiber && tree.fiber.return && (
                <div style={{marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                    <div className="fs-section-title">Parent</div>
                    <div 
                        className="fs-tree-node child clickable"
                        onClick={() => onSelect(tree.fiber.return)}
                        style={{paddingLeft: 0}}
                    >
                        <span className="fs-tree-icon">⬆️</span>
                        <span className="fs-tree-name">
                            {tree.fiber.return.type?.displayName || tree.fiber.return.type?.name || tree.fiber.return.type || 'Parent'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

const HooksView = ({ hooks }) => {
    if (!hooks || hooks.length === 0) return <div className="fs-empty-state">No hooks found</div>;
    
    return (
        <div className="fs-hooks-list">
            {hooks.map((hook) => (
                <div key={hook.id} className="fs-hook-item">
                    <div className="fs-hook-header">
                        <span className="fs-hook-type">{hook.type}</span>
                        <span className="fs-hook-id">#{hook.id}</span>
                    </div>
                    <div className="fs-hook-value">
                        {typeof hook.value === 'object' ? JSON.stringify(hook.value) : String(hook.value)}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DebugView = ({ metrics, onLog, onRefresh }) => {
    if (!metrics) return null;
    const { performance, contexts, flags } = metrics;

    return (
        <div className="fs-debug-view">
            <div className="fs-section">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                    <div className="fs-section-title" style={{marginBottom:0}}>Performance</div>
                    <button onClick={onRefresh} className="fs-btn-undo" title="Refresh Metrics">
                        🔄 Refresh
                    </button>
                </div>
                <div className="fs-metric-row">
                    <span>Render Duration:</span>
                    <span className="fs-metric-value">{performance.renderDuration}ms</span>
                </div>
                <div className="fs-metric-row">
                    <span>Base Duration:</span>
                    <span className="fs-metric-value">{performance.baseDuration}ms</span>
                </div>
            </div>

            <div className="fs-section">
                <div className="fs-section-title">Context Dependencies</div>
                {contexts.length > 0 ? (
                    contexts.map((ctx, i) => (
                        <div key={i} className="fs-context-item">
                            <span className="fs-context-name">{ctx.name}</span>
                        </div>
                    ))
                ) : (
                    <div className="fs-empty-state">No contexts consumed</div>
                )}
            </div>

            <div className="fs-section">
                <div className="fs-section-title">Flags & Effects</div>
                {flags.length > 0 ? (
                    <div className="fs-flags-list">
                        {flags.map((flag, i) => (
                            <span key={i} className="fs-flag-badge">{flag}</span>
                        ))}
                    </div>
                ) : (
                    <div className="fs-empty-state">No active flags</div>
                )}
            </div>

            <div className="fs-section">
                <button onClick={onLog} className="fs-btn-secondary" style={{width:'100%'}}>
                    🖨️ Log Fiber to Console
                </button>
            </div>
        </div>
    );
};

export function InspectorPanel({ data, onClose, onSelectFiber }) {
  if (!data) return null;

  const { componentName, chain, source, props: initialProps, fiber } = data;
  const [props, setProps] = useState(initialProps);
  const [showAi, setShowAi] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState('props'); // props, hooks, tree, debug
  const [propFilter, setPropFilter] = useState('');
  const [tick, setTick] = useState(0);
  
  // History for Undo
  const [history, setHistory] = useState([]);

  // Derived Data
  const hooks = parseHooks(fiber);
  const tree = getLocalTree(fiber);
  const metrics = getFiberMetrics(fiber);

  // Update local state when selection changes
  useEffect(() => {
      setProps(initialProps);
      setHistory([]);
      setShowAi(false);
      setShowCode(false);
      setActiveTab('props');
      setPropFilter('');
  }, [initialProps]);

  const handlePropChange = (key, newValue) => {
      // Save to history before changing
      setHistory(prev => [...prev, props]);
      
      setProps(prev => ({ ...prev, [key]: newValue }));
      updateFiberProp(fiber, key, newValue);
  };

  const handleUndo = () => {
      if (history.length === 0) return;
      const previousProps = history[history.length - 1];
      
      // Restore props
      setProps(previousProps);
      
      // Apply all previous props to fiber (brute force restore)
      Object.keys(previousProps).forEach(key => {
          updateFiberProp(fiber, key, previousProps[key]);
      });

      setHistory(prev => prev.slice(0, -1));
  };

  const handleAiPrompt = async (prompt) => {
      const result = await processAiPrompt(prompt, data);
      if (result.success && result.actions) {
          // Save current state to history before AI changes
          setHistory(prev => [...prev, props]);

          result.actions.forEach(action => {
              if (action.type === 'prop') {
                  handlePropChange(action.key, action.value);
              } else if (action.type === 'style') {
                  const currentStyle = props.style || {};
                  const newStyle = { ...currentStyle, [action.key]: action.value };
                  handlePropChange('style', newStyle);
              }
          });
      }
  };

  const generatedCode = generateCodeSnippet(componentName, props);

  const filteredProps = Object.entries(props).filter(([key]) => 
      key.toLowerCase().includes(propFilter.toLowerCase())
  );

  return (
    <div className="fs-panel">
      <div className="fs-panel-header">
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <FiberScopeLogo width={28} height={28} />
            <div>
                <h2 className="fs-title">FIBERSCOPE</h2>
                <div className="fs-subtitle">Inspector Active</div>
            </div>
        </div>
        <button onClick={onClose} className="fs-close-btn" title="Close Inspector">✕</button>
      </div>

      {/* Tabs */}
      <div className="fs-tabs">
          <button className={`fs-tab ${activeTab === 'props' ? 'active' : ''}`} onClick={() => setActiveTab('props')}>Props</button>
          <button className={`fs-tab ${activeTab === 'hooks' ? 'active' : ''}`} onClick={() => setActiveTab('hooks')}>State</button>
          <button className={`fs-tab ${activeTab === 'tree' ? 'active' : ''}`} onClick={() => setActiveTab('tree')}>Tree</button>
          <button className={`fs-tab ${activeTab === 'debug' ? 'active' : ''}`} onClick={() => setActiveTab('debug')}>Debug</button>
      </div>

      <div className="fs-content">
        
        {/* Component Identity (Always Visible) */}
        <div className="fs-section">
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span>{componentName}</span>
            <span className={`fs-badge ${fiber.type && typeof fiber.type === 'string' ? 'fs-badge-host' : 'fs-badge-component'}`}>
                {fiber.type && typeof fiber.type === 'string' ? 'HOST' : 'COMPONENT'}
            </span>
          </div>
          {source && (
             <div className="fs-mini-source" title={`${source.file}:${source.line}`}>
                {source.file.split('/').pop()}:{source.line}
             </div>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'props' && (
            <>
                <div className="fs-section">
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
                        <div className="fs-section-title" style={{marginBottom:0}}>Props</div>
                        {history.length > 0 && (
                            <button onClick={handleUndo} className="fs-btn-undo" title="Undo last change">
                                ↩ Undo
                            </button>
                        )}
                    </div>
                    
                    {/* Prop Filter */}
                    <input 
                        type="text" 
                        className="fs-prop-filter" 
                        placeholder="Filter props..." 
                        value={propFilter}
                        onChange={(e) => setPropFilter(e.target.value)}
                    />

                {props && filteredProps.length > 0 ? (
                    filteredProps.map(([key, value]) => {
                        if (key === 'children' && typeof value !== 'string') return null;
                        return (
                            <div key={key} className="fs-prop-row">
                                <span className="fs-prop-key">{key}</span>
                                <PropEditor name={key} value={value} onChange={handlePropChange} />
                            </div>
                        );
                    })
                ) : (
                    <div className="fs-empty-state">
                        {Object.keys(props).length > 0 ? 'No matching props' : 'No props'}
                    </div>
                )}
                </div>

                <div className="fs-section">
                    <div className="fs-section-title">Actions</div>
                    <div style={{display:'grid', gap:'8px'}}>
                        {!showAi && (
                            <button onClick={() => setShowAi(true)} className="fs-btn-ai">
                                🤖 AI Rewrite
                            </button>
                        )}
                        {showAi && (
                            <AiInput onPromptSubmit={handleAiPrompt} onClose={() => setShowAi(false)} />
                        )}
                        <button onClick={() => setShowCode(true)} className="fs-btn-secondary">
                            📋 Export Code
                        </button>
                    </div>
                </div>
            </>
        )}

        {activeTab === 'hooks' && (
            <div className="fs-section">
                <div className="fs-section-title">Hooks & State</div>
                <HooksView hooks={hooks} />
            </div>
        )}

        {activeTab === 'tree' && (
            <div className="fs-section">
                <div className="fs-section-title">Component Tree</div>
                <TreeView tree={tree} onSelect={onSelectFiber} />
            </div>
        )}

        {activeTab === 'debug' && (
            <DebugView 
                metrics={metrics} 
                onLog={() => logFiberToConsole(fiber)} 
                onRefresh={() => setTick(t => t + 1)}
            />
        )}

      </div>

      {showCode && (
          <CodeExportModal code={generatedCode} onClose={() => setShowCode(false)} />
      )}
    </div>
  );
}
