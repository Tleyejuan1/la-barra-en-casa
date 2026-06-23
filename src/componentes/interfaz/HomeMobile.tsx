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
    // Contenedor padre que centra el "teléfono" simulado en la pantalla
    <div className="w-full min-h-screen bg-[#09090b] flex justify-center items-center p-4 overflow-hidden font-sans select-none">
      
      {/* 📱 CAJA CON TAMAÑO REAL DE CELULAR */}
      <div className="relative w-full max-w-[410px] h-[88vh] max-h-[850px] bg-black rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-zinc-800 overflow-hidden flex justify-center items-center">
        
        <CuadriculaHeladeras 
          onSeleccionarCategoria={(cat) => cambiarCategoria(cat)}
          onAbrirCheckout={() => setCheckoutAbierto(true)}
        />

        {/* El flujo de pago se renderiza acoplado al contenedor del celu */}
        <CarritoMobile 
          isOpen={checkoutAbierto}
          onClose={() => setCheckoutAbierto(false)}
          cartItems={carrito}
          onVaciarCarrito={manejarVaciarCarrito}
        />
      </div>

      {/* CATÁLOGO MODAL (Queda flotando a pantalla completa para cómoda lectura) */}
      {categoriaAbierta && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-6 flex flex-col justify-start text-white">
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Catálogo Disponible</span>
              <h2 className="text-2xl font-black uppercase tracking-wider text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.4)]">
                {categoriaAbierta === 'cigarrillos' ? '🚬 Cigarrillos' : `🍾 ${categoriaAbierta}`}
              </h2>
            </div>
            <button 
              onClick={() => cambiarCategoria(null)} 
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-zinc-800 transition-colors uppercase tracking-wide cursor-pointer"
            >
              Volver a la Barra
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[75vh] pr-1">
            {STOCK_PRODUCTOS[categoriaAbierta]?.map((prod, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 flex justify-between items-center"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-sm text-zinc-200">{prod.nombre}</p>
                  <p className="font-extrabold text-emerald-400 text-sm">${prod.precio}</p>
                </div>
                <button 
                  onClick={() => manejarAgregarAlCarrito(prod.nombre, prod.precio)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-xl font-black uppercase tracking-wider transition-colors cursor-pointer"
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