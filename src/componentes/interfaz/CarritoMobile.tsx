// src/components/HomeMobile/CarritoMobile.tsx
'use client';

import React from 'react';
import { Producto } from './HomeMobile';

interface CarritoProps {
  articulos: Producto[];
  abierto: boolean;
  setAbierto: (estado: boolean) => void;
}

export default function CarritoMobile({ articulos, abierto, setAbierto }: CarritoProps) {
  // Calcula el precio total sumando los productos en el carrito
  const total = articulos.reduce((acumulador, prod) => acumulador + prod.precio, 0);

  return (
    <>
      {/* Botón flotante para abrir/cerrar el carrito */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-4 rounded-full shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-transform active:scale-95"
      >
        🛒 
        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
          {articulos.length}
        </span>
      </button>

      {/* Panel del Carrito Desplegable */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-zinc-900/95 backdrop-blur-md rounded-t-3xl border-t border-zinc-800 p-6 transition-transform duration-300 ease-in-out shadow-2xl ${
          abierto ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* Barra superior estética para indicar que se puede arrastrar o cerrar */}
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-4 cursor-pointer" onClick={() => setAbierto(false)} />
        
        <h2 className="text-xl font-black tracking-wide text-zinc-100 mb-4">Tu Pedido</h2>

        {articulos.length === 0 ? (
          <p className="text-zinc-500 text-center py-8 text-sm">La barra está vacía. ¡Sumá algo!</p>
        ) : (
          <div className="overflow-y-auto max-h-[40vh] space-y-3 pr-1">
            {articulos.map((item, indice) => (
              <div key={indice} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50">
                <span className="text-sm font-medium text-zinc-300">{item.nombre}</span>
                <span className="text-sm font-bold text-emerald-400">${item.precio}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sección de Total */}
        <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between items-center">
          <span className="text-zinc-400 font-medium">Total:</span>
          <span className="text-2xl font-black text-emerald-400">${total}</span>
        </div>

        {/* Botón de checkout */}
        <button className="w-full mt-4 bg-zinc-100 text-black font-black py-3.5 rounded-xl text-center tracking-wider hover:bg-white active:scale-[0.99] transition-all text-sm uppercase">
          Confirmar y Pedir
        </button>
      </div>
    </>
  );
}