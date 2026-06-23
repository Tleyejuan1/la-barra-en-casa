'use client';

import React, { useState, useEffect } from 'react';
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
  const [esMobile, setEsMobile] = useState(false);

  // Detectamos si es celular para adaptar las interacciones táctiles
  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* CONTENEDOR DE LA ESCENA CON RELACIÓN DE ASPECTO CORREGIDA */}
      <div 
        style={{
          position: 'relative', 
          width: '100%', 
          height: '100%',
          backgroundImage: "url('/assets/barra-completa.jpg')",
          backgroundPosition: 'center center', 
          backgroundSize: esMobile ? 'cover' : '100% 100%', 
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        {/* 🔴 HELADERA 1: ALCOHOL */}
        <div 
          onClick={() => setHeladeraAbierta('alcohol')} 
          onMouseEnter={() => !esMobile && setHoverActivo('alcohol')}
          onMouseLeave={() => !esMobile && setHoverActivo(null)}
          style={{
            position: 'absolute', 
            left: esMobile ? '2%' : '3.8%', 
            top: esMobile ? '30%' : '25%', 
            width: esMobile ? '16%' : '14%', 
            height: esMobile ? '40%' : '50%',
            cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
            boxShadow: hoverActivo === 'alcohol' ? `inset 0 0 20px ${neones.alcohol}, 0 0 15px ${neones.alcohol}` : 'none',
            zIndex: 60
          }}
        >
          <CartelIndicador id="alcohol" titulo={esMobile ? "Blancas" : "Bebidas Blancas"} color={neones.alcohol} hoverActivo={esMobile ? 'alcohol' : hoverActivo} />
        </div>
        
        {/* 🟠 HELADERA 2: APERITIVOS */}
        <div 
          onClick={() => setHeladeraAbierta('aperitivos')} 
          onMouseEnter={() => !esMobile && setHoverActivo('aperitivos')}
          onMouseLeave={() => !esMobile && setHoverActivo(null)}
          style={{
            position: 'absolute', 
            left: esMobile ? '20%' : '21.5%', 
            top: esMobile ? '32%' : '29%', 
            width: esMobile ? '16%' : '14%', 
            height: esMobile ? '38%' : '47%',
            cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
            boxShadow: hoverActivo === 'aperitivos' ? `inset 0 0 20px ${neones.aperitivos}, 0 0 15px ${neones.aperitivos}` : 'none',
            zIndex: 60
          }}
        >
          <CartelIndicador id="aperitivos" titulo="Aperitivos" color={neones.aperitivos} hoverActivo={esMobile ? 'aperitivos' : hoverActivo} />
        </div>
        
        {/* 🤖 ROBOT BARMAN */}
        <div 
          onClick={() => setChatAbierto(true)} 
          onMouseEnter={() => !esMobile && setHoverActivo('barman')}
          onMouseLeave={() => !esMobile && setHoverActivo(null)}
          style={{ 
            position: 'absolute', 
            left: esMobile ? '39%' : '42%', 
            top: esMobile ? '35%' : '32%', 
            width: esMobile ? '22%' : '16%', 
            height: esMobile ? '35%' : '44%', 
            cursor: 'pointer', transition: 'all 0.2s', borderRadius: '20px',
            backgroundColor: hoverActivo === 'barman' ? 'rgba(6, 182, 212, 0.04)' : 'transparent',
            zIndex: 60
          }}
        >
          <div 
            style={{
              backgroundColor: 'rgba(5, 8, 16, 0.9)', border: '1px solid rgba(6, 182, 212, 0.6)',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)', color: '#fff', fontSize: '9px',
              fontWeight: '900', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase',
              letterSpacing: '0.5px', pointerEvents: 'none', textAlign: 'center',
              opacity: esMobile ? 1 : (hoverActivo === 'barman' ? 1 : 0),
              transform: 'translateY(0px)', transition: 'all 0.2s ease-in-out',
            }}
          >
            💬 Barman
          </div>
        </div>
        
        {/* 🔵 HELADERA 3: SIN ALCOHOL */}
        <div 
          onClick={() => setHeladeraAbierta('gaseosas')} 
          onMouseEnter={() => !esMobile && setHoverActivo('gaseosas')}
          onMouseLeave={() => !esMobile && setHoverActivo(null)}
          style={{
            position: 'absolute', 
            right: esMobile ? '20%' : '16.3%', 
            top: esMobile ? '32%' : '29%', 
            width: esMobile ? '16%' : '14%', 
            height: esMobile ? '38%' : '47%',
            cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
            boxShadow: hoverActivo === 'gaseosas' ? `inset 0 0 20px ${neones.gaseosas}, 0 0 15px ${neones.gaseosas}` : 'none',
            zIndex: 60
          }}
        >
          <CartelIndicador id="gaseosas" titulo={esMobile ? "Sin Alc" : "Sin Alcohol"} color={neones.gaseosas} hoverActivo={esMobile ? 'gaseosas' : hoverActivo} />
        </div>
        
        {/* 🟡 HELADERA 4: BAJÓN */}
        <div 
          onClick={() => setHeladeraAbierta('snacks')} 
          onMouseEnter={() => !esMobile && setHoverActivo('snacks')}
          onMouseLeave={() => !esMobile && setHoverActivo(null)}
          style={{
            position: 'absolute', 
            right: esMobile ? '2%' : '1.8%', 
            top: esMobile ? '30%' : '25%', 
            width: esMobile ? '16%' : '14%', 
            height: esMobile ? '40%' : '50%',
            cursor: 'pointer', borderRadius: '12px', transition: 'all 0.25s ease-in-out',
            boxShadow: hoverActivo === 'snacks' ? `inset 0 0 20px ${neones.snacks}, 0 0 15px ${neones.snacks}` : 'none',
            zIndex: 60
          }}
        >
          <CartelIndicador id="snacks" titulo="Bajón" color={neones.snacks} hoverActivo={esMobile ? 'snacks' : hoverActivo} />
        </div>

        {/* Conservadora Flotante: Adaptada para pegarse al piso en celulares */}
        <div style={{ 
          position: 'absolute', 
          bottom: '0px', 
          right: esMobile ? '0px' : '24px', 
          left: esMobile ? '0px' : 'auto',
          width: esMobile ? '100%' : 'auto',
          zIndex: 70 
        }}>
          <Conservadora />
        </div>

      </div>

      {/* CHAT BARMAN */}
      <ChatBarman chatAbierto={chatAbierto} setChatAbierto={setChatAbierto} />

      {/* INTERIOR DE LA HELADERA (Modificado ancho max para móviles) */}
      <AnimatePresence>
        {heladeraAbierta && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <div onClick={() => setHeladeraAbierta(null)} style={{ position: 'absolute', inset: 0, zIndex: 110 }} />

            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 120 }}
              style={{
                position: 'relative', 
                width: esMobile ? '92%' : '460px', 
                height: esMobile ? '90vh' : '82vh',
                backgroundColor: '#060913', borderRadius: '24px',
                border: '2px solid rgba(255, 255, 255, 0.08)', padding: esMobile ? '16px' : '24px',
                boxShadow: `0 0 40px ${neones[heladeraAbierta]}`,
                zIndex: 120, display: 'flex', flexDirection: 'column'
              }}
            >
              <button 
                onClick={() => setHeladeraAbierta(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.05)',
                  border: 'none', color: '#64748b', width: '32px', height: '32px', borderRadius: '50%',
                  cursor: 'pointer', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >✕</button>

              <h2 style={{
                textAlign: 'center', fontSize: esMobile ? '20px' : '24px', fontWeight: '900', color: '#fff',
                letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0',
                textShadow: `0 0 12px ${neones[heladeraAbierta]}`
              }}>
                {titulos[heladeraAbierta]}
              </h2>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
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