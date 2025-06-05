# 🧠 Violet Studio - Prototipo Fase 1

**Plataforma de Agentes IA y Gestión del Conocimiento**

Este es un prototipo funcional de alta fidelidad de la **Fase 1** de Violet Studio, la plataforma de agentes IA especializada para Lexy. El sistema implementa los conceptos fundamentales definidos en la "Biblia de la Interfaz de Agentes de IA".

## 📋 Características Implementadas

### 🏗️ Arquitectura Modular
- **Organización por Rol + Servicio**: Research/Design × Litigios/Concursal
- **Bases de conocimiento independientes** para cada combinación
- **Agentes IA especializados** por contexto

### 📚 Libro Vivo
- **Vista de lectura** optimizada para comprensión humana
- **Editor de contenido** con usabilidad dual (humano/máquina)
- **Sistema de versionado** y trazabilidad completa
- **Historial de cambios** con motivos y autores

### 🤖 Chat Contextual con IA
- **Agentes especializados** por Rol + Servicio
- **Modo Probatón** para curadores (testing de agentes)
- **Respuestas contextuales** basadas en conocimiento curado
- **Sugerencias inteligentes** según el contexto

### 🔄 Sistema de Retroalimentación
- **Feedback inmediato** (✅ Útil, ❌ Incorrecto, 🛠️ Incompleto)
- **Captura de comentarios** detallados
- **Gestión de feedback** para curadores

### 👥 Panel de Curación
- **Dashboard especializado** para Líderes de Consejo
- **Priorización automática** basada en feedback
- **Validación de componentes** en tiempo real
- **Estadísticas de curación** y métricas

### 🔐 Roles y Permisos
- **Usuario Táctico**: Lectura, chat, feedback
- **Curador**: Edición, validación, probatones
- **CEO**: Supervisión y auditoría

## 🛠️ Stack Técnico

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía
- **Vite** como bundler

### Backend (Mockup)
- **Node.js** + Express
- **APIs REST** completas
- **Datos simulados** realistas
- **CORS** habilitado

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm o yarn

### 1. Clonar e instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Ejecutar el backend mockup

```bash
cd backend
npm start
```

El servidor se ejecutará en `http://localhost:3001`

### 3. Ejecutar el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📊 Datos de Prueba

El sistema incluye datos mockup realistas:

### Biblias Disponibles
- **Research + Litigios**: Metodologías de investigación legal
- **Design + Litigios**: Principios UX para casos legales

### Componentes de Ejemplo
1. **Proceso de Kickoff - Caso Journey**
   - Estado: Validado
   - Feedback disponible
   - Historial de versiones

2. **Módulo Triggers - Acciones Automáticas** 
   - Estado: En Validación
   - Listo para curación

3. **Principios de Diseño UX para Casos Legales**
   - Estado: Validado
   - Sin feedback pendiente

## 🎯 Flujos de Usuario Demostrados

### Para Usuarios Tácticos (Research/Design)
1. **Navegación**: Seleccionar Biblia → Componente
2. **Lectura**: Consultar conocimiento estructurado
3. **Chat IA**: Interactuar con agente especializado
4. **Feedback**: Marcar utilidad y reportar problemas

### Para Curadores (Líderes de Consejo)
1. **Curación**: Gestionar feedback pendiente
2. **Edición**: Actualizar contenido con versionado
3. **Validación**: Aprobar componentes para vectorización
4. **Probatones**: Probar agentes en modo curador

## 🧪 APIs Implementadas

### Biblias
- `GET /api/biblias` - Listar todas las biblias
- `GET /api/biblias/:id` - Obtener biblia específica

### Componentes
- `GET /api/biblias/:bibliaId/componentes/:componenteId`
- `PUT /api/biblias/:bibliaId/componentes/:componenteId`
- `POST /api/biblias/:bibliaId/componentes/:componenteId/validar`

### Feedback
- `POST /api/biblias/:bibliaId/componentes/:componenteId/feedback`

### Chat IA
- `POST /api/chat` - Chat con agente IA
- `POST /api/probaton` - Modo probatón para curadores

## 🎨 Diseño y UX

### Principios Implementados
- **Claridad Modular**: Navegación intuitiva por Rol+Servicio
- **Usabilidad Dual**: Contenido legible y estructurable
- **Transparencia en IA**: Respuestas contextuales claras
- **Retroalimentación Fluida**: Sistema ✅❌🛠️ integrado

### Componentes de UI
- **Sistema de colores** coherente con marca Violet
- **Iconografía consistente** con Lucide
- **Animaciones sutiles** para feedback visual
- **Responsive design** adaptativo

## 🔮 Próximos Pasos (Fase 2+)

- [ ] **Motor de vectorización** real con embeddings
- [ ] **Base de datos vectorial** (Pinecone/Chroma)
- [ ] **LLM integration** con OpenAI/Anthropic
- [ ] **Autenticación** y gestión de usuarios
- [ ] **BibliaFlow** - Sistema de colaboración tipo Git
- [ ] **Integraciones externas** (Lucid, Figma, CRM)
- [ ] **Analytics avanzados** y métricas de uso

## 📝 Conceptos Clave Implementados

### De la Biblia Original
- ✅ **Modularidad Rol+Servicio**
- ✅ **Libro Vivo** como interfaz central
- ✅ **Chat Contextual** especializado
- ✅ **Sistema de Retroalimentación** continuo
- ✅ **Curación Humana** como filtro editorial
- ✅ **Trazabilidad** completa del conocimiento
- ✅ **Usabilidad Dual** para humanos y máquinas

### Roles de Usuario
- ✅ **Researcher** (Usuario Táctico)
- ✅ **Designer** (Usuario Táctico)  
- ✅ **Curador** (Líder de Consejo)
- ✅ **CEO** (Supervisión estratégica)

## 🤝 Contribución

Este es un prototipo de demostración. Para contribuir:

1. Revisar la [Biblia de la Interfaz de Agentes de IA](../Biblia%20de%20la%20Interfaz%20de%20Agentes%20de%20IA.md)
2. Entender la arquitectura modular Rol+Servicio
3. Seguir los principios de UX/UI establecidos
4. Mantener la coherencia con la visión de Violet Studio

## 📄 Licencia

Prototipo interno para Lexy - Todos los derechos reservados.

---

**Desarrollado con 💜 siguiendo la visión de transformación digital de Lexy como desarrolladora de software legal centrada en experiencia y automatización.**