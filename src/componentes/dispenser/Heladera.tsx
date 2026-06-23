'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeladeraProps {
  tipo: string;
}

export default function Heladera({ tipo }: HeladeraProps) {
  // El estado arranca en falso y se abre automáticamente con un delay corto para dar el efecto de apertura real
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: '65px 24px 24px 24px', pointerEvents: open ? 'none' : 'auto', zIndex: 140 }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* 🚪 HOJA IZQUIERDA GIGANTE */}
        <motion.div
          style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
            border: '2.5px solid #334155', borderRight: '1px solid #64748b',
            backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(3px)',
            transformOrigin: 'left center', backfaceVisibility: 'hidden',
            borderRadius: '12px 0 0 12px', boxShadow: 'inset -15px 0 25px rgba(0,0,0,0.6)'
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: open ? -125 : 0 }}
          transition={{ type: 'spring', stiffness: 55, damping: 14 }}
        >
          {/* Reflejo cristalino */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
          {/* Manijón Negro Pro */}
          <div style={{ position: 'absolute', right: '6px', top: '30%', width: '6px', height: '35%', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '999px' }} />
        </motion.div>

        {/* 🚪 HOJA DERECHA GIGANTE */}
        <motion.div
          style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%',
            border: '2.5px solid #334155', borderLeft: '1px solid #64748b',
            backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(3px)',
            transformOrigin: 'right center', backfaceVisibility: 'hidden',
            borderRadius: '0 12px 12px 0', boxShadow: 'inset 15px 0 25px rgba(0,0,0,0.6)'
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: open ? 125 : 0 }}
          transition={{ type: 'spring', stiffness: 55, damping: 14 }}
        >
          {/* Reflejo cristalino */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(-45deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
          {/* Manijón Negro Pro */}
          <div style={{ position: 'absolute', left: '6px', top: '30%', width: '6px', height: '35%', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '999px' }} />
        </motion.div>

      </div>
    </div>
  );
}