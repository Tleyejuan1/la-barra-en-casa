'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Producto, VarianteProducto } from '../../datos/productos';

// El ítem del carrito ahora guarda los datos base del producto más la variante elegida
export interface ItemCarrito {
  idVariante: string; // ID único de la variante (ej: 'coca-lata')
  nombre: string;     // Nombre del producto (ej: 'Coca-Cola Original')
  medida: string;     // Medida elegida (ej: 'Lata 354ml')
  precio: number;     // Precio de esta variante
  imagen: string;     // Imagen del producto
  cantidad: number;   // Cantidad en el carrito
}

interface ContextoCarritoType {
  carrito: ItemCarrito[];
  total: number;
  agregarProducto: (producto: Producto, variante: VarianteProducto) => void;
  eliminarProducto: (idVariante: string) => void;
  vaciarCarrito: () => void;
}

const ContextoCarrito = createContext<ContextoCarritoType | undefined>(undefined);

export function ProveedorCarrito({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // ⚡ CALCULADOR EN TIEMPO REAL
  const total = useMemo(() => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }, [carrito]);

  // ⚡ FUNCIÓN DE AGREGADO CONFIGURADA PARA MEDIDAS/VARIANTES
  const agregarProducto = (producto: Producto, variante: VarianteProducto) => {
    setCarrito((carritoActual) => {
      // Buscamos si ya existe la combinación exacta de producto y medida en el carrito
      const existe = carritoActual.find((item) => item.idVariante === variante.id);
      
      if (existe) {
        return carritoActual.map((item) =>
          item.idVariante === variante.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      
      // Si no existe, creamos el registro limpio usando los datos de la variante
      const nuevoItem: ItemCarrito = {
        idVariante: variante.id,
        nombre: producto.nombre,
        medida: variante.medida,
        precio: variante.precio,
        imagen: producto.imagen,
        cantidad: 1
      };

      return [...carritoActual, nuevoItem];
    });
  };

  const eliminarProducto = (idVariante: string) => {
    setCarrito((carritoActual) => {
      const itemEnCarrito = carritoActual.find((item) => item.idVariante === idVariante);
      if (!itemEnCarrito) return carritoActual;

      if (itemEnCarrito.cantidad === 1) {
        return carritoActual.filter((item) => item.idVariante !== idVariante);
      } else {
        return carritoActual.map((item) =>
          item.idVariante === idVariante ? { ...item, cantidad: item.cantidad - 1 } : item
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