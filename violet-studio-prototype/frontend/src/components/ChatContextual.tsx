import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2, Brain } from 'lucide-react';
import type { Usuario, Componente } from '../App';

interface Mensaje {
  id: string;
  tipo: 'usuario' | 'agente';
  contenido: string;
  timestamp: string;
}

interface ChatContextualProps {
  usuario: Usuario;
  contexto: string;
  componente: Componente | null;
  onClose: () => void;
}

const ChatContextual: React.FC<ChatContextualProps> = ({
  usuario,
  contexto,
  componente,
  onClose
}) => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [modoProbaton, setModoProbaton] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll automático al final del chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  // Mensaje de bienvenida
  useEffect(() => {
    const mensajeBienvenida: Mensaje = {
      id: '1',
      tipo: 'agente',
      contenido: `¡Hola ${usuario.nombre}! Soy tu agente IA especializado en ${contexto.replace('_', ' ')}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date().toISOString()
    };
    setMensajes([mensajeBienvenida]);
  }, [usuario.nombre, contexto]);

  // Función para enviar mensaje
  const enviarMensaje = async () => {
    if (!mensaje.trim() || enviando) return;

    const nuevoMensaje: Mensaje = {
      id: Date.now().toString(),
      tipo: 'usuario',
      contenido: mensaje,
      timestamp: new Date().toISOString()
    };

    setMensajes(prev => [...prev, nuevoMensaje]);
    setMensaje('');
    setEnviando(true);

    try {
      const endpoint = modoProbaton ? '/api/probaton' : '/api/chat';
      const body = modoProbaton 
        ? {
            pregunta: mensaje,
            componenteId: componente?.id,
            bibliaId: contexto
          }
        : {
            mensaje: mensaje,
            contexto: contexto,
            usuario: usuario.nombre
          };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        const respuestaAgente: Mensaje = {
          id: (Date.now() + 1).toString(),
          tipo: 'agente',
          contenido: data.respuesta,
          timestamp: new Date().toISOString()
        };
        setMensajes(prev => [...prev, respuestaAgente]);
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      const errorMsg: Mensaje = {
        id: (Date.now() + 1).toString(),
        tipo: 'agente',
        contenido: 'Lo siento, hubo un error procesando tu mensaje. Por favor intenta de nuevo.',
        timestamp: new Date().toISOString()
      };
      setMensajes(prev => [...prev, errorMsg]);
    } finally {
      setEnviando(false);
    }
  };

  // Función para manejar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  // Función para limpiar chat
  const limpiarChat = () => {
    const mensajeBienvenida: Mensaje = {
      id: '1',
      tipo: 'agente',
      contenido: `¡Hola ${usuario.nombre}! Soy tu agente IA especializado en ${contexto.replace('_', ' ')}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date().toISOString()
    };
    setMensajes([mensajeBienvenida]);
  };

  // Obtener nombre del agente basado en contexto
  const getNombreAgente = () => {
    if (contexto.includes('research')) {
      return contexto.includes('litigios') ? 'Liti Researcher' : 'Agente Research';
    } else if (contexto.includes('design')) {
      return 'Agente Design';
    } else {
      return 'Agente IA';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-violet-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-violet-600 rounded-full">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900">{getNombreAgente()}</h3>
            <p className="text-xs text-slate-500">
              {contexto.replace('_', ' ')} • {modoProbaton ? 'Modo Probatón' : 'Asistente'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Toggle modo probatón (solo para curadores) */}
          {usuario.tipo === 'curador' && componente && (
            <button
              onClick={() => setModoProbaton(!modoProbaton)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                modoProbaton
                  ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {modoProbaton ? 'Probatón ON' : 'Probatón'}
            </button>
          )}
          
          <button
            onClick={limpiarChat}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            Limpiar
          </button>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Área de mensajes */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
              msg.tipo === 'usuario' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {/* Avatar */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                msg.tipo === 'usuario' 
                  ? 'bg-blue-100' 
                  : 'bg-violet-100'
              }`}>
                {msg.tipo === 'usuario' ? (
                  <User className="w-4 h-4 text-blue-600" />
                ) : (
                  <Bot className="w-4 h-4 text-violet-600" />
                )}
              </div>

              {/* Mensaje */}
              <div className={`px-4 py-2 rounded-lg ${
                msg.tipo === 'usuario'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-slate-900'
              }`}>
                <div 
                  className="text-sm"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {msg.contenido}
                </div>
                <div className={`text-xs mt-1 ${
                  msg.tipo === 'usuario' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicador de escritura */}
        {enviando && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full">
                <Bot className="w-4 h-4 text-violet-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                  <span className="text-sm text-slate-500">Escribiendo...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input de mensaje */}
      <div className="p-4 border-t border-gray-200">
        {modoProbaton && componente && (
          <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Bot className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Modo Probatón</span>
            </div>
            <p className="text-xs text-orange-700">
              Probando el agente con el componente: {componente.titulo}
            </p>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                modoProbaton 
                  ? "Haz una pregunta para probar el agente..." 
                  : "Escribe tu mensaje..."
              }
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              rows={3}
              disabled={enviando}
            />
          </div>
          <button
            onClick={enviarMensaje}
            disabled={!mensaje.trim() || enviando}
            className={`p-3 rounded-lg transition-colors ${
              mensaje.trim() && !enviando
                ? 'bg-violet-600 hover:bg-violet-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {enviando ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sugerencias rápidas */}
        {mensajes.length === 1 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-slate-500 mb-2">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {contexto.includes('research') && (
                <>
                  <button
                    onClick={() => setMensaje('¿Cómo hago un Kickoff de Caso Journey?')}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Kickoff Guide
                  </button>
                  <button
                    onClick={() => setMensaje('Ayúdame a definir triggers para este caso')}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Definir Triggers
                  </button>
                </>
              )}
              {contexto.includes('design') && (
                <button
                  onClick={() => setMensaje('¿Cuáles son los principios de UX para casos legales?')}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Principios UX
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContextual;