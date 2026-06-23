'use client';

import React, { useState } from 'react';
import { useCarrito } from '../../app/carrito/ContextoCarrito';
import { WHATSAPP_CONFIG } from '../../config/shop';

export default function Conservadora() {
  const [minimizado, setMinimizado] = useState(false);
  // ESTADO PARA PASAR DE LA VISTA DEL CARRITO AL FORMULARIO DE CHECKOUT
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);

  // ESTADOS PARA LOS DATOS DEL CLIENTE
  const [nombre, setNombre] = useState('');
  const [entrega, setEntrega] = useState('envio'); // 'envio' o 'takeaway'
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo'); // 'efectivo', 'transferencia', 'mercadopago'

  const contexto = useCarrito() as any;
  const items = contexto?.items || contexto?.carrito || [];
  
  const calcularTotal = contexto?.calcularTotal || contexto?.obtenerTotal || (() => {
    return items.reduce((acc: number, item: any) => acc + ((item.precio || 0) * (item.cantidad || 1)), 0);
  });

  const eliminarDelCarrito = contexto?.eliminarDelCarrito || contexto?.eliminarItem || (() => {});
  const vaciarCarrito = contexto?.vaciarCarrito || contexto?.limpiarCarrito || (() => {});

  // FUNCIÓN FINAL: ARMA EL MENSAJE CON LOS DATOS COMPLETOS Y ABRE WHATSAPP
  const enviarPedidoCompletoWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Che, poneme tu nombre para saber a quién le armamos el pedido.");
      return;
    }

    if (entrega === 'envio' && !direccion.trim()) {
      alert("Falta la dirección para que el delivery sepa a dónde ir.");
      return;
    }

    let cuerpoMensaje = `*NUEVO PEDIDO - LA BARRA EN CASA* 🍻%0A%0A`;
    cuerpoMensaje += `👤 *Cliente:* ${nombre}%0A`;
    cuerpoMensaje += `🛵 *Entrega:* ${entrega === 'envio' ? `Envío a domicilio` : 'Retira en local'}%0A`;
    if (entrega === 'envio') {
      cuerpoMensaje += `📍 *Dirección:* ${direccion}%0A`;
    }
    cuerpoMensaje += `💳 *Pago:* ${metodoPago.toUpperCase()}%0A%0A`;
    cuerpoMensaje += `📝 *Detalle del pedido:*%0A`;

    items.forEach((item: any) => {
      const nombreProd = item.nombre || item.titulo || "Producto";
      const precioProd = item.precio || 0;
      const cantProd = item.cantidad || 1;
      cuerpoMensaje += `• ${cantProd}x ${nombreProd} - $${(precioProd * cantProd).toLocaleString()}%0A`;
    });

    const totalFinal = typeof calcularTotal === 'function' ? calcularTotal() : 0;
    cuerpoMensaje += `%0A*Total del Pedido: $${totalFinal.toLocaleString()}*%0A%0A`;
    cuerpoMensaje += `¿Me confirman si tienen stock de esto así les hago el pago? ¡Gracias! 🚀`;

    const urlFormateada = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.numero}&text=${cuerpoMensaje.replace(/ /g, "%20")}`;
    window.open(urlFormateada, '_blank');
  };

  const totalItems = items.reduce((acc: number, item: any) => acc + (item.cantidad || 1), 0);

  return (
    <div 
      onClick={() => minimizado && setMinimizado(false)}
      style={{
        backgroundColor: 'rgba(6, 9, 19, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(6, 182, 212, 0.15)',
        borderRadius: '20px',
        padding: '20px',
        width: '320px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: minimizado ? 'pointer' : 'default',
        transform: minimizado ? 'translateY(calc(100% - 55px))' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        userSelect: 'none'
      }}
    >
      {/* CABECERA */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setMinimizado(!minimizado);
        }}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid rgba(255,255,255,0.05)', 
          paddingBottom: '10px',
          cursor: 'pointer'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '900', letterSpacing: '1px', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🛒 LA CONSERVADORA {minimizado ? '👇' : '👆'}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', padding: '2px 8px', borderRadius: '20px', fontWeight: 'bold' }}>
            {totalItems} ítems
          </span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>
            {minimizado ? '[Abrir]' : '[Bajar]'}
          </span>
        </div>
      </div>

      {/* CONTENIDO ELEMENTOS */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '14px',
        opacity: minimizado ? 0 : 1,
        visibility: minimizado ? 'hidden' : 'visible',
        transition: 'opacity 0.2s ease',
        maxHeight: minimizado ? '0px' : 'none',
        overflow: 'hidden'
      }}>
        
        {/* EN CASO DE QUE NO ESTÉ EN EL CHECKOUT: MUESTRA EL CARRITO NORMAL */}
        {!checkoutAbierto ? (
          <>
            {/* Lista de productos agregados */}
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
              {items.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', margin: '20px 0' }}>La conservadora está vacía. ¡Meté frío!</p>
              ) : (
                items.map((item: any) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '600' }}>{item.nombre || item.titulo}</h4>
                      <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>{item.cantidad}x ${item.precio}</p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#06b6d4' }}>${((item.precio || 0) * (item.cantidad || 1)).toLocaleString()}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarDelCarrito(item.id);
                        }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', padding: '0 4px', fontWeight: 'bold' }}
                      >✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total general */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
              <span 
                onClick={(e) => { e.stopPropagation(); vaciarCarrito(); }} 
                style={{ fontSize: '11px', color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Vaciar todo
              </span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Total:</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#fff' }}>${calcularTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* BOTÓN 1: CONFIRMAR PEDIDO */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (items.length === 0) {
                  alert("Meté algo al carrito antes de confirmar el pedido, che.");
                  return;
                }
                setCheckoutAbierto(true);
              }}
              style={{
                width: '100%', backgroundColor: '#06b6d4', color: '#000', border: 'none', borderRadius: '12px',
                padding: '14px', fontSize: '11px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)', letterSpacing: '0.5px', textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#22d3ee'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
            >
              🔥 CONFIRMAR PEDIDO
            </button>
          </>
        ) : (
          /* VISTA DEL FORMULARIO DE ENVÍO / DATOS */
          <form onSubmit={enviarPedidoCompletoWhatsApp} onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>DATOS DE ENTREGA</span>
              <span 
                onClick={() => setCheckoutAbierto(false)} 
                style={{ fontSize: '11px', color: '#ef4444', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Volver atrás
              </span>
            </div>

            {/* Campo Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>TU NOMBRE:</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }}
                required
              />
            </div>

            {/* Selector de tipo de entrega */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>¿CÓMO LO QUERÉS?:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEntrega('envio')}
                  style={{ flex: 1, backgroundColor: entrega === 'envio' ? 'rgba(6, 182, 212, 0.2)' : '#0f172a', border: entrega === 'envio' ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                >🛵 Envío</button>
                <button
                  type="button"
                  onClick={() => setEntrega('takeaway')}
                  style={{ flex: 1, backgroundColor: entrega === 'takeaway' ? 'rgba(6, 182, 212, 0.2)' : '#0f172a', border: entrega === 'takeaway' ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                >🏪 Retiro</button>
              </div>
            </div>

            {/* Campo Dirección (solo si es envío) */}
            {entrega === 'envio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>DIRECCIÓN DE ENVÍO:</label>
                <input 
                  type="text" 
                  value={direccion} 
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Mitre 450, Barrio Centro"
                  style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none' }}
                  required={entrega === 'envio'}
                />
              </div>
            )}

            {/* Selector de método de pago */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>MÉTODO DE PAGO:</label>
              <select 
                value={metodoPago} 
                onChange={(e) => setMetodoPago(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="efectivo">💵 Efectivo</option>
                <option value="transferencia">🏦 Transferencia Bancaria</option>
                <option value="mercadopago">📱 Mercado Pago</option>
              </select>
            </div>

            {/* Mostrar total a pagar en el formulario */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Total Final:</span>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#10b981' }}>${calcularTotal().toLocaleString()}</span>
            </div>

            {/* BOTÓN FINAL: ENVIAR TODO A WHATSAPP */}
            <button
              type="submit"
              style={{
                width: '100%', backgroundColor: '#10b981', color: '#000', border: 'none', borderRadius: '12px',
                padding: '14px', fontSize: '11px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34d399'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              🟢 PEDIR POR WHATSAPP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}