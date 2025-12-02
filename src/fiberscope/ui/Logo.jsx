
import React from 'react';

export function FiberScopeLogo({ width = 32, height = 32 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying Glass Handle */}
      <path d="M30 70L15 85C12 88 12 92 15 95C18 98 22 98 25 95L40 80" stroke="#A56FFF" strokeWidth="8" strokeLinecap="round"/>
      
      {/* Glass Circle */}
      <circle cx="60" cy="40" r="35" stroke="#A56FFF" strokeWidth="6" fill="rgba(165, 111, 255, 0.1)"/>
      
      {/* Inner Graph / Molecule */}
      <circle cx="60" cy="25" r="4" fill="#fff"/>
      <circle cx="45" cy="50" r="4" fill="#fff"/>
      <circle cx="75" cy="50" r="4" fill="#fff"/>
      <circle cx="60" cy="55" r="4" fill="#fff"/>
      
      {/* Connections */}
      <path d="M60 25L45 50" stroke="#fff" strokeWidth="2"/>
      <path d="M60 25L75 50" stroke="#fff" strokeWidth="2"/>
      <path d="M45 50L60 55" stroke="#fff" strokeWidth="2"/>
      <path d="M75 50L60 55" stroke="#fff" strokeWidth="2"/>
      <path d="M45 50L75 50" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
}
