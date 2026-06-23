export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  // Soportamos ambos formatos para que no rompa nada en ninguna vista
  heladeraTipo: 'alcohol' | 'aperitivos' | 'gaseosas' | 'sin-alcohol' | 'snacks' | 'bajon';
  estante: number;
}

export const LISTA_PRODUCTOS: Producto[] = [
  // --- HELADERA 1: ALCOHOL ---
  { 
    id: 'alc-1', 
    nombre: 'Fernet Branca 750ml', 
    precio: 8500, 
    imagen: 'https://images.unsplash.com/photo-1630245778103-63321528669e?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 1 
  },
  { 
    id: 'alc-2', 
    nombre: 'Cerveza Patagonia IPA', 
    precio: 1800, 
    imagen: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 2 
  },
  { 
    id: 'alc-3', 
    nombre: 'Vodka Absolut 700ml', 
    precio: 12000, 
    imagen: 'https://images.unsplash.com/photo-1551538827-9c037cb4f33a?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 3 
  },

  // --- HELADERA 2: APERITIVOS ---
  { 
    id: 'ape-1', 
    nombre: 'Gancia Americano 950ml', 
    precio: 4200, 
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 1 
  },
  { 
    id: 'ape-2', 
    nombre: 'Campari Aperitivo 750ml', 
    precio: 6500, 
    imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 2 
  },
  { 
    id: 'ape-3', 
    nombre: 'Aperol Aperitivo 750ml', 
    precio: 5800, 
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 3 
  },

  // --- HELADERA 3: SIN ALCOHOL ---
  { 
    id: 'gas-1', 
    nombre: 'Coca-Cola Original 1.5L', 
    precio: 2500, 
    imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', // Alineado con mobile
    estante: 1 
  },
  { 
    id: 'gas-2', 
    nombre: 'Sprite Lima Limón Lata', 
    precio: 1100, 
    imagen: 'https://images.unsplash.com/photo-1625772299847-291528574763?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', // Alineado con mobile
    estante: 2 
  },
  { 
    id: 'gas-3', 
    nombre: 'Agua Mineral Con Gas', 
    precio: 950, 
    imagen: 'https://images.unsplash.com/photo-1608885898957-a599fb18de37?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', // Alineado con mobile
    estante: 3 
  },

  // --- HELADERA 4: BAJÓN ---
  { 
    id: 'sna-1', 
    nombre: 'Papas Lays Clásicas', 
    precio: 2100, 
    imagen: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', // Alineado con mobile
    estante: 1 
  },
  { 
    id: 'sna-2', 
    nombre: 'Doritos Queso Nacho', 
    precio: 2300, 
    imagen: 'https://images.unsplash.com/photo-1599490659223-e1b69494db53?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', // Alineado con mobile
    estante: 2 
  },
  { 
    id: 'sna-3', 
    nombre: 'Pringles Originales', 
    precio: 3400, 
    imagen: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', // Alineado con mobile
    estante: 3 
  }
];