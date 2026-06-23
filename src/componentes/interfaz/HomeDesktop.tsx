'use client';

import React from 'react';
import CartelIndicador from './CartelIndicador';
import Conservadora from './Conservadora';

interface HomeDesktopProps {
  setHeladeraAbierta: (tipo: string | null) => void;
  setChatAbierto: (abierto: boolean) => void;
  hoverActivo: string | null;
  setHoverActivo: (tipo: string | null) => void;
  neones: Record<string, string>;
}

export default function HomeDesktop({
  setHeladeraAbierta,
  setChatAbierto,
  hoverActivo,
  setHoverActivo,
  neones
}: HomeDesktopProps) {
  return (
    <div 
      style={{
        position: 'relative', width: '100vw', height: '100vh',
        backgroundImage: "url('/assets/barra-completa.jpg')",
        backgroundPosition: 'center center', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🔴 HELADERA 1: ALCOHOL */}
      <div 
        onClick={() => setHeladeraAbierta('alcohol')} 
        onMouseEnter={() => setHoverActivo('alcohol')}
        onMouseLeave={() => setHoverActivo(null)}
        style={{
          position: 'absolute', left: '3.8%', top: '25%', width: '14%', height: '50%',
          cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
          boxShadow: hoverActivo === 'alcohol' ? `inset 0 0 20px ${neones.alcohol}, 0 0 15px ${neones.alcohol}` : 'none',
          zIndex: 60
        }}
      >
        <CartelIndicador id="alcohol" titulo="Bebidas Blancas" color={neones.alcohol} hoverActivo={hoverActivo} />
      </div>
      
      {/* 🟠 HELADERA 2: APERITIVOS */}
      <div 
        onClick={() => setHeladeraAbierta('aperitivos')} 
        onMouseEnter={() => setHoverActivo('aperitivos')}
        onMouseLeave={() => setHoverActivo(null)}
        style={{
          position: 'absolute', left: '21.5%', top: '29%', width: '14%', height: '47%',
          cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
          boxShadow: hoverActivo === 'aperitivos' ? `inset 0 0 20px ${neones.aperitivos}, 0 0 15px ${neones.aperitivos}` : 'none',
          zIndex: 60
        }}
      >
        <CartelIndicador id="aperitivos" titulo="Aperitivos" color={neones.aperitivos} hoverActivo={hoverActivo} />
      </div>
      
      {/* 🤖 ROBOT BARMAN INTERACTIVO */}
      <div 
        onClick={() => setChatAbierto(true)} 
        onMouseEnter={() => setHoverActivo('barman')}
        onMouseLeave={() => setHoverActivo(null)}
        style={{ 
          position: 'absolute', left: '42%', top: '32%', width: '16%', height: '44%', 
          cursor: 'pointer', transition: 'all 0.2s', borderRadius: '20px',
          backgroundColor: hoverActivo === 'barman' ? 'rgba(6, 182, 212, 0.04)' : 'transparent',
          zIndex: 60
        }}
      >
        <div 
          style={{
            backgroundColor: 'rgba(5, 8, 16, 0.9)', border: '1px solid rgba(6, 182, 212, 0.6)',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)', color: '#fff', fontSize: '11px',
            fontWeight: '900', padding: '6px 12px', borderRadius: '8px', textTransform: 'uppercase',
            letterSpacing: '1px', pointerEvents: 'none', opacity: hoverActivo === 'barman' ? 1 : 0,
            transform: hoverActivo === 'barman' ? 'translateY(0px)' : 'translateY(10px)', transition: 'all 0.2s ease-in-out',
          }}
        >
          💬 Charlar con Barman
        </div>
      </div>
      
      {/* 🔵 HELADERA 3: SIN ALCOHOL */}
      <div 
        onClick={() => setHeladeraAbierta('gaseosas')} 
        onMouseEnter={() => setHoverActivo('gaseosas')}
        onMouseLeave={() => setHoverActivo(null)}
        style={{
          position: 'absolute', right: '16.3%', top: '29%', width: '14%', height: '47%',
          cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
          boxShadow: hoverActivo === 'gaseosas' ? `inset 0 0 20px ${neones.gaseosas}, 0 0 15px ${neones.gaseosas}` : 'none',
          zIndex: 60
        }}
      >
        <CartelIndicador id="gaseosas" titulo="Sin Alcohol" color={neones.gaseosas} hoverActivo={hoverActivo} />
      </div>
      
      {/* 🟡 HELADERA 4: BAJÓN */}
      <div 
        onClick={() => setHeladeraAbierta('snacks')} 
        onMouseEnter={() => setHoverActivo('snacks')}
        onMouseLeave={() => setHoverActivo(null)}
        style={{
          position: 'absolute', right: '1.8%', top: '25%', width: '14%', height: '50%',
          cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
          boxShadow: hoverActivo === 'snacks' ? `inset 0 0 20px ${neones.snacks}, 0 0 15px ${neones.snacks}` : 'none',
          zIndex: 60
        }}
      >
        <CartelIndicador id="snacks" titulo="Golosinas & Snacks" color={neones.snacks} hoverActivo={hoverActivo} />
      </div>

      {/* Conservadora Flotante fija a la derecha */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 70 }}>
        <Conservadora />
      </div>
    </div>
  );
}