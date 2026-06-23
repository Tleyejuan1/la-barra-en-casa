'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Producto } from '../../datos/productos';

export interface ItemCarrito extends Producto {
  cantidad: number;
}

interface ContextoCarritoType {
  carrito: ItemCarrito[];
  total: number;
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (id: string) => void;
  vaciarCarrito: () => void;
}

const ContextoCarrito = createContext<ContextoCarritoType | undefined>(undefined);

export function ProveedorCarrito({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // ⚡ CALCULADOR EN TIEMPO REAL: Al cambiar 'carrito', esto se dispara instantáneamente
  const total = useMemo(() => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }, [carrito]);

  // ⚡ FUNCIÓN DE AGREGADO ULTRA-REACTIVA
  const agregarProducto = (producto: Producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);
      
      if (existe) {
        // Al romper la estructura y crear objetos nuevos con el map,
        // React se entera al instante del cambio de valor y actualiza el total en el mismo frame
        return carritoActual.map((item) =>
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      
      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id: string) => {
    setCarrito((carritoActual) => {
      const productoEnCarrito = carritoActual.find((item) => item.id === id);
      if (!productoEnCarrito) return carritoActual;

      if (productoEnCarrito.cantidad === 1) {
        return carritoActual.filter((item) => item.id !== id);
      } else {
        return carritoActual.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      }
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <ContextoCarrito.Provider value={{ carrito, total, agregarProducto, eliminarProducto, vaciarCarrito }}>
      {children}
    </ContextoCarrito.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(ContextoCarrito);
  if (!contexto) {
    throw new Error('useCarrito debe ser usado dentro de un ProveedorCarrito');
  }
  return contexto;
}