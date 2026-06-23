import React from 'react';

interface CuadriculaProps {
  onSeleccionarCategoria: (categoria: string) => void;
  onAbrirCheckout: () => void;
}

export const CuadriculaHeladeras: React.FC<CuadriculaProps> = ({
  onSeleccionarCategoria,
  onAbrirCheckout,
}) => {
  const manejarErrorImagen = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const elementoImg = e.currentTarget as HTMLImageElement;
    if (!elementoImg.src.endsWith('.png')) {
      elementoImg.src = '/assets/barra-mobile.png';
    }
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: '9/16',
        overflow: 'hidden',
        userSelect: 'none',
        backgroundColor: '#09090b',
        borderRadius: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid #27272a'
      }}
    >
      <img 
        src="/assets/barra-mobile.jpg" 
        alt="La Barra En Casa" 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          zIndex: 1
        }}
        onError={manejarErrorImagen}
      />

      {/* --- 🥤 HELADERAS SUPERIORES (UN TOQUE MÁS ABAJO) --- */}
      
      {/* Sin Alcohol (Arriba Izquierda) */}
      <button
        onClick={() => onSeleccionarCategoria('sin-alcohol')}
        style={{ 
          position: 'absolute', top: '2%', left: '3%', width: '46%', height: '49%', 
          backgroundColor: 'rgba(0, 255, 255, 0.25)', border: '2px solid cyan', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Sin Alcohol"
      >SIN ALCOHOL</button>

      {/* Bajón (Arriba Derecha) */}
      <button
        onClick={() => onSeleccionarCategoria('bajon')}
        style={{ 
          position: 'absolute', top: '2%', right: '3%', width: '46%', height: '49%', 
          backgroundColor: 'rgba(234, 179, 8, 0.25)', border: '2px solid #eab308', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Bajón"
      >BAJÓN</button>


      {/* --- 🚬 ELEMENTOS DEL MOSTRADOR (RECALIBRADOS) --- */}
      
      {/* Cigarrillos */}
      <button
        onClick={() => onSeleccionarCategoria('cigarrillos')}
        style={{ 
          position: 'absolute', top: '53%', left: '2%', width: '35%', height: '14%', 
          backgroundColor: 'rgba(255, 0, 0, 0.25)', border: '2px solid red', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Cigarrillos"
      >CIGARROS</button>

      {/* Pagar / Caja Registradora */}
      <button
        onClick={onAbrirCheckout}
        style={{ 
          position: 'absolute', top: '51%', right: '3%', width: '39%', height: '16%', 
          backgroundColor: 'rgba(0, 255, 0, 0.25)', border: '2px solid green', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ir al Checkout"
      >PAGAR</button>


      {/* --- 🍾 FILA INFERIOR DE HELADERAS (UNIFICADAS AL 30% DE ANCHO CADA UNA) --- */}

      {/* Alcohol (Izquierda) */}
      <button
        onClick={() => onSeleccionarCategoria('alcohol')}
        style={{ 
          position: 'absolute', top: '68%', left: '3%', width: '30%', height: '31%', 
          backgroundColor: 'rgba(0, 0, 255, 0.25)', border: '2px solid blue', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Alcohol"
      >ALCOHOL</button>

      {/* Combos (Centro exacto al 35% de left para no pisarse) */}
      <button
        onClick={() => onSeleccionarCategoria('combos')}
        style={{ 
          position: 'absolute', top: '68%', left: '35%', width: '30%', height: '31%', 
          backgroundColor: 'rgba(255, 0, 255, 0.25)', border: '2px solid magenta', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Combos"
      >COMBOS</button>

      {/* Aperitivos (Derecha) */}
      <button
        onClick={() => onSeleccionarCategoria('aperitivos')}
        style={{ 
          position: 'absolute', top: '68%', right: '3%', width: '30%', height: '31%', 
          backgroundColor: 'rgba(255, 128, 0, 0.25)', border: '2px solid orange', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Aperitivos"
      >APERITIVOS</button>

    </div>
  );
};