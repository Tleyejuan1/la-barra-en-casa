'use client';

import React, { useState, useEffect } from 'react';
import { HomeMobile } from '../componentes/interfaz/HomeMobile';
import { ProveedorCarrito } from './carrito/ContextoCarrito';
import { AnimatePresence } from 'framer-motion';
import { LISTA_PRODUCTOS } from '../datos/productos';
import { ModalHeladera } from '../componentes/dispenser/ModalHeladera';

function ContenidoHome() {
  const [heladeraAbierta, setHeladeraAbierta] = useState<string | null>(null);
  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const productosFiltrados = LISTA_PRODUCTOS.filter(p => p.heladeraTipo === heladeraAbierta);

  const titulos: Record<string, string> = { 
    alcohol: 'ALCOHOL', 
    aperitivos: 'APERITIVOS', 
    gaseosas: 'SIN ALCOHOL',
    'sin-alcohol': 'SIN ALCOHOL',
    snacks: 'BAJÓN', 
    bajon: 'BAJÓN'
  };
  
  const neones: Record<string, string> = { 
    alcohol: 'rgba(59, 130, 246, 0.8)', 
    aperitivos: 'rgba(249, 115, 22, 0.8)', 
    gaseosas: 'rgba(6, 182, 212, 0.8)', 
    'sin-alcohol': 'rgba(6, 182, 212, 0.8)', 
    snacks: 'rgba(234, 179, 8, 0.8)',
    bajon: 'rgba(234, 179, 8, 0.8)'
  };

  return (
    <main 
      style={{ 
        width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 50,
        backgroundColor: '#05070f', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: 0, padding: 0, userSelect: 'none', overflow: 'hidden'
      }}
    >
      {/* 🚀 Usamos HomeMobile provisoriamente para ambas vistas y salteamos el error */}
      <HomeMobile 
        setHeladeraAbierta={setHeladeraAbierta} 
        setChatAbierto={() => {}} 
        neones={neones} 
      />

      {/* El modal renderizado de forma aislada */}
      <AnimatePresence>
        {heladeraAbierta && (
          <ModalHeladera
            heladeraAbierta={heladeraAbierta}
            onCerrar={() => setHeladeraAbierta(null)}
            esMobile={esMobile}
            productosFiltrados={productosFiltrados}
            titulos={titulos}
            neones={neones}
          />
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