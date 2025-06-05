import React, { useState, useEffect } from 'react';
import { BookOpen, MessageCircle, Settings, Users, BrainCircuit } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LibroVivo from './components/LibroVivo';
import ChatContextual from './components/ChatContextual';
import PanelCuracion from './components/PanelCuracion';
import './App.css';

// Tipos principales
export interface Biblia {
  id: string;
  rol: string;
  servicio: string;
  titulo: string;
  totalComponentes?: number;
  componentes?: Componente[];
}

export interface Componente {
  id: string;
  titulo: string;
  textoVectorizado: string;
  version: string;
  autor: string;
  fechaEdicion: string;
  estado: 'Borrador' | 'En Validación' | 'Validado' | 'Archivado';
  feedback: Feedback[];
  historial: VersionHistorial[];
}

export interface Feedback {
  id: string;
  tipo: 'util' | 'incorrecto' | 'incompleto';
  comentario: string;
  usuario: string;
  fecha: string;
}

export interface VersionHistorial {
  version: string;
  autor: string;
  fecha: string;
  motivo: string;
}

// Tipos de usuario
export type TipoUsuario = 'tactico' | 'curador' | 'ceo';
export type Rol = 'Research' | 'Design' | 'Product Manager' | 'SoftDev' | 'HardDev';
export type Servicio = 'Litigios' | 'Concursal' | 'Protección Patrimonial';

export interface Usuario {
  id: string;
  nombre: string;
  tipo: TipoUsuario;
  rol?: Rol;
}

function App() {
  // Estados principales
  const [usuario] = useState<Usuario>({
    id: '1',
    nombre: 'María González',
    tipo: 'tactico',
    rol: 'Research'
  });

  const [biblias, setBiblias] = useState<Biblia[]>([]);
  const [bibliaActiva, setBibliaActiva] = useState<Biblia | null>(null);
  const [componenteActivo, setComponenteActivo] = useState<Componente | null>(null);
  const [vistaActiva, setVistaActiva] = useState<'lectura' | 'edicion' | 'curacion'>('lectura');
  const [chatAbierto, setChatAbierto] = useState(false);

  // Cargar biblias al iniciar
  useEffect(() => {
    fetch('http://localhost:3001/api/biblias')
      .then(res => res.json())
      .then(data => {
        setBiblias(data);
        // Seleccionar la primera biblia por defecto
        if (data.length > 0) {
          cargarBiblia(data[0].id);
        }
      })
      .catch(err => console.error('Error cargando biblias:', err));
  }, []);

  // Función para cargar una biblia específica
  const cargarBiblia = (bibliaId: string) => {
    fetch(`http://localhost:3001/api/biblias/${bibliaId}`)
      .then(res => res.json())
      .then(data => {
        setBibliaActiva(data);
        // Seleccionar el primer componente
        if (data.componentes && data.componentes.length > 0) {
          setComponenteActivo(data.componentes[0]);
        }
      })
      .catch(err => console.error('Error cargando biblia:', err));
  };

  // Función para cambiar la vista
  const cambiarVista = (vista: 'lectura' | 'edicion' | 'curacion') => {
    setVistaActiva(vista);
  };

  // Función para alternar el chat
  const toggleChat = () => {
    setChatAbierto(!chatAbierto);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header del sidebar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-violet-600 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Violet Studio</h1>
              <p className="text-sm text-slate-500">Plataforma de Agentes IA</p>
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="p-4 border-b border-gray-200 bg-violet-50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-violet-200 rounded-full">
              <span className="text-sm font-medium text-violet-800">
                {usuario.nombre.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{usuario.nombre}</p>
              <p className="text-xs text-slate-500">{usuario.rol} • {usuario.tipo}</p>
            </div>
          </div>
        </div>

        {/* Controles de vista */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => cambiarVista('lectura')}
              className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                vistaActiva === 'lectura'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4 mx-auto mb-1" />
              Lectura
            </button>
            {usuario.tipo === 'curador' && (
              <button
                onClick={() => cambiarVista('edicion')}
                className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                  vistaActiva === 'edicion'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" />
                Edición
              </button>
            )}
            {usuario.tipo === 'curador' && (
              <button
                onClick={() => cambiarVista('curacion')}
                className={`flex-1 text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                  vistaActiva === 'curacion'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Users className="w-4 h-4 mx-auto mb-1" />
                Curación
              </button>
            )}
          </div>
        </div>

        {/* Sidebar principal */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar
            biblias={biblias}
            bibliaActiva={bibliaActiva}
            componenteActivo={componenteActivo}
            onBibliaSelect={cargarBiblia}
            onComponenteSelect={setComponenteActivo}
            usuario={usuario}
          />
        </div>

        {/* Botón de chat */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={toggleChat}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              chatAbierto
                ? 'bg-violet-100 text-violet-700 border border-violet-200'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{chatAbierto ? 'Cerrar Chat' : 'Abrir Chat IA'}</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex">
        {/* Panel principal */}
        <div className={`flex-1 ${chatAbierto ? 'mr-96' : ''} transition-all duration-300`}>
          {vistaActiva === 'lectura' && (
            <LibroVivo
              biblia={bibliaActiva}
              componente={componenteActivo}
              usuario={usuario}
            />
          )}
          {vistaActiva === 'edicion' && bibliaActiva && componenteActivo && (
            <LibroVivo
              biblia={bibliaActiva}
              componente={componenteActivo}
              usuario={usuario}
              modoEdicion={true}
              onComponenteUpdate={(componente: Componente) => {
                setComponenteActivo(componente);
                // Actualizar en la biblia también
                if (bibliaActiva) {
                  const nuevasBiblias = biblias.map(b => {
                    if (b.id === bibliaActiva.id) {
                      return {
                        ...b,
                        componentes: b.componentes?.map(c => 
                          c.id === componente.id ? componente : c
                        )
                      };
                    }
                    return b;
                  });
                  setBiblias(nuevasBiblias);
                }
              }}
            />
          )}
          {vistaActiva === 'curacion' && (
            <PanelCuracion
              biblias={biblias}
              usuario={usuario}
              onBibliaUpdate={(biblia: Biblia) => {
                setBiblias(biblias.map(b => b.id === biblia.id ? biblia : b));
                if (bibliaActiva?.id === biblia.id) {
                  setBibliaActiva(biblia);
                }
              }}
            />
          )}
        </div>

        {/* Chat contextual */}
        {chatAbierto && (
          <div className="w-96 bg-white border-l border-gray-200 fixed right-0 top-0 h-full z-10">
            <ChatContextual
              usuario={usuario}
              contexto={bibliaActiva ? `${bibliaActiva.rol.toLowerCase()}_${bibliaActiva.servicio.toLowerCase()}` : ''}
              componente={componenteActivo}
              onClose={() => setChatAbierto(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
