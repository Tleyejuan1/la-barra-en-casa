import React, { useState } from 'react';
import { CuadriculaHeladeras } from './CuadriculaHeladeras';
import { CarritoMobile } from './CarritoMobile';

interface CartItem {
  nombre: string;
  precio: number;
  cantidad: number;
}

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
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const cambiarCategoria = (cat: string | null) => {
    setCategoriaAbierta(cat);
    if (setHeladeraAbierta) {
      setHeladeraAbierta(cat);
    }
  };

  const manejarVaciarCarrito = () => setCarrito([]);

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
        {/* Tu barra original con la lógica de apertura de heladeras real */}
        <CuadriculaHeladeras 
          onSeleccionarCategoria={(cat) => cambiarCategoria(cat)}
          onAbrirCheckout={() => setCheckoutAbierto(true)}
        />

        {/* Tu carrito mobile original */}
        <CarritoMobile 
          isOpen={checkoutAbierto}
          onClose={() => setCheckoutAbierto(false)}
          cartItems={carrito}
          onVaciarCarrito={manejarVaciarCarrito}
        />
      </div>
    </div>
  );
};