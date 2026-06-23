import React from 'react';

interface CuadriculaProps {
  onSeleccionarCategoria: (categoria: string) => void;
  onAbrirCheckout: () => void;
}

export const CuadriculaHeladeras: React.FC<CuadriculaProps> = ({
  onSeleccionarCategoria,
  onAbrirCheckout,
}) => {
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
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/barra-mobile.png';
        }}
      />

      {/* --- BOTONES INVISIBLES SOBRE LA IMAGEN --- */}
      
      {/* Vitrina de Cigarrillos */}
      <button
        onClick={() => onSeleccionarCategoria('cigarrillos')}
        style={{ position: 'absolute', top: '49%', left: '4%', width: '25%', height: '11%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
        aria-label="Ver Cigarrillos"
      />

      {/* Caja Registradora "PAGAR" */}
      <button
        onClick={onAbrirCheckout}
        style={{ position: 'absolute', top: '48%', right: '3%', width: '26%', height: '14%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
        aria-label="Ir al Checkout"
      />

      {/* Heladera ALCOHOL */}
      <button
        onClick={() => onSeleccionarCategoria('alcohol')}
        style={{ position: 'absolute', bottom: '3%', left: '5%', width: '28%', height: '27%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
        aria-label="Ver Heladera Alcohol"
      />

      {/* Heladera COMBOS */}
      <button
        onClick={() => onSeleccionarCategoria('combos')}
        style={{ position: 'absolute', bottom: '3%', left: '36%', width: '28%', height: '27%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
        aria-label="Ver Heladera Combos"
      />

      {/* Heladera APERITIVOS */}
      <button
        onClick={() => onSeleccionarCategoria('aperitivos')}
        style={{ position: 'absolute', bottom: '3%', right: '5%', width: '28%', height: '27%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
        aria-label="Ver Heladera Aperitivos"
      />
    </div>
  );
};