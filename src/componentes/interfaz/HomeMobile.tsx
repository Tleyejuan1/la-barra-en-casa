'use client';

import React from 'react';
import Conservadora from './Conservadora';

interface HomeMobileProps {
  setHeladeraAbierta: (tipo: string | null) => void;
  setChatAbierto: (abierto: boolean) => void;
  neones: Record<string, string>;
}

export default function HomeMobile({ setHeladeraAbierta, setChatAbierto, neones }: HomeMobileProps) {
  const categoriasMobile = [
    { id: 'alcohol', titulo: 'Blancas', subtitulo: 'Fernet, Vodka...', color: neones.alcohol, emoji: '🔴' },
    { id: 'aperitivos', titulo: 'Aperitivos', subtitulo: 'Campari, Birra...', color: neones.aperitivos, emoji: '🟠' },
    { id: 'gaseosas', titulo: 'Sin Alcohol', subtitulo: 'Gaseosas, Juncos...', color: neones.gaseosas, emoji: '🔵' },
    { id: 'snacks', titulo: 'Bajón', subtitulo: 'Papas, Bajón...', color: neones.snacks, emoji: '🟡' },
  ];

  return (
    <div 
      style={{
        width: '100%', height: '100%', padding: '16px 14px 100px 14px',
        overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px',
        backgroundColor: '#050811'
      }}
    >
      {/* Header del Comercio */}
      <div style={{ textAlign: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '2px' }}>
          🍻 LA BARRA EN CASA
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Seleccioná una heladera para armar tu previa</p>
      </div>

      {/* Botón flotante para hablar con el Barman en Mobile */}
      <div 
        onClick={() => setChatAbierto(true)}
        style={{
          backgroundColor: 'rgba(6, 182, 212, 0.08)', border: '1px solid #06b6d4',
          borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 0 15px rgba(6, 182, 212, 0.15)'
        }}
      >
        <span style={{ fontSize: '14px' }}>🤖</span>
        <span style={{ fontSize: '11px', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' }}>
          CHARLAR CON EL ROBOT BARMAN (IA)
        </span>
      </div>

      {/* 🚀 GRILLA DE HELADERAS: 2 ARRIBA Y 2 ABAJO */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
        
        {/* FILA 1 (Las 2 de arriba) */}
        <div style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderSpacing: '10px 0px', margin: '0 -10px' }}>
          {categoriasMobile.slice(0, 2).map((cat) => (
            <div
              key={cat.id}
              onClick={() => setHeladeraAbierta(cat.id)}
              style={{
                display: 'table-cell',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: '16px', padding: '16px 12px', cursor: 'pointer',
                boxShadow: `inset 0 0 14px ${cat.color}15, 0 4px 15px rgba(0,0,0,0.5)`,
                textAlign: 'center', verticalAlign: 'middle'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px', textShadow: `0 0 12px ${cat.color}` }}>{cat.emoji}</div>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '900', color: '#fff' }}>{cat.titulo}</h3>
              <p style={{ margin: '3px 0 0 0', fontSize: '10px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.subtitulo}</p>
            </div>
          ))}
        </div>

        {/* FILA 2 (Las 2 de abajo) */}
        <div style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderSpacing: '10px 0px', margin: '0 -10px' }}>
          {categoriasMobile.slice(2, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => setHeladeraAbierta(cat.id)}
              style={{
                display: 'table-cell',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: '16px', padding: '16px 12px', cursor: 'pointer',
                boxShadow: `inset 0 0 14px ${cat.color}15, 0 4px 15px rgba(0,0,0,0.5)`,
                textAlign: 'center', verticalAlign: 'middle'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px', textShadow: `0 0 12px ${cat.color}` }}>{cat.emoji}</div>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '900', color: '#fff' }}>{cat.titulo}</h3>
              <p style={{ margin: '3px 0 0 0', fontSize: '10px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.subtitulo}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Conservadora pegada abajo en Mobile */}
      <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100vw', zIndex: 70 }}>
        <Conservadora />
      </div>
    </div>
  );
}