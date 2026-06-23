// src/components/HomeMobile/CuadriculaHeladeras.tsx
'use client';

import React, { useState } from 'react';
import { Producto } from './HomeMobile';

// Importá acá tu lista real de productos de la PC (ajustá la ruta según tu proyecto)
// import { LISTA_PRODUCTOS } from '@/datos/productos';

interface CuadriculaProps {
  alSeleccionarProducto: (producto: Producto) => void;
}

export default function CuadriculaHeladeras({ alSeleccionarProducto }: CuadriculaProps) {
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);

  // --- MOCK DE BASE DE DATOS (Reemplazalo con tu importación real de productos) ---
  const productosBase = [
    // Heladera: Sin Alcohol (Arriba Izquierda)
    { id: 'sa1', nombre: 'Coca-Cola Sabor Original 354ml', precio: 1200, categoria: 'Sin Alcohol' },
    { id: 'sa2', nombre: 'Monster Energy Original 473ml', precio: 2200, categoria: 'Sin Alcohol' },
    { id: 'sa3', nombre: 'Red Bull Energy Drink 250ml', precio: 2400, categoria: 'Sin Alcohol' },
    
    // Heladera: Bajón (Arriba Derecha)
    { id: 'b1', nombre: 'Papas Lays Clásicas 150g', precio: 1800, categoria: 'Bajón' },
    { id: 'b2', nombre: 'Alfajor Milka Oreo Mousse', precio: 900, categoria: 'Bajón' },
    { id: 'b3', nombre: 'Chocolate Shot Grande', precio: 1500, categoria: 'Bajón' },

    // Heladera: Alcohol / Blancas (Abajo Izquierda)
    { id: 'alc1', nombre: 'Vodka Smirnoff 700ml', precio: 5800, categoria: 'Alcohol' },
    { id: 'alc2', nombre: 'Fernet Branca 750ml', precio: 8500, categoria: 'Alcohol' },

    // Heladera: Combos (Abajo Centro)
    { id: 'c1', nombre: 'Combo Fernet Branca + 2 Coca-Cola', precio: 11500, categoria: 'Combos' },
    { id: 'c2', nombre: 'Combo Vodka Skyy + 4 Speed', precio: 9800, categoria: 'Combos' },

    // Heladera: Aperitivos (Abajo Derecha)
    { id: 'ap1', nombre: 'Aperol 750ml', precio: 5200, categoria: 'Aperitivos' },
    { id: 'ap2', nombre: 'Campari 750ml', precio: 5500, categoria: 'Aperitivos' },

    // Vitrina: Cigarrillos (Sobre el mostrador)
    { id: 'cig1', nombre: 'Marlboro Red Box 20', precio: 3200, categoria: 'Cigarrillos' },
    { id: 'cig2', nombre: 'Philip Morris Box 20', precio: 2900, categoria: 'Cigarrillos' },
    { id: 'cig3', nombre: 'Camel Box 20', precio: 3100, categoria: 'Cigarrillos' },
  ];

  // Filtramos los productos según la heladera o vitrina que el usuario toque
  const productosFiltrados = productosBase.filter(p => p.categoria === categoriaAbierta);

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      
      {/* 🚬 VITRINA DE CIGARRILLOS */}
      <button 
        onClick={() => setCategoriaAbierta('Cigarrillos')}
        style={{ position: 'absolute', top: '51%', left: '22%', width: '56%', height: '9%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* 🧊 HELADERA: SIN ALCOHOL (Arriba Izquierda) */}
      <button 
        onClick={() => setCategoriaAbierta('Sin Alcohol')}
        style={{ position: 'absolute', top: '15%', left: '5%', width: '42%', height: '32%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* 🧊 HELADERA: BAJÓN (Arriba Derecha) */}
      <button 
        onClick={() => setCategoriaAbierta('Bajón')}
        style={{ position: 'absolute', top: '15%', left: '53%', width: '42%', height: '32%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* 🧊 HELADERA: ALCOHOL (Abajo Izquierda) */}
      <button 
        onClick={() => setCategoriaAbierta('Alcohol')}
        style={{ position: 'absolute', top: '70%', left: '4%', width: '29%', height: '25%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* 🧊 HELADERA: COMBOS (Abajo Centro) */}
      <button 
        onClick={() => setCategoriaAbierta('Combos')}
        style={{ position: 'absolute', top: '70%', left: '35%', width: '30%', height: '25%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* 🧊 HELADERA: APERITIVOS (Abajo Derecha) */}
      <button 
        onClick={() => setCategoriaAbierta('Aperitivos')}
        style={{ position: 'absolute', top: '70%', left: '67%', width: '29%', height: '25%', cursor: 'pointer', opacity: 0, zIndex: 40 }}
      />

      {/* ================= MODAL DESPLEGABLE DE PRODUCTOS REALES ================= */}
      {categoriaAbierta && (
        <div 
          onClick={() => setCategoriaAbierta(null)} // Cierra al tocar afuera
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar dentro del modal
            style={{
              backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '24px',
              width: '100%', maxWidth: '360px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#f4f4f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {categoriaAbierta}
              </h3>
              <button onClick={() => setCategoriaAbierta(null)} style={{ color: '#a1a1aa', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {productosFiltrados.map((producto) => (
                <div 
                  key={producto.id}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    backgroundColor: '#27272a', padding: '12px', borderRadius: '14px', border: '1px solid #3f3f46'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '70%' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#e4e4e7' }}>{producto.nombre}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#10b981' }}>${producto.precio}</span>
                  </div>
                  <button 
                    onClick={() => {
                      alSeleccionarProducto(producto);
                      setCategoriaAbierta(null); // Cierra tras añadir
                    }}
                    style={{
                      backgroundColor: '#f4f4f5', color: '#09090b', fontWeight: '800',
                      fontSize: '12px', padding: '8px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer'
                    }}
                  >
                    Sumar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}