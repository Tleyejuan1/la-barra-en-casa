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
  const [paso, setPaso] = useState<'revision' | 'envio' | 'pago'>('revision');
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const manejarFinalizarPedido = () => {
    alert('¡Pedido Procesado Exitosamente! El robot ya está preparando tu entrega.');
    onVaciarCarrito();
    setPaso('revision');
    setDireccion('');
    setMetodoPago('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
      {/* Backdrop clickeable para cerrar el modal */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className="bg-[#0f0f11] text-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 border-t border-zinc-800 flex flex-col gap-4 shadow-2xl">
        
        {/* Encabezado dinámico */}
        <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
          <h3 className="text-xl font-black tracking-wide text-zinc-100 flex items-center gap-2">
            {paso === 'revision' && '🛒 Tu Pedido'}
            {paso === 'envio' && '📍 Ubicación de Envío'}
            {paso === 'pago' && '💳 Confirmar Pago'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white bg-zinc-900 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>

        {/* PASO 1: REVISIÓN DE PRODUCTOS */}
        {paso === 'revision' && (
          <div className="flex flex-col gap-4">
            <div className="overflow-y-auto max-h-[35vh] space-y-2 pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500 text-sm">La caja registradora está vacía.</p>
                  <p className="text-zinc-600 text-xs mt-1">Tocá las heladeras o la vitrina para sumar productos.</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-zinc-200">{item.nombre}</span>
                      <span className="text-xs text-zinc-500">${item.precio} c/u</span>
                    </div>
                    <span className="font-bold text-sm text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                      x{item.cantidad} — ${item.precio * item.cantidad}
                    </span>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="flex justify-between items-center p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <span className="text-sm text-zinc-400 font-medium">Subtotal a pagar:</span>
                <span className="text-lg font-black text-zinc-100">${total}</span>
              </div>
            )}
            
            <button 
              disabled={cartItems.length === 0}
              onClick={() => setPaso('envio')}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-600 py-3.5 rounded-xl font-bold tracking-wider uppercase transition-all mt-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] text-sm"
            >
              Siguiente: Configurar Envío
            </button>
          </div>
        )}

        {/* PASO 2: DIRECCIÓN Y COORDENADAS */}
        {paso === 'envio' && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase font-bold mb-2 tracking-wider">Dirección de Entrega</label>
              <input 
                type="text" 
                placeholder="Ej: Av. Colón 1234, Barrio Centro" 
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 placeholder-zinc-600 transition-colors"
              />
            </div>

            <div className="w-full h-36 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-xs border border-dashed border-zinc-800 gap-2">
              <span className="text-2xl">🗺️</span>
              <p className="font-medium text-zinc-400">Geolocalización Activa</p>
              <p className="text-zinc-600 px-4 text-center">Mapeando ruta de entrega óptima desde el bar.</p>
            </div>

            <div className="flex gap-3 mt-2">
              <button 
                onClick={() => setPaso('revision')} 
                className="w-1/3 bg-zinc-900 border border-zinc-800 py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors"
              >
                Volver
              </button>
              <button 
                disabled={!direccion.trim()}
                onClick={() => setPaso('pago')} 
                className="w-2/3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-600 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all"
              >
                Continuar al Pago
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: PASARELA DE PAGO */}
        {paso === 'pago' && (
          <div className="flex flex-col gap-4">
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl space-y-2 text-xs text-zinc-400">
              <p className="flex justify-between"><span className="font-semibold text-zinc-500">📍 Destino:</span> <span className="text-zinc-200 font-medium">{direccion}</span></p>
              <p className="flex justify-between items-center pt-2 border-t border-zinc-800/60"><span className="font-semibold text-zinc-500">💵 Total del Delivery:</span> <span className="text-emerald-400 font-bold text-sm">${total}</span></p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-zinc-400 uppercase font-bold tracking-wider">Seleccionar Método</label>
              <select 
                value={metodoPago} 
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-zinc-600">Elegí cómo abonar...</option>
                <option value="mp">Mercado Pago (Alias / Transferencia inmediata)</option>
                <option value="efectivo">Efectivo (Pago exacto al repartidor)</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setPaso('envio')} 
                className="w-1/3 bg-zinc-900 border border-zinc-800 py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors"
              >
                Volver
              </button>
              <button 
                disabled={!metodoPago}
                onClick={manejarFinalizarPedido}
                className="w-2/3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Confirmar Orden
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};