'use client';

import React from 'react';
import Conservadora from './Conservadora';

interface HomeMobileProps {
  setHeladeraAbierta: (tipo: string | null) => void;
  setChatAbierto: (abierto: boolean) => void;
  neones: Record<string, string>;
}

export default function HomeMobile({ setHeladeraAbierta, setChatAbierto, neones }: HomeMobileProps) {
  return (
    <div 
      style={{
        position: 'relative', 
        width: '100vw', 
        height: '100vh',
        backgroundImage: "url('/assets/barra-mobile.jpg')", 
        backgroundPosition: 'center center', 
        backgroundSize: '100% 100%', 
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      {/* 🤖 ROBOT BARMAN INTERACTIVO (Zona Central de la Barra) */}
      <div 
        onClick={() => setChatAbierto(true)}
        style={{ 
          position: 'absolute', 
          left: '35%', 
          top: '38%', 
          width: '30%', 
          height: '18%', 
          cursor: 'pointer',
          zIndex: 60,
          borderRadius: '50%'
        }}
      />
      
      {/* 🔴 HELADERA SUPERIOR IZQUIERDA: BLANCAS */}
      <div 
        onClick={() => setHeladeraAbierta('alcohol')} 
        style={{
          position: 'absolute', 
          left: '3%', 
          top: '34%', 
          width: '23%', 
          height: '21%',
          cursor: 'pointer', 
          borderRadius: '8px',
          zIndex: 60
        }}
      />
      
      {/* 🟠 HELADERA SUPERIOR DERECHA: APERITIVOS */}
      <div 
        onClick={() => setHeladeraAbierta('aperitivos')} 
        style={{
          position: 'absolute', 
          left: '74%', 
          top: '34%', 
          width: '23%', 
          height: '21%',
          cursor: 'pointer', 
          borderRadius: '8px',
          zIndex: 60
        }}
      />
      
      {/* 🔵 HELADERA INFERIOR IZQUIERDA: SIN ALCOHOL */}
      <div 
        onClick={() => setHeladeraAbierta('gaseosas')} 
        style={{
          position: 'absolute', 
          left: '9%', 
          top: '62%', 
          width: '38%', 
          height: '30%',
          cursor: 'pointer', 
          borderRadius: '12px',
          zIndex: 60
        }}
      />
      
      {/* 🟡 HELADERA INFERIOR DERECHA: BAJÓN */}
      <div 
        onClick={() => setHeladeraAbierta('snacks')} 
        style={{
          position: 'absolute', 
          right: '9%', 
          top: '62%', 
          width: '38%', 
          height: '30%',
          cursor: 'pointer', 
          borderRadius: '12px',
          zIndex: 60
        }}
      />

      {/* Conservadora Flotante nativa mobile (se expande abajo al abrir) */}
      <div style={{ position: 'absolute', bottom: '0px', left: '0px', width: '100vw', zIndex: 70 }}>
        <Conservadora />
      </div>
    </div>
  );
}