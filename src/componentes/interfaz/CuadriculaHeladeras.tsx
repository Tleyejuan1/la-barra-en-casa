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
    // Corrección estricta de tipos para TypeScript
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
      {/* 📸 Imagen de fondo adaptada */}
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

      {/* --- BOTONES INVISIBLES GRANDES PARA EL TACTO (ZONA MEDIA) --- */}
      
      {/* Vitrina de Cigarrillos (Izquierda mostrador) */}
      <button
        onClick={() => onSeleccionarCategoria('cigarrillos')}
        style={{ 
          position: 'absolute', 
          top: '45%', 
          left: '2%', 
          width: '35%', 
          height: '16%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Cigarrillos"
      />

      {/* Caja Registradora "PAGAR" (Derecha mostrador) */}
      <button
        onClick={onAbrirCheckout}
        style={{ 
          position: 'absolute', 
          top: '43%', 
          right: '2%', 
          width: '40%', 
          height: '18%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ir al Checkout"
      />

      {/* --- FILA DE HELADERAS INFERIORES (SÚPER AMPLIADAS) --- */}
      {/* Distribuidas a lo ancho para que ocupen todo el espacio inferior de la barra */}

      {/* Heladera 1: ALCOHOL */}
      <button
        onClick={() => onSeleccionarCategoria('alcohol')}
        style={{ 
          position: 'absolute', 
          bottom: '2%', 
          left: '2%', 
          width: '18%', 
          height: '32%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Heladera Alcohol"
      />

      {/* Heladera 2: SIN ALCOHOL (Nueva) */}
      <button
        onClick={() => onSeleccionarCategoria('sin-alcohol')}
        style={{ 
          position: 'absolute', 
          bottom: '2%', 
          left: '21%', 
          width: '18%', 
          height: '32%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Heladera Sin Alcohol"
      />

      {/* Heladera 3: COMBOS */}
      <button
        onClick={() => onSeleccionarCategoria('combos')}
        style={{ 
          position: 'absolute', 
          bottom: '2%', 
          left: '41%', 
          width: '18%', 
          height: '32%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Heladera Combos"
      />

      {/* Heladera 4: BAJÓN / COMIDA (Nueva) */}
      <button
        onClick={() => onSeleccionarCategoria('bajon')}
        style={{ 
          position: 'absolute', 
          bottom: '2%', 
          left: '61%', 
          width: '18%', 
          height: '32%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Heladera Bajón"
      />

      {/* Heladera 5: APERITIVOS */}
      <button
        onClick={() => onSeleccionarCategoria('aperitivos')}
        style={{ 
          position: 'absolute', 
          bottom: '2%', 
          right: '2%', 
          width: '18%', 
          height: '32%', 
          opacity: 0, 
          cursor: 'pointer', 
          zIndex: 10 
        }}
        aria-label="Ver Heladera Aperitivos"
      />
    </div>
  );
};