import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  MessageSquare,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  ThumbsUp,
  ThumbsDown,
  Settings as SettingsIcon
} from 'lucide-react';
import type { Biblia, Usuario, Componente, Feedback } from '../App';

interface PanelCuracionProps {
  biblias: Biblia[];
  usuario: Usuario;
  onBibliaUpdate: (biblia: Biblia) => void;
}

interface ItemCuracion {
  biblia: Biblia;
  componente: Componente;
  feedbackPendiente: Feedback[];
  prioridad: 'alta' | 'media' | 'baja';
}

const PanelCuracion: React.FC<PanelCuracionProps> = ({
  biblias,
  usuario,
  onBibliaUpdate
}) => {
  const [items, setItems] = useState<ItemCuracion[]>([]);
  const [filtro, setFiltro] = useState<'todos' | 'feedback' | 'validacion'>('todos');
  const [cargando, setCargando] = useState(true);

  // Cargar items de curación
  useEffect(() => {
    const cargarItems = () => {
      setCargando(true);
      const itemsCuracion: ItemCuracion[] = [];
      
      biblias.forEach(biblia => {
        if (biblia.componentes) {
          biblia.componentes.forEach(componente => {
            // Solo incluir componentes que necesiten curación
            const needsCuration = 
              componente.feedback?.length > 0 || 
              componente.estado === 'En Validación' ||
              componente.estado === 'Borrador';
            
            if (needsCuration) {
              // Calcular prioridad basada en feedback y estado
              let prioridad: 'alta' | 'media' | 'baja' = 'baja';
              
              if (componente.feedback && componente.feedback.length > 0) {
                const tieneIncorrecto = componente.feedback.some(f => f.tipo === 'incorrecto');
                if (tieneIncorrecto) prioridad = 'alta';
                else if (componente.feedback.length > 2) prioridad = 'media';
              }
              
              if (componente.estado === 'En Validación') {
                prioridad = prioridad === 'alta' ? 'alta' : 'media';
              }
              
              itemsCuracion.push({
                biblia,
                componente,
                feedbackPendiente: componente.feedback || [],
                prioridad
              });
            }
          });
        }
      });
      
      // Ordenar por prioridad
      itemsCuracion.sort((a, b) => {
        const prioridadOrden = { alta: 3, media: 2, baja: 1 };
        return prioridadOrden[b.prioridad] - prioridadOrden[a.prioridad];
      });
      
      setItems(itemsCuracion);
      setCargando(false);
    };

    cargarItems();
  }, [biblias]);

  // Filtrar items
  const itemsFiltrados = items.filter(item => {
    switch (filtro) {
      case 'feedback':
        return item.feedbackPendiente.length > 0;
      case 'validacion':
        return item.componente.estado === 'En Validación';
      default:
        return true;
    }
  });

  // Función para validar componente
  const validarComponente = async (item: ItemCuracion) => {
    try {
      const response = await fetch(`http://localhost:3001/api/biblias/${item.biblia.id}/componentes/${item.componente.id}/validar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const componenteActualizado = await response.json();
        
        // Actualizar la biblia con el componente validado
        const bibliaActualizada = {
          ...item.biblia,
          componentes: item.biblia.componentes?.map(c => 
            c.id === componenteActualizado.id ? componenteActualizado : c
          )
        };
        
        onBibliaUpdate(bibliaActualizada);
      }
    } catch (error) {
      console.error('Error validando componente:', error);
    }
  };

  // Función para obtener color de prioridad
  const getColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        return <Edit className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (usuario.tipo !== 'curador') {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-slate-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-medium mb-2">Panel de Curación</h3>
          <p className="text-sm">Este panel está disponible solo para curadores</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Panel de Curación</h1>
            <p className="text-sm text-slate-500 mt-1">
              Gestiona el feedback y valida el contenido de las biblias
            </p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="btn-ghost"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                filtro === 'todos'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Todos ({items.length})
            </button>
            <button
              onClick={() => setFiltro('feedback')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                filtro === 'feedback'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Con Feedback ({items.filter(i => i.feedbackPendiente.length > 0).length})
            </button>
            <button
              onClick={() => setFiltro('validacion')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                filtro === 'validacion'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              En Validación ({items.filter(i => i.componente.estado === 'En Validación').length})
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto p-6">
        {cargando ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 text-slate-300 animate-spin" />
              <p className="text-sm text-slate-500">Cargando items de curación...</p>
            </div>
          </div>
        ) : itemsFiltrados.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">¡Todo al día!</h3>
              <p className="text-sm text-slate-500">
                No hay items que requieran curación en este momento
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {itemsFiltrados.map((item, index) => (
              <div
                key={`${item.biblia.id}-${item.componente.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {/* Header del item */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getEstadoIcon(item.componente.estado)}
                      <h3 className="text-lg font-medium text-slate-900">
                        {item.componente.titulo}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorPrioridad(item.prioridad)}`}>
                        {item.prioridad === 'alta' ? 'Alta Prioridad' : 
                         item.prioridad === 'media' ? 'Media Prioridad' : 'Baja Prioridad'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{item.biblia.titulo}</span>
                      <span>•</span>
                      <span>v{item.componente.version}</span>
                      <span>•</span>
                      <span>{item.componente.autor}</span>
                      <span>•</span>
                      <span>{item.componente.fechaEdicion}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.componente.estado === 'En Validación' && (
                      <button
                        onClick={() => validarComponente(item)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Validar
                      </button>
                    )}
                    
                    <button className="btn-ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                {item.feedbackPendiente.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-3">
                      Feedback Pendiente ({item.feedbackPendiente.length})
                    </h4>
                    <div className="space-y-3">
                      {item.feedbackPendiente.slice(0, 3).map((feedback) => (
                        <div key={feedback.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="mt-1">
                            {feedback.tipo === 'util' ? (
                              <ThumbsUp className="w-4 h-4 text-green-500" />
                            ) : feedback.tipo === 'incorrecto' ? (
                              <ThumbsDown className="w-4 h-4 text-red-500" />
                            ) : (
                              <SettingsIcon className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-slate-900">
                                {feedback.usuario}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                feedback.tipo === 'util' ? 'bg-green-100 text-green-800' :
                                feedback.tipo === 'incorrecto' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {feedback.tipo}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">
                              {feedback.comentario || 'Sin comentario adicional'}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {feedback.fecha}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {item.feedbackPendiente.length > 3 && (
                        <div className="text-center">
                          <button className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                            Ver {item.feedbackPendiente.length - 3} más...
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Preview del contenido */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Vista Previa</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {item.componente.textoVectorizado}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estadísticas en el footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Alta prioridad: {items.filter(i => i.prioridad === 'alta').length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Media prioridad: {items.filter(i => i.prioridad === 'media').length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>Baja prioridad: {items.filter(i => i.prioridad === 'baja').length}</span>
            </div>
          </div>
          
          <div>
            Total de feedback pendiente: {items.reduce((acc, item) => acc + item.feedbackPendiente.length, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelCuracion;