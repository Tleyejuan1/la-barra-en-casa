'use client';

import React, { useState } from 'react';
import Heladera from '../componentes/dispenser/Heladera';
import Conservadora from '../componentes/interfaz/Conservadora';
import CartelIndicador from '../componentes/interfaz/CartelIndicador';
import ChatBarman from '../componentes/interfaz/ChatBarman';
import { ProveedorCarrito } from './carrito/ContextoCarrito';
import { motion, AnimatePresence } from 'framer-motion';
import { LISTA_PRODUCTOS } from '../datos/productos';
import Estante from '../componentes/dispenser/Estante';
import ProductoItem from '../componentes/dispenser/ProductoItem';

function ContenidoHome() {
  const [heladeraAbierta, setHeladeraAbierta] = useState<string | null>(null);
  const [hoverActivo, setHoverActivo] = useState<string | null>(null);
  const [chatAbierto, setChatAbierto] = useState(false);

  // Filtramos el stock según la heladera seleccionada
  const productosFiltrados = LISTA_PRODUCTOS.filter(p => p.heladeraTipo === heladeraAbierta);
  const estante1 = productosFiltrados.filter(p => p.estante === 1);
  const estante2 = productosFiltrados.filter(p => p.estante === 2);
  const estante3 = productosFiltrados.filter(p => p.estante === 3);

  const titulos: Record<string, string> = { 
    alcohol: 'ALCOHOL', 
    aperitivos: 'APERITIVOS', 
    gaseosas: 'SIN ALCOHOL', 
    snacks: 'BAJÓN' 
  };
  
  const neones: Record<string, string> = { 
    alcohol: 'rgba(239, 68, 68, 0.8)', 
    aperitivos: 'rgba(249, 115, 22, 0.8)', 
    gaseosas: 'rgba(6, 182, 212, 0.8)', 
    snacks: 'rgba(234, 179, 8, 0.8)' 
  };

  return (
    <main 
      style={{ 
        width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 50,
        backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: 0, padding: 0, userSelect: 'none', overflow: 'hidden'
      }}
    >
      {/* ESCENA DE LA BARRA BASE */}
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

        {/* Conservadora Flotante en su esquina original */}
        <div style={{ position: 'absolute', bottom: '65px', right: '24px', zIndex: 70 }}>
          <Conservadora />
        </div>

      </div>

      {/* COMPONENTE CHAT CON EL BARMAN */}
      <ChatBarman chatAbierto={chatAbierto} setChatAbierto={setChatAbierto} />

      {/* MODAL CENTRAL: INTERIOR DE LA HELADERA SELECCIONADA */}
      <AnimatePresence>
        {heladeraAbierta && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)',
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <div onClick={() => setHeladeraAbierta(null)} style={{ position: 'absolute', inset: 0, zIndex: 110 }} />

            <motion.div
              initial={{ scale: 0.85, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 120 }}
              style={{
                position: 'relative', width: '460px', height: '82vh',
                backgroundColor: '#060913', borderRadius: '28px',
                border: '2px solid rgba(255, 255, 255, 0.08)', padding: '24px',
                boxShadow: `0 0 60px ${neones[heladeraAbierta]}`,
                zIndex: 120, display: 'flex', flexDirection: 'column', perspective: '2000px'
              }}
            >
              <button 
                onClick={() => setHeladeraAbierta(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.05)',
                  border: 'none', color: '#64748b', width: '32px', height: '32px', borderRadius: '50%',
                  cursor: 'pointer', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 'bold'
                }}
              >✕</button>

              <h2 style={{
                textAlign: 'center', fontSize: '24px', fontWeight: '900', color: '#fff',
                letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 24px 0',
                textShadow: `0 0 12px ${neones[heladeraAbierta]}`
              }}>
                {titulos[heladeraAbierta]}
              </h2>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                <Estante numero={3}>{estante3.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
                <Estante numero={2}>{estante2.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
                <Estante numero={1}>{estante1.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
              </div>

              <Heladera tipo={heladeraAbierta} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function Home() {
  return (
    <ProveedorCarrito>
      <ContenidoHome />
    </ProveedorCarrito>
  );
}