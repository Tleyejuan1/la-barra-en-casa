import React, { useState } from 'react';

interface CartItem {
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CarritoMobileProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onVaciarCarrito: () => void;
}

export const CarritoMobile: React.FC<CarritoMobileProps> = ({ 
  isOpen, 
  onClose, 
  cartItems,
  onVaciarCarrito 
}) => {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [tipoEntrega, setTipoEntrega] = useState<'envio' | 'retiro'>('envio');
  
  // Formulario Datos Personales
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [direccion, setDireccion] = useState('');
  const [conCuantoPaga, setConCuantoPaga] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const manejarFinalizarPedido = () => {
    alert(`¡Pedido Confirmado!\n\nCliente: ${nombreUsuario}\nModo: ${tipoEntrega === 'envio' ? 'Envío a ' + direccion : 'Retiro en el local'}\nPaga con: ${conCuantoPaga}\nTotal: $${total}`);
    onVaciarCarrito();
    setPaso(1);
    setNombreUsuario('');
    setDireccion('');
    setConCuantoPaga('');
    onClose();
  };

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      {/* 📦 CUADRO FLOTANTE QUE OCUPA BASTANTE PANTALLA */}
      <div 
        style={{
          width: '100%',
          backgroundColor: '#121214',
          borderRadius: '24px',
          border: '1px solid #27272a',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90%',
          overflowY: 'auto',
          boxSizing: 'border-box',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #27272a', paddingBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {paso === 1 ? '🛒 REVISIÓN' : '📝 DATOS DE PAGO'}
          </h3>
          <button 
            onClick={onClose}
            style={{ backgroundColor: '#27272a', border: 'none', color: '#e4e4e7', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Cerrar
          </button>
        </div>

        {/* PASO 1: PRODUCTOS Y OPCIÓN DE ENTREGA */}
        {paso === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            <div style={{ overflowY: 'auto', maxHeight: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#71717a', padding: '20px 0', fontSize: '14px' }}>
                  La caja registradora está vacía.<br/>Tocá la barra para sumar productos.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#18181b', padding: '10px 14px', borderRadius: '12px', border: '1px solid #27272a' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.nombre} (x{item.cantidad})</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>${item.precio * item.cantidad}</span>
                  </div>
                ))
              )}
            </div>

            {/* Selector de opciones: Envío o Retiro */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase' }}>Opciones de entrega:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setTipoEntrega('envio')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    border: tipoEntrega === 'envio' ? '2px solid #dc2626' : '1px solid #27272a',
                    backgroundColor: tipoEntrega === 'envio' ? 'rgba(220, 38, 38, 0.1)' : '#18181b',
                    color: tipoEntrega === 'envio' ? '#ffffff' : '#a1a1aa',
                    transition: 'all 0.2s'
                  }}
                >
                  📍 Envío
                </button>
                <button
                  onClick={() => setTipoEntrega('retiro')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    border: tipoEntrega === 'retiro' ? '2px solid #dc2626' : '1px solid #27272a',
                    backgroundColor: tipoEntrega === 'retiro' ? 'rgba(220, 38, 38, 0.1)' : '#18181b',
                    color: tipoEntrega === 'retiro' ? '#ffffff' : '#a1a1aa',
                    transition: 'all 0.2s'
                  }}
                >
                  🏪 Retiro en Local
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #27272a', marginTop: '4px' }}>
              <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Total actual:</span>
              <span style={{ fontWeight: '900', fontSize: '16px', color: '#10b981' }}>${total}</span>
            </div>

            <button
              disabled={cartItems.length === 0}
              onClick={() => setPaso(2)}
              style={{ width: '100%', backgroundColor: '#dc2626', border: 'none', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer', opacity: cartItems.length === 0 ? 0.5 : 1, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px' }}
            >
              Siguiente: Datos Personales
            </button>
          </div>
        )}

        {/* PASO 2: FORMULARIO STRING */}
        {paso === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Input Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase' }}>Nombre y Apellido</label>
              <input 
                type="text" 
                placeholder="Ej: Juan Cruz" 
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Input Dirección Condicional (solo si es Envío) */}
            {tipoEntrega === 'envio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase' }}>Dirección de Envío</label>
                <input 
                  type="text" 
                  placeholder="Ej: Av. Colón 1234, Barrio Centro" 
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
            )}

            {/* Input Con cuánto paga */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase' }}>¿Con cuánto vas a pagar?</label>
              <input 
                type="text" 
                placeholder="Ej: Pago con $15000 o Mercado Pago" 
                value={conCuantoPaga}
                onChange={(e) => setConCuantoPaga(e.target.value)}
                style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Acciones del Paso 2 */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => setPaso(1)}
                style={{ flex: 1, backgroundColor: '#27272a', border: 'none', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
              >
                Volver
              </button>
              <button 
                disabled={!nombreUsuario.trim() || (tipoEntrega === 'envio' && !direccion.trim()) || !conCuantoPaga.trim()}
                onClick={manejarFinalizarPedido}
                style={{ 
                  flex: 2, 
                  backgroundColor: '#10b981', 
                  border: 'none', 
                  color: 'black', 
                  padding: '14px', 
                  borderRadius: '12px', 
                  fontWeight: '900', 
                  fontSize: '14px', 
                  textTransform: 'uppercase',
                  cursor: (!nombreUsuario.trim() || (tipoEntrega === 'envio' && !direccion.trim()) || !conCuantoPaga.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (!nombreUsuario.trim() || (tipoEntrega === 'envio' && !direccion.trim()) || !conCuantoPaga.trim()) ? 0.5 : 1
                }}
              >
                Pedir a la Barra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};