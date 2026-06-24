'use client';

import React, { useState, useEffect } from 'react';
import HomeDesktop from '../componentes/interfaz/HomeDesktop';

// 🔥 IMPORTACIÓN CORREGIDA: Un solo '../' para salir de app, y con llaves {}
import { HomeMobile } from '../componentes/interfaz/HomeMobile';

import Heladera from '../componentes/dispenser/Heladera';
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
    'sin-alcohol': 'SIN ALCOHOL', // ✨ Mapeo para los botones 1 y 2
    snacks: 'BAJÓN', 
    bajon: 'BAJÓN'                // ✨ Mapeo para los botones 1 y 2
  };
  
  const neones: Record<string, string> = { 
    alcohol: 'rgba(239, 68, 68, 0.8)', 
    aperitivos: 'rgba(249, 115, 22, 0.8)', 
    gaseosas: 'rgba(6, 182, 212, 0.8)', 
    'sin-alcohol': 'rgba(6, 182, 212, 0.8)', // ✨ Color cyan para sin alcohol
    snacks: 'rgba(234, 179, 8, 0.8)',
    bajon: 'rgba(234, 179, 8, 0.8)'           // ✨ Color amarillo para el bajón
  };

  return (
    <main 
      style={{ 
        width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 50,
        backgroundColor: '#05070f', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: 0, padding: 0, userSelect: 'none', overflow: 'hidden'
      }}
    >
      {/* RENDERIZADO CONDICIONAL DE ARQUITECTURA LIMPIA */}
      {esMobile ? (
        <HomeMobile 
          setHeladeraAbierta={setHeladeraAbierta} 
          setChatAbierto={setChatAbierto} 
          neones={neones} 
        />
      ) : (
        <HomeMobile 
  setHeladeraAbierta={setHeladeraAbierta} 
  setChatAbierto={setChatAbierto} 
  neones={neones} 
/>
      )}

      {/* CHAT BARMAN (Compartido) */}
      <ChatBarman chatAbierto={chatAbierto} setChatAbierto={setChatAbierto} />

      {/* MODAL INTERIOR DE HELADERA (Compartido) */}
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
                height: esMobile ? '85vh' : '82vh',
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