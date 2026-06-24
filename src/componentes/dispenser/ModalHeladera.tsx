'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Estante from './Estante';
import ProductoItem from './ProductoItem';
import Heladera from './Heladera';
import { Producto } from '../../datos/productos'; // Ajustá la ruta si es necesario

interface ModalHeladeraProps {
  heladeraAbierta: string;
  onCerrar: () => void;
  esMobile: boolean;
  productosFiltrados: Producto[];
  titulos: Record<string, string>;
  neones: Record<string, string>;
}

export const ModalHeladera: React.FC<ModalHeladeraProps> = ({
  heladeraAbierta,
  onCerrar,
  esMobile,
  productosFiltrados,
  titulos,
  neones,
}) => {
  const estante1 = productosFiltrados.filter(p => p.estante === 1);
  const estante2 = productosFiltrados.filter(p => p.estante === 2);
  const estante3 = productosFiltrados.filter(p => p.estante === 3);

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
      {/* Fondo clickeable para cerrar */}
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
          backgroundColor: '#060913',
          borderRadius: '24px',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          padding: esMobile ? '16px' : '24px',
          boxShadow: `0 0 40px ${neones[heladeraAbierta] || 'rgba(6, 182, 212, 0.5)'}`,
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          onClick={onCerrar}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#64748b',
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
            fontSize: esMobile ? '20px' : '24px',
            fontWeight: '900',
            color: '#fff',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            textShadow: `0 0 12px ${neones[heladeraAbierta] || 'rgba(6, 182, 212, 0.5)'}`,
          }}
        >
          {titulos[heladeraAbierta] || 'PRODUCTOS'}
        </h2>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', paddingRight: '4px' }}>
          <Estante numero={3}>{estante3.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
          <Estante numero={2}>{estante2.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
          <Estante numero={1}>{estante1.map(p => <ProductoItem key={p.id} producto={p} />)}</Estante>
        </div>

        <Heladera tipo={heladeraAbierta} />
      </motion.div>
    </motion.div>
  );
};