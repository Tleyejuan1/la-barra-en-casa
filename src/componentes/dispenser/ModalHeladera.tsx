'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Heladera from './Heladera';
import { Producto } from '../../datos/productos'; 

interface ModalHeladeraProps {
  heladeraAbierta: string;
  onCerrar: () => void;
  esMobile: boolean;
  productosFiltrados: Producto[];
  titulos: Record<string, string>;
  neones: Record<string, string>;
}

const fondosHeladera: Record<string, string> = {
  'sin-alcohol': '/assets/heladera-sin-alcohol.jpg',
};

export const ModalHeladera: React.FC<ModalHeladeraProps> = ({
  heladeraAbierta,
  onCerrar,
  esMobile,
  productosFiltrados,
  titulos,
  neones,
}) => {
  const fondoActual = fondosHeladera[heladeraAbierta] || '/assets/interior-heladera.jpg';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div onClick={onCerrar} style={{ position: 'absolute', inset: 0, zIndex: 110 }} />

      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 120 }}
        style={{
          position: 'relative',
          width: esMobile ? '92%' : '460px',
          height: esMobile ? '85vh' : '82vh',
          borderRadius: '24px',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          padding: esMobile ? '16px' : '24px',
          boxShadow: `0 0 50px ${neones[heladeraAbierta] || 'rgba(6, 182, 212, 0.5)'}`,
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundImage: `url("${fondoActual}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Capa de Tinte + Brillo de Neón */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 7, 15, 0.45)',
            backdropFilter: 'blur(1px)',
            boxShadow: `inset 0 0 60px ${neones[heladeraAbierta] || 'rgba(6, 182, 212, 0.3)'}`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* --- CONTENIDO --- */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          
          <button
            onClick={onCerrar}
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <h2
            style={{
              textAlign: 'center',
              fontSize: esMobile ? '22px' : '26px',
              fontWeight: '950',
              color: '#fff',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
              textShadow: `0 0 15px ${neones[heladeraAbierta] || 'rgba(6, 182, 212, 0.5)'}`,
            }}
          >
            {titulos[heladeraAbierta] || 'PRODUCTOS'}
          </h2>

          {/* 🧹 Contenedor vacío para apreciar la imagen al 100% */}
          <div style={{ flex: 1 }} />

          <Heladera tipo={heladeraAbierta} />
        </div>
      </motion.div>
    </motion.div>
  );
};