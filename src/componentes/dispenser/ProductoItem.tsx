'use client';

import React from 'react';
import { useCarrito } from '../../app/carrito/ContextoCarrito';
import { Producto } from '../../datos/productos';

interface ProductoItemProps {
  producto: Producto;
}

export default function ProductoItem({ producto }: ProductoItemProps) {
  const { agregarProducto } = useCarrito();

  // Centralizamos la función para asegurar ejecución instantánea
  const handleAgregar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Frena el procesamiento hacia la heladera/estante
    agregarProducto(producto);
  };

  return (
    <div 
      onClick={handleAgregar} // Ahora toda la tarjeta responde al click al instante
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100px',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Animación más fluida nocturna
        cursor: 'pointer'
      }}
      className="group-item"
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* CONTENEDOR DE LA IMAGEN */}
      <div 
        style={{
          width: '65px',
          height: '65px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '6px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
          pointerEvents: 'none' // Evita que la imagen intercepte el click del usuario
        }}
      >
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} 
        />
      </div>

      {/* INFORMACIÓN DEL PRODUCTO */}
      <span 
        style={{
          fontSize: '11px',
          fontWeight: '700',
          color: '#e2e8f0',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '0 2px',
          pointerEvents: 'none'
        }}
        title={producto.nombre}
      >
        {producto.nombre}
      </span>

      <span 
        style={{
          fontSize: '12px',
          fontWeight: '900',
          color: '#10b981', 
          marginTop: '2px',
          pointerEvents: 'none'
        }}
      >
        ${producto.precio.toLocaleString('es-AR')}
      </span>

      {/* BOTÓN + AÑADIR */}
      <button
        onClick={handleAgregar}
        style={{
          marginTop: '6px',
          backgroundColor: '#1e293b',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '4px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          e.currentTarget.style.backgroundColor = '#10b981';
          e.currentTarget.style.borderColor = '#10b981';
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          e.currentTarget.style.backgroundColor = '#1e293b';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}
      >
        + Añadir
      </button>
    </div>
  );
}