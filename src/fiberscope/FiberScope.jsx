
import React, { useState, useEffect, useCallback } from 'react';
import { resolveFiber } from './core/fiber-resolver';
import { extractChain } from './core/hierarchy-extractor';
import { getSourceLocation } from './core/source-locator';
import { InspectorOverlay } from './ui/InspectorOverlay';
import { InspectorPanel } from './ui/InspectorPanel';
import './ui/FiberScope.css';

export function FiberScope({ children, enabled = true }) {
  const [active, setActive] = useState(false);
  const [hoveredRect, setHoveredRect] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Toggle inspection mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle with Ctrl+Shift+X or similar
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        setActive(prev => !prev);
        setHoveredRect(null);
        setSelectedData(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectFiber = useCallback((fiber) => {
      if (!fiber) return;

      const chain = extractChain(fiber);
      const source = getSourceLocation(fiber);
      
      let componentName = "Host Component";
      if (typeof fiber.type === 'function') {
          componentName = fiber.type.displayName || fiber.type.name || "Component";
      } else if (typeof fiber.type === 'string') {
          componentName = fiber.type;
      }

      setSelectedData({
        fiber,
        componentName,
        chain,
        source,
        props: fiber.memoizedProps || fiber.pendingProps || {}
      });

      // Update highlight if possible
      if (fiber.stateNode && fiber.stateNode.getBoundingClientRect) {
          const rect = fiber.stateNode.getBoundingClientRect();
          setHoveredRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            label: componentName
          });
      } else {
          setHoveredRect(null);
      }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!active || selectedData) return; // Don't highlight if panel is open

    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (!target || target.closest('.fs-panel') || target.closest('.fs-overlay')) return;

    const fiber = resolveFiber(target);
    if (fiber) {
      const rect = target.getBoundingClientRect();
      
      let name = "Element";
      if (typeof fiber.type === 'function') name = fiber.type.displayName || fiber.type.name;
      else if (typeof fiber.type === 'string') name = fiber.type;

      setHoveredRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        label: name
      });
    } else {
      setHoveredRect(null);
    }
  }, [active, selectedData]);

  const handleClick = useCallback((e) => {
    if (!active) return;
    
    // If clicking inside the panel, do nothing
    if (e.target.closest('.fs-panel')) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    const fiber = resolveFiber(target);

    if (fiber) {
      selectFiber(fiber);
    }
  }, [active, selectFiber]);

  useEffect(() => {
    if (active) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick, true); // Capture phase to prevent default actions
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
      setHoveredRect(null);
      setSelectedData(null);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
    };
  }, [active, handleMouseMove, handleClick]);

  return (
    <>
      {children}
      
      {/* Toggle Button (Visible always for demo) */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 10000,
      }}>
        <button 
            onClick={() => setActive(!active)}
            style={{
                background: active ? '#A56FFF' : '#121218',
                color: 'white',
                border: '1px solid #A56FFF',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
        >
            {active ? 'FiberScope Active' : 'Enable FiberScope'}
        </button>
      </div>

      {active && hoveredRect && <InspectorOverlay rect={hoveredRect} label={hoveredRect.label} />}
      
      {active && selectedData && (
        <InspectorPanel 
            data={selectedData} 
            onClose={() => {
                setSelectedData(null);
                setHoveredRect(null);
            }}
            onSelectFiber={selectFiber}
        />
      )}
    </>
  );
}
