export interface VarianteProducto {
  id: string;        // ID único para identificar esta medida específica en el carrito
  medida: string;    // Ejemplo: '473ml', '750ml', '1L', 'Paquete Grande'
  precio: number;
}

export interface Producto {
  id: string;        // ID base del producto
  nombre: string;
  imagen: string;
  heladeraTipo: 'alcohol' | 'aperitivos' | 'gaseosas' | 'sin-alcohol' | 'snacks' | 'bajon' | 'combos' | 'cigarrillos';
  estante: number;
  variantes: VarianteProducto[]; // Lista de variantes (medidas) disponibles
}

export const LISTA_PRODUCTOS: Producto[] = [
  // --- HELADERA 1: ALCOHOL ---
  { 
    id: 'prod-fernet', 
    nombre: 'Fernet Branca', 
    imagen: 'https://images.unsplash.com/photo-1630245778103-63321528669e?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 1,
    variantes: [
      { id: 'fernet-750', medida: '750ml', precio: 8500 },
      { id: 'fernet-1L', medida: '1L', precio: 11500 }
    ]
  },
  { 
    id: 'prod-patagonia', 
    nombre: 'Cerveza Patagonia IPA', 
    imagen: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 2,
    variantes: [
      { id: 'patagonia-lata', medida: 'Lata 473ml', precio: 1800 },
      { id: 'patagonia-boca', medida: 'Botella 730ml', precio: 2900 }
    ]
  },
  { 
    id: 'prod-absolut', 
    nombre: 'Vodka Absolut', 
    imagen: 'https://images.unsplash.com/photo-1551538827-9c037cb4f33a?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'alcohol', 
    estante: 3,
    variantes: [
      { id: 'absolut-700', medida: '700ml', precio: 12000 }
    ]
  },

  // --- HELADERA 2: APERITIVOS ---
  { 
    id: 'prod-gancia', 
    nombre: 'Gancia Americano', 
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 1,
    variantes: [
      { id: 'gancia-950', medida: '950ml', precio: 4200 }
    ]
  },
  { 
    id: 'prod-campari', 
    nombre: 'Campari Aperitivo', 
    imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 2,
    variantes: [
      { id: 'campari-750', medida: '750ml', precio: 6500 }
    ]
  },
  { 
    id: 'prod-aperol', 
    nombre: 'Aperol Aperitivo', 
    imagen: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'aperitivos', 
    estante: 3,
    variantes: [
      { id: 'aperol-750', medida: '750ml', precio: 5800 }
    ]
  },

  // --- HELADERA 3: SIN ALCOHOL ---
  { 
    id: 'prod-cocacola', 
    nombre: 'Coca-Cola Original', 
    imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', 
    estante: 1,
    variantes: [
      { id: 'coca-lata', medida: 'Lata 354ml', precio: 1200 },
      { id: 'coca-15', medida: 'Botella 1.5L', precio: 2500 },
      { id: 'coca-225', medida: 'Botella 2.25L', precio: 3300 }
    ]
  },
  { 
    id: 'prod-sprite', 
    nombre: 'Sprite Lima Limón', 
    imagen: 'https://images.unsplash.com/photo-1625772299847-291528574763?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', 
    estante: 2,
    variantes: [
      { id: 'sprite-lata', medida: 'Lata 354ml', precio: 1100 },
      { id: 'sprite-15', medida: 'Botella 1.5L', precio: 2400 }
    ]
  },
  { 
    id: 'prod-agua', 
    nombre: 'Agua Mineral Con Gas', 
    imagen: 'https://images.unsplash.com/photo-1608885898957-a599fb18de37?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'sin-alcohol', 
    estante: 3,
    variantes: [
      { id: 'agua-500', medida: '500ml', precio: 950 }
    ]
  },

  // --- HELADERA 4: BAJÓN ---
  { 
    id: 'prod-lays', 
    nombre: 'Papas Lays Clásicas', 
    imagen: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', 
    estante: 1,
    variantes: [
      { id: 'lays-al plato', medida: '85g', precio: 1500 },
      { id: 'lays-paquete', medida: '140g', precio: 2100 }
    ]
  },
  { 
    id: 'prod-doritos', 
    nombre: 'Doritos Queso Nacho', 
    imagen: 'https://images.unsplash.com/photo-1599490659223-e1b69494db53?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', 
    estante: 2,
    variantes: [
      { id: 'doritos-140', medida: '140g', precio: 2300 }
    ]
  },
  { 
    id: 'prod-pringles', 
    nombre: 'Pringles Originales', 
    imagen: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80', 
    heladeraTipo: 'bajon', 
    estante: 3,
    variantes: [
      { id: 'pringles-tubo', medida: 'Tubo 124g', precio: 3400 }
    ]
  }
];