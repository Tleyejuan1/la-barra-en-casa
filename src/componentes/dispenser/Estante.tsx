'use client';

import React from 'react';

interface EstanteProps {
  numero: number;
  children: React.ReactNode;
}

export default function Estante({ numero, children }: EstanteProps) {
  // Contamos de forma segura cuántos hijos reales vinieron adentro
  const cantidadProductos = React.Children.count(children);

  return (
    <div 
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px'
      }}
    >
      {/* Contenedor horizontal para las botellas/paquetes */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          paddingBottom: '8px',
          minHeight: '80px',
          width: '100%',
          gap: '10px'
        }}
      >
        {cantidadProductos === 0 ? (
          <span style={{ color: '#475569', fontSize: '11px', fontStyle: 'italic' }}>
            Estante Vacío
          </span>
        ) : (
          children
        )}
      </div>

      {/* REJILLA FÍSICA: Línea de metal del estante con brillo LED */}
      <div 
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#334155',
          borderRadius: '2px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)'
        }}
      />
    </div>
  );
}