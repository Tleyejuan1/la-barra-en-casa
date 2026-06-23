'use client';

import React from 'react';

interface CartelIndicadorProps {
  id: string;
  titulo: string;
  color: string;
  hoverActivo: string | null;
}

export default function CartelIndicador({ id, titulo, color, hoverActivo }: CartelIndicadorProps) {
  const visible = hoverActivo === id;
  
  return (
    <div
      style={{
        backgroundColor: 'rgba(5, 8, 16, 0.95)',
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 15px ${color}, inset 0 0 6px ${color}40`,
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(10px)',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        whiteSpace: 'nowrap',
        zIndex: 100
      }}
    >
      <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        {titulo}
      </span>
      <span style={{ fontSize: '12px', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' }}>
        🚪 Abrir Heladera
      </span>
    </div>
  );
}