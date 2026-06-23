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
    <div className="relative w-full h-full max-w-[500px] aspect-[9/16] overflow-hidden select-none bg-black shadow-2xl">
      {/* Imagen de fondo definitiva del bar con el bot simpático */}
      <img 
        src="/assets/bg-barra-casa.png" 
        alt="La Barra En Casa" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* --- ZONAS INTERACTIVAS DEL MOSTRADOR --- */}
      
      {/* Vitrina de Cigarrillos (Extremo izquierdo sobre la barra) */}
      <button
        onClick={() => onSeleccionarCategoria('cigarrillos')}
        className="absolute top-[49%] left-[4%] w-[25%] h-[11%] opacity-0 active:bg-white/10 transition-all rounded-md cursor-pointer z-10"
        aria-label="Ver Cigarrillos"
      />

      {/* Pantalla Táctil / Caja Registradora "PAGAR" (Extremo derecho sobre la barra) */}
      <button
        onClick={onAbrirCheckout}
        className="absolute top-[48%] right-[3%] w-[26%] h-[14%] opacity-0 active:bg-white/10 transition-all rounded-md cursor-pointer z-10"
        aria-label="Ir al Checkout"
      />

      {/* --- HELADERAS INFERIORES UNDER-COUNTER --- */}
      
      {/* Heladera ALCOHOL (Izquierda) */}
      <button
        onClick={() => onSeleccionarCategoria('alcohol')}
        className="absolute bottom-[3%] left-[5%] w-[28%] h-[27%] opacity-0 active:bg-white/10 transition-all rounded-b-lg cursor-pointer z-10"
        aria-label="Ver Heladera Alcohol"
      />

      {/* Heladera COMBOS (Centro) */}
      <button
        onClick={() => onSeleccionarCategoria('combos')}
        className="absolute bottom-[3%] left-[36%] w-[28%] h-[27%] opacity-0 active:bg-white/10 transition-all rounded-b-lg cursor-pointer z-10"
        aria-label="Ver Heladera Combos"
      />

      {/* Heladera APERITIVOS (Derecha) */}
      <button
        onClick={() => onSeleccionarCategoria('aperitivos')}
        className="absolute bottom-[3%] right-[5%] w-[28%] h-[27%] opacity-0 active:bg-white/10 transition-all rounded-b-lg cursor-pointer z-10"
        aria-label="Ver Heladera Aperitivos"
      />
    </div>
  );
};