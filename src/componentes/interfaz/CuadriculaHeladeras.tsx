import React, { useState } from 'react';

interface CuadriculaProps {
  onSeleccionarCategoria: (categoria: string) => void;
  onAbrirCheckout: () => void;
}

export const CuadriculaHeladeras: React.FC<CuadriculaProps> = ({
  onSeleccionarCategoria,
  onAbrirCheckout,
}) => {
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

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
      {/* 🪄 Animación para el flotado suave del cartel indicador */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flotarAyuda {
          0% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
          100% { transform: translateX(-50%) translateY(0); }
        }
      `}} />

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

      {/* --- ℹ️ BOTÓN DEL TÍTULO (INVISIBLE + CARTELITO ARRIBA DEL TODO) --- */}
      <button
        onClick={() => setMostrarAyuda(true)}
        style={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '20%', 
          backgroundColor: 'transparent', 
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: 20 
        }}
        aria-label="Ver ayuda de funcionamiento"
      >
        {/* 🏷️ CARTELITO FLOTANTE */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#06b6d4',
            color: '#05070f',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'flotarAyuda 2s infinite ease-in-out',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          💡 TOCÁ EL TÍTULO PARA VER CÓMO FUNCIONA
        </div>
      </button>

      {/* --- 🥤 HELADERAS SUPERIORES --- */}
      <button
        onClick={() => onSeleccionarCategoria('sin-alcohol')}
        style={{ 
          position: 'absolute', top: '20%', left: '3%', width: '46%', height: '32%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Sin Alcohol"
      />

      <button
        onClick={() => onSeleccionarCategoria('bajon')}
        style={{ 
          position: 'absolute', top: '20%', right: '3%', width: '46%', height: '32%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Bajón"
      />

      {/* --- 🚬 ELEMENTOS DEL MOSTRADOR --- */}
      <button
        onClick={() => onSeleccionarCategoria('cigarrillos')}
        style={{ 
          position: 'absolute', top: '53%', left: '2%', width: '35%', height: '14%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Cigarrillos"
      />

      <button
        onClick={onAbrirCheckout}
        style={{ 
          position: 'absolute', top: '51%', right: '3%', width: '39%', height: '16%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ir al Checkout"
      />

      {/* --- 🍾 FILA INFERIOR DE HELADERAS --- */}
      <button
        onClick={() => onSeleccionarCategoria('alcohol')}
        style={{ 
          position: 'absolute', top: '68%', left: '3%', width: '30%', height: '31%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Alcohol"
      />

      <button
        onClick={() => onSeleccionarCategoria('combos')}
        style={{ 
          position: 'absolute', top: '68%', left: '35%', width: '30%', height: '31%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Combos"
      />

      <button
        onClick={() => onSeleccionarCategoria('aperitivos')}
        style={{ 
          position: 'absolute', top: '68%', right: '3%', width: '30%', height: '31%', 
          backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 10 
        }}
        aria-label="Ver Heladera Aperitivos"
      />

      {/* --- 📋 CARTELITO EMERGENTE DE AYUDA (PASO A PASO) --- */}
      {mostrarAyuda && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 7, 15, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#0c0f1d',
              border: '2px solid rgba(6, 182, 212, 0.5)',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.3)',
              borderRadius: '24px',
              padding: '28px 24px',
              color: 'white',
              maxWidth: '320px',
              width: '100%'
            }}
          >
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '900', letterSpacing: '1px', color: '#06b6d4', textAlign: 'center' }}>
              🍻 PASOS PARA TU PEDIDO
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#06b6d4', color: '#05070f', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px', flexShrink: 0 }}>1</span>
                <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: '1.4' }}>
                  <strong>Tocá las heladeras o estantes</strong> para abrirlos y explorar las bebidas y snacks.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#06b6d4', color: '#05070f', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px', flexShrink: 0 }}>2</span>
                <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: '1.4' }}>
                  <strong>Elegí tus productos</strong> preferidos y agregalos al carrito de compras.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#06b6d4', color: '#05070f', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px', flexShrink: 0 }}>3</span>
                <p style={{ margin: 0, fontSize: '13px', color: '#e2e8f0', lineHeight: '1.4' }}>
                  Tocá la <strong>caja registradora (PAGAR)</strong> en el mostrador para finalizar tu pedido.
                </p>
              </div>
            </div>

            <button
              onClick={() => setMostrarAyuda(false)}
              style={{
                backgroundColor: '#06b6d4',
                color: '#05070f',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '900',
                fontSize: '13px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                width: '100%',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)'
              }}
            >
              ¡Entendido, a comprar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};