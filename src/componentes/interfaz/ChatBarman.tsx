'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Mensaje {
  id: string;
  remitente: 'barman' | 'usuario';
  texto: string;
}

interface ChatBarmanProps {
  id?: string;
  chatAbierto: boolean;
  setChatAbierto: (abierto: boolean) => void;
}

// ⚠️ PEGÁ ACÁ TU API KEY DE OPENAI (Empiezan con sk-...)
const OPENAI_API_KEY = "const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY"; 

export default function ChatBarman({ chatAbierto, setChatAbierto }: ChatBarmanProps) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: '1', remitente: 'barman', texto: '¡Buenas noches loco! Bienvenidos a la previa virtual. ¿Qué te vas a armar para hoy? Preguntame lo que quieras con la fuerza de ChatGPT.' }
  ]);
  const [inputUsuario, setInputUsuario] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, escribiendo]);

  const generarRespuestaChatGPT = async (nuevoTexto: string) => {
    try {
      if (!OPENAI_API_KEY || OPENAI_API_KEY.includes("TU_API_KEY_DE_OPENAI")) {
        return "¡Che loco! Te falta poner tu clave de OpenAI (sk-...) en el archivo ChatBarman.tsx.";
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // El modelo más rápido y optimizado para chat
          messages: [
            {
              role: "system",
              content: `Sos el Robot Barman interactivo de una aplicación de e-commerce para previas en Argentina. 
              Tu personalidad es la de un bartender nocturno, muy copado, buena onda, usá expresiones como "loco", "che", "pa", "jefe", "de una".
              Respondé de forma concisa, corta y divertida. Ayudá al usuario a preparar tragos con el stock disponible (Fernet Branca, Coca-Cola, Gancia, Sprite, Campari, etc.).`
            },
            {
              role: "user",
              content: nuevoTexto
            }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error de OpenAI:", data.error);
        return `¡Ufff pa! OpenAI me tiró un centro con error: ${data.error.message}`;
      }

      return data.choices[0].message.content;

    } catch (error) {
      console.error("Error en la petición de OpenAI:", error);
      return "¡Ufff loco! Se me cortaron los cables de OpenAI. Probá mandar de nuevo el mensaje.";
    }
  };

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsuario.trim() || escribiendo) return;

    const textoUsuario = inputUsuario;
    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      remitente: 'usuario',
      texto: textoUsuario
    };

    setMensajes(prev => [...prev, nuevoMensajeUsuario]);
    setInputUsuario('');
    setEscribiendo(true);

    const respuestaIA = await generarRespuestaChatGPT(textoUsuario);

    setMensajes(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      remitente: 'barman',
      texto: respuestaIA
    }]);
    setEscribiendo(false);
  };

  if (!chatAbierto) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{
        position: 'fixed', bottom: '100px', left: '38vw', width: '360px', height: '440px',
        backgroundColor: 'rgba(7, 10, 22, 0.98)', backdropFilter: 'blur(16px)',
        border: '2px solid rgba(6, 182, 212, 0.6)', borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(6, 182, 212, 0.3)', zIndex: 200,
        display: 'flex', flexDirection: 'column', overflow: 'hidden', color: '#fff'
      }}
    >
      {/* Encabezado */}
      <div style={{ padding: '14px', backgroundColor: 'rgba(6, 182, 212, 0.1)', borderBottom: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🤖</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '0.5px' }}>BARMAN CHATGPT</span>
            <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>● MOD GPT-4O ACTIVO</span>
          </div>
        </div>
        <button onClick={() => setChatAbierto(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>✕</button>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mensajes.map((msg) => {
          const esBarman = msg.remitente === 'barman';
          return (
            <div 
              key={msg.id} 
              style={{ 
                alignSelf: esBarman ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
                backgroundColor: esBarman ? 'rgba(255,255,255,0.04)' : '#06b6d4',
                border: esBarman ? '1px solid rgba(255,255,255,0.08)' : 'none',
                color: esBarman ? '#e2e8f0' : '#fff',
                padding: '10px 14px',
                borderRadius: esBarman ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                fontSize: '12px',
                lineHeight: '1.4',
                fontWeight: '500'
              }}
            >
              {msg.texto}
            </div>
          );
        })}
        {escribiendo && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '14px', fontSize: '11px', color: '#64748b', fontStyle: 'italic' }}>
            Barman está pensando el trago... 🍸
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={enviarMensaje} style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <input 
          type="text" 
          value={inputUsuario}
          onChange={(e) => setInputUsuario(e.target.value)}
          placeholder={escribiendo ? "Esperando respuesta..." : "Ej: ¿Cómo armo un buen Campari?"}
          disabled={escribiendo}
          style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '12px', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={escribiendo}
          style={{ backgroundColor: escribiendo ? '#334155' : '#06b6d4', border: 'none', color: '#fff', padding: '0 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Enviar
        </button>
      </form>
    </motion.div>
  );
}