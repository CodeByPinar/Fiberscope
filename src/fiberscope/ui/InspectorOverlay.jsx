
import React from 'react';

export function InspectorOverlay({ rect, label }) {
  if (!rect) return null;

  return (
    <div
      className="fs-overlay"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    >
        <div style={{
            position: 'absolute',
            top: -24,
            left: 0,
            background: '#A56FFF',
            color: 'white',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '4px 4px 0 0',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            display: 'flex',
            gap: '6px'
        }}>
            <span>{label || 'Element'}</span>
            <span style={{opacity: 0.7, fontWeight: 'normal'}}>
                {Math.round(rect.width)}×{Math.round(rect.height)}
            </span>
        </div>
    </div>
  );
}
