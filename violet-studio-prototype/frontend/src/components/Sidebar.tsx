import React from 'react';
import { Book, FileText, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { Biblia, Componente, Usuario } from '../App';

interface SidebarProps {
  biblias: Biblia[];
  bibliaActiva: Biblia | null;
  componenteActivo: Componente | null;
  onBibliaSelect: (bibliaId: string) => void;
  onComponenteSelect: (componente: Componente) => void;
  usuario: Usuario;
}

const Sidebar: React.FC<SidebarProps> = ({
  biblias,
  bibliaActiva,
  componenteActivo,
  onBibliaSelect,
  onComponenteSelect,
  usuario
}) => {
  // Iconos para estados
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Validado':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'En Validación':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Borrador':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'Archivado':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  // Colores para roles
  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'Research':
        return 'bg-blue-100 text-blue-800';
      case 'Design':
        return 'bg-purple-100 text-purple-800';
      case 'Product Manager':
        return 'bg-green-100 text-green-800';
      case 'SoftDev':
        return 'bg-orange-100 text-orange-800';
      case 'HardDev':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full">
      {/* Lista de biblias */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-slate-900 mb-3">Biblias Disponibles</h3>
        <div className="space-y-2">
          {biblias.map((biblia) => (
            <button
              key={biblia.id}
              onClick={() => onBibliaSelect(biblia.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                bibliaActiva?.id === biblia.id
                  ? 'bg-violet-50 border-violet-200 text-violet-900'
                  : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Book className="w-5 h-5 mt-1 text-slate-400" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRolColor(biblia.rol)}`}>
                      {biblia.rol}
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate">{biblia.titulo}</p>
                  <p className="text-xs text-slate-500 mt-1">{biblia.servicio}</p>
                  {biblia.totalComponentes && (
                    <p className="text-xs text-slate-400 mt-1">
                      {biblia.totalComponentes} componente{biblia.totalComponentes !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Componentes de la biblia activa */}
      {bibliaActiva && bibliaActiva.componentes && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-sm font-medium text-slate-900 mb-3">
            Componentes - {bibliaActiva.titulo}
          </h3>
          <div className="space-y-2">
            {bibliaActiva.componentes.map((componente) => (
              <button
                key={componente.id}
                onClick={() => onComponenteSelect(componente)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  componenteActivo?.id === componente.id
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getEstadoIcon(componente.estado)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 mb-1">
                      {componente.titulo}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>v{componente.version}</span>
                      <span>{componente.estado}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {componente.autor} • {componente.fechaEdicion}
                    </p>
                    {componente.feedback && componente.feedback.length > 0 && (
                      <div className="flex items-center mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          {componente.feedback.length} feedback{componente.feedback.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estado cuando no hay biblia seleccionada */}
      {!bibliaActiva && biblias.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-center text-slate-500">
            <Book className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Selecciona una biblia para ver sus componentes</p>
          </div>
        </div>
      )}

      {/* Estado cuando no hay biblias */}
      {biblias.length === 0 && (
        <div className="p-4 text-center text-slate-500">
          <Book className="w-8 h-8 mx-auto mb-2 text-slate-300" />
          <p className="text-sm">No hay biblias disponibles</p>
          <p className="text-xs text-slate-400 mt-1">
            Verifica la conexión con el servidor
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;