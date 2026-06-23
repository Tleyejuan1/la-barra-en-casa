'use client';

import React, { useState } from 'react';
import CarritoMobile from './CarritoMobile';
import CuadriculaHeladeras from './CuadriculaHeladeras';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
}

// Declaramos la interfaz para que TypeScript reconozca las props que vienen del padre
interface HomeMobileProps {
  setHeladeraAbierta?: (categoria: string | null) => void;
  setChatAbierto?: (abierto: boolean) => void;
  neones?: any;
}

export default function HomeMobile({ setHeladeraAbierta, setChatAbierto, neones }: HomeMobileProps) {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((previo) => [...previo, producto]);
  };

  return (
    <div 
      style={{
        position: 'relative', 
        width: '100vw', 
        height: '100vh',
        backgroundColor: '#09090b', // zinc-950
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* CONTENEDOR CON DESPLAZAMIENTO FLUIDO (Evita la rigidez en celulares) */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch', // Scroll suave en iOS
          overscrollBehavior: 'contain'
        }}
        className="scrollbar-none" // Para ocultar la barra de scroll con Tailwind si lo tenés configurado
      >
        {/* Lienzo de la barra: un poco más ancho y alto para permitir el paneo nativo */}
        <div 
          style={{
            position: 'relative',
            width: '108vw',
            height: '105vh',
            minHeight: '800px',
            maxWidth: '480px',
            margin: '0 auto',
            backgroundImage: "url('/assets/barra-mobile.jpg')", 
            backgroundPosition: 'center center', 
            backgroundSize: '100% 100%', 
            backgroundRepeat: 'no-repeat',
            transition: 'all 0.3s ease-out'
          }}
        >
          {/* Componente con las nuevas zonas interactivas (Heladeras y Cigarrillos) */}
          <CuadriculaHeladeras alSeleccionarProducto={agregarAlCarrito} />
        </div>
      </div>

      {/* Nuevo Carrito Modular deslizable desde abajo */}
      <CarritoMobile 
        articulos={carrito} 
        abierto={carritoAbierto} 
        setAbierto={setCarritoAbierto} 
      />
    </div>
  );
}