'use client';

import React, { useState } from 'react';
import { CuadriculaHeladeras } from './CuadriculaHeladeras';
import { CarritoMobile } from './CarritoMobile';
import { useCarrito } from '../../app/carrito/ContextoCarrito';

interface HomeMobileProps {
  setHeladeraAbierta?: (valor: string | null) => void;
  setChatAbierto?: (valor: boolean) => void;
  neones?: any;
}

export const HomeMobile: React.FC<HomeMobileProps> = ({ 
  setHeladeraAbierta, 
  setChatAbierto,
  neones 
}) => {
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);
  
  // ⚡ CONSUMO DEL MOTOR GLOBAL: Traemos el estado real del carrito y la acción de vaciar
  const { carrito, vaciarCarrito } = useCarrito();

  const cambiarCategoria = (cat: string | null) => {
    setCategoriaAbierta(cat);
    if (setHeladeraAbierta) {
      setHeladeraAbierta(cat);
    }
  };

  // Mapeamos los datos globales al formato simplificado que espera tu componente CarritoMobile
  const itemsAdaptados = carrito.map((item) => ({
    nombre: `${item.nombre} (${item.medida})`, // Ej: "Fernet Branca (750ml)"
    precio: item.precio,
    cantidad: item.cantidad
  }));

  return (
    <div 
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#09090b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '16px',
        paddingBottom: '60px',
        boxSizing: 'border-box'
      }}
    >
      {/* 📱 CONTENEDOR ENLACE CON DESPLAZAMIENTO INTEGRAL */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: 'auto',
          aspectRatio: '9/16',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px'
        }}
      >
        {/* Tu barra con los botones invisibles calibrados */}
        <CuadriculaHeladeras 
          onSeleccionarCategoria={(cat) => cambiarCategoria(cat)}
          onAbrirCheckout={() => setCheckoutAbierto(true)}
        />

        {/* Tu carrito mobile conectado directamente al estado global reactivo */}
        <CarritoMobile 
          isOpen={checkoutAbierto}
          onClose={() => setCheckoutAbierto(false)}
          cartItems={itemsAdaptados}
          onVaciarCarrito={vaciarCarrito}
        />
      </div>
    </div>
  );
};