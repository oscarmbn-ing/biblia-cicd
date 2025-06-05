import React, { useState } from 'react';
import { 
  Edit3, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  History,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Settings
} from 'lucide-react';
import type { Biblia, Componente, Usuario, Feedback } from '../App';

interface LibroVivoProps {
  biblia: Biblia | null;
  componente: Componente | null;
  usuario: Usuario;
  modoEdicion?: boolean;
  onComponenteUpdate?: (componente: Componente) => void;
}

const LibroVivo: React.FC<LibroVivoProps> = ({
  biblia,
  componente,
  usuario,
  modoEdicion = false,
  onComponenteUpdate
}) => {
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState('');
  const [motivoCambio, setMotivoCambio] = useState('');
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [feedbackSeleccionado, setFeedbackSeleccionado] = useState<'util' | 'incorrecto' | 'incompleto' | null>(null);
  const [comentarioFeedback, setComentarioFeedback] = useState('');

  // Función para iniciar edición
  const iniciarEdicion = () => {
    if (componente) {
      setTextoEditado(componente.textoVectorizado);
      setEditando(true);
    }
  };

  // Función para cancelar edición
  const cancelarEdicion = () => {
    setEditando(false);
    setTextoEditado('');
    setMotivoCambio('');
  };

  // Función para guardar cambios
  const guardarCambios = async () => {
    if (!componente || !biblia) return;

    try {
      const response = await fetch(`http://localhost:3001/api/biblias/${biblia.id}/componentes/${componente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textoVectorizado: textoEditado,
          autor: usuario.nombre,
          motivo: motivoCambio || 'Actualización del contenido'
        }),
      });

      if (response.ok) {
        const componenteActualizado = await response.json();
        onComponenteUpdate?.(componenteActualizado);
        setEditando(false);
        setTextoEditado('');
        setMotivoCambio('');
      }
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  };

  // Función para enviar feedback
  const enviarFeedback = async () => {
    if (!componente || !biblia || !feedbackSeleccionado) return;

    try {
      const response = await fetch(`http://localhost:3001/api/biblias/${biblia.id}/componentes/${componente.id}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: feedbackSeleccionado,
          comentario: comentarioFeedback,
          usuario: usuario.nombre
        }),
      });

      if (response.ok) {
        // Resetear el formulario de feedback
        setFeedbackSeleccionado(null);
        setComentarioFeedback('');
        setMostrarFeedback(false);
        
        // Aquí podrías refrescar el componente para mostrar el nuevo feedback
      }
    } catch (error) {
      console.error('Error enviando feedback:', error);
    }
  };

  // Función para validar componente (solo curadores)
  const validarComponente = async () => {
    if (!componente || !biblia || usuario.tipo !== 'curador') return;

    try {
      const response = await fetch(`http://localhost:3001/api/biblias/${biblia.id}/componentes/${componente.id}/validar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const componenteActualizado = await response.json();
        onComponenteUpdate?.(componenteActualizado);
      }
    } catch (error) {
      console.error('Error validando componente:', error);
    }
  };

  // Función para obtener icono de estado
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Validado':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'En Validación':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Borrador':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!biblia || !componente) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-slate-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">Libro Vivo</h3>
          <p className="text-sm">Selecciona una biblia y un componente para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {getEstadoIcon(componente.estado)}
              <h1 className="text-2xl font-bold text-slate-900">{componente.titulo}</h1>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>Versión {componente.version}</span>
              <span>•</span>
              <span>{componente.autor}</span>
              <span>•</span>
              <span>{componente.fechaEdicion}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                componente.estado === 'Validado' ? 'bg-green-100 text-green-800' :
                componente.estado === 'En Validación' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {componente.estado}
              </span>
            </div>

            <div className="mt-3 text-sm text-slate-600">
              <span className="font-medium">{biblia.titulo}</span>
              <span className="mx-2">→</span>
              <span>{biblia.rol} • {biblia.servicio}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Botón de historial */}
            <button
              onClick={() => setMostrarHistorial(!mostrarHistorial)}
              className="btn-ghost"
            >
              <History className="w-4 h-4" />
              Historial
            </button>

            {/* Botón de edición (solo para curadores) */}
            {modoEdicion && usuario.tipo === 'curador' && !editando && (
              <button
                onClick={iniciarEdicion}
                className="btn-primary"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </button>
            )}

            {/* Botón de validación (solo para curadores) */}
            {usuario.tipo === 'curador' && componente.estado === 'En Validación' && (
              <button
                onClick={validarComponente}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Validar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex">
        {/* Panel principal del contenido */}
        <div className="flex-1 p-6">
          {editando ? (
            /* Modo edición */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Texto Vectorizado
                </label>
                <textarea
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Edita el contenido aquí..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Motivo del cambio
                </label>
                <input
                  type="text"
                  value={motivoCambio}
                  onChange={(e) => setMotivoCambio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Describe brevemente los cambios realizados..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={cancelarEdicion}
                  className="btn-secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
                <button
                  onClick={guardarCambios}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            /* Modo lectura */
            <div className="libro-vivo">
              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{
                  __html: componente.textoVectorizado.replace(/\n/g, '<br>')
                }}
              />
              
              {/* Botones de feedback (solo para usuarios tácticos) */}
              {usuario.tipo === 'tactico' && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-slate-900 mb-3">
                    ¿Te fue útil esta información?
                  </h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setFeedbackSeleccionado('util');
                        enviarFeedback();
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Útil</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setFeedbackSeleccionado('incorrecto');
                        setMostrarFeedback(true);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Incorrecto</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setFeedbackSeleccionado('incompleto');
                        setMostrarFeedback(true);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Incompleto</span>
                    </button>
                  </div>

                  {/* Formulario de feedback detallado */}
                  {mostrarFeedback && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <textarea
                        value={comentarioFeedback}
                        onChange={(e) => setComentarioFeedback(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        rows={3}
                        placeholder={
                          feedbackSeleccionado === 'incorrecto' 
                            ? '¿Qué información es incorrecta?'
                            : '¿Qué información falta?'
                        }
                      />
                      <div className="flex items-center justify-end space-x-2 mt-3">
                        <button
                          onClick={() => {
                            setMostrarFeedback(false);
                            setFeedbackSeleccionado(null);
                            setComentarioFeedback('');
                          }}
                          className="btn-ghost text-sm"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={enviarFeedback}
                          className="btn-primary text-sm"
                        >
                          Enviar Feedback
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Panel lateral del historial */}
        {mostrarHistorial && (
          <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-900">Historial de Versiones</h3>
              <button
                onClick={() => setMostrarHistorial(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Versión actual */}
              <div className="p-4 bg-white rounded-lg border border-violet-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-violet-700">
                    v{componente.version} (actual)
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    componente.estado === 'Validado' ? 'bg-green-100 text-green-800' :
                    componente.estado === 'En Validación' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {componente.estado}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{componente.autor}</p>
                <p className="text-xs text-slate-500">{componente.fechaEdicion}</p>
              </div>

              {/* Historial de versiones */}
              {componente.historial && componente.historial.map((version, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      v{version.version}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{version.autor}</p>
                  <p className="text-xs text-slate-500 mb-2">{version.fecha}</p>
                  <p className="text-xs text-slate-600 italic">{version.motivo}</p>
                </div>
              ))}

              {/* Feedback recibido */}
              {componente.feedback && componente.feedback.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-900 mb-3">Feedback Recibido</h4>
                  <div className="space-y-3">
                    {componente.feedback.map((feedback) => (
                      <div key={feedback.id} className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feedback.tipo === 'util' ? 'bg-green-100 text-green-800' :
                            feedback.tipo === 'incorrecto' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {feedback.tipo}
                          </span>
                          <span className="text-xs text-slate-500">{feedback.fecha}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{feedback.usuario}</p>
                        <p className="text-xs text-slate-500">{feedback.comentario}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibroVivo;