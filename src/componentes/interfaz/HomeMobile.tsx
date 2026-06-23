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
    { id: 'alcohol', titulo: 'Bebidas Blancas', subtitulo: 'Fernet, Gancia, Vodka & más', color: neones.alcohol, emoji: '🔴' },
    { id: 'aperitivos', titulo: 'Aperitivos', subtitulo: 'Campari, Vermut & Cervezas', color: neones.aperitivos, emoji: '🟠' },
    { id: 'gaseosas', titulo: 'Sin Alcohol', subtitulo: 'Gaseosas, Aguas & Energizantes', color: neones.gaseosas, emoji: '🔵' },
    { id: 'snacks', titulo: 'Golosinas & Snacks', subtitulo: 'Papas, Chocolates para el bajón', color: neones.snacks, emoji: '🟡' },
  ];

  return (
    <div 
      style={{
        width: '100%', height: '100%', padding: '20px 16px 80px 16px',
        overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px',
        backgroundColor: '#050811'
      }}
    >
      {/* Header del Comercio */}
      <div style={{ textAlign: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#fff', letterSpacing: '2px' }}>
          🍻 LA BARRA EN CASA
        </h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Seleccioná una heladera para armar tu previa</p>
      </div>

      {/* Botón flotante para hablar con el Barman en Mobile */}
      <div 
        onClick={() => setChatAbierto(true)}
        style={{
          backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4',
          borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)'
        }}
      >
        <span style={{ fontSize: '16px' }}>🤖</span>
        <span style={{ fontSize: '12px', fontWeight: '900', color: '#fff', letterSpacing: '0.5px' }}>
          CHARLAR CON EL ROBOT BARMAN (IA)
        </span>
      </div>

      {/* Lista de Heladeras en Bloques Verticales */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
        {categoriasMobile.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setHeladeraAbierta(cat.id)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: '16px', padding: '18px', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: `inset 0 0 12px ${cat.color}15, 0 4px 20px rgba(0,0,0,0.4)`,
              transition: 'transform 0.2s ease'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ textShadow: `0 0 10px ${cat.color}` }}>{cat.emoji}</span> {cat.titulo}
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>{cat.subtitulo}</p>
            </div>
            <div style={{
              backgroundColor: `${cat.color}20`, color: '#fff', border: `1px solid ${cat.color}`,
              width: '32px', height: '32px', borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'
            }}>
              ➔
            </div>
          </div>
        ))}
      </div>

      {/* Conservadora pegada abajo en Mobile */}
      <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100vw', zIndex: 70 }}>
        <Conservadora />
      </div>
    </div>
  );
}