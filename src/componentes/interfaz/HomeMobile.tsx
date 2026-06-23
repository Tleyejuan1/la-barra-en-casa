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

const STOCK_PRODUCTOS: Record<string, { nombre: string; precio: number }[]> = {
  cigarrillos: [
    { nombre: 'Marlboro Box 20', precio: 3200 },
    { nombre: 'Philip Morris Common', precio: 2900 },
    { nombre: 'Camel Blue Box 20', precio: 3100 },
    { nombre: 'Lucky Strike Double Click', precio: 3000 },
  ],
  alcohol: [
    { nombre: 'Fernet Branca 750ml', precio: 8500 },
    { nombre: 'Jägermeister 700ml', precio: 14000 },
    { nombre: 'Vodka Absolut Regular', precio: 7800 },
    { nombre: 'Vodka Skyy 750ml', precio: 4500 },
  ],
  combos: [
    { nombre: 'Combo Fernet Branca + 2 Coca-Cola', precio: 11500 },
    { nombre: 'Combo Vodka Smirnoff + 4 Speed Latas', precio: 8900 },
    { nombre: 'Combo Campari + 2 Cepita Naranja', precio: 9200 },
  ],
  aperitivos: [
    { nombre: 'Aperol Litro', precio: 5200 },
    { nombre: 'Gancia Americano 950ml', precio: 3800 },
    { nombre: 'Campari 750ml', precio: 6100 },
    { nombre: 'Vermut Carpano Rosso', precio: 4700 },
  ],
};

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

  const manejarAgregarAlCarrito = (nombre: string, precio: number) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.nombre === nombre);
      if (existe) {
        return prevCarrito.map((item) =>
          item.nombre === nombre ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { nombre, precio, cantidad: 1 }];
    });
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
        alignItems: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      {/* 📱 CONTENEDOR CON RELACIÓN DE ASPECTO INMUTABLE */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: 'calc(100vh - 40px)',
          maxHeight: '800px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CuadriculaHeladeras 
          onSeleccionarCategoria={(cat) => cambiarCategoria(cat)}
          onAbrirCheckout={() => setCheckoutAbierto(true)}
        />

        <CarritoMobile 
          isOpen={checkoutAbierto}
          onClose={() => setCheckoutAbierto(false)}
          cartItems={carrito}
          onVaciarCarrito={manejarVaciarCarrito}
        />
      </div>

      {/* CATÁLOGO MODAL */}
      {categoriaAbierta && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Catálogo Disponible</span>
              <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', color: '#ef4444' }}>
                {categoriaAbierta === 'cigarrillos' ? '🚬 Cigarrillos' : `🍾 ${categoriaAbierta}`}
              </h2>
            </div>
            <button 
              onClick={() => cambiarCategoria(null)} 
              style={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: '#e4e4e7', padding: '10px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              Volver a la Barra
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 }}>
            {STOCK_PRODUCTOS[categoriaAbierta]?.map((prod, idx) => (
              <div 
                key={idx} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#18181b', padding: '16px', borderRadius: '14px', border: '1px solid #27272a' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#e4e4e7', margin: 0 }}>{prod.nombre}</p>
                  <p style={{ fontWeight: '800', fontSize: '14px', color: '#10b981', margin: 0 }}>${prod.precio}</p>
                </div>
                <button 
                  onClick={() => manejarAgregarAlCarrito(prod.nombre, prod.precio)}
                  style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '12px', padding: '8px 14px', borderRadius: '10px', fontWeight: '900', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  + Agregar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};