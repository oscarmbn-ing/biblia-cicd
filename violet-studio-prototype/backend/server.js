const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datos mockup
let biblias = {
  "research_litigios": {
    id: "research_litigios",
    rol: "Research",
    servicio: "Litigios",
    titulo: "Biblia Research - Litigios",
    componentes: [
      {
        id: "1",
        titulo: "Proceso de Kickoff - Caso Journey",
        textoVectorizado: "El proceso de Kickoff para Caso Journey en litigios requiere una preparación meticulosa que incluye la revisión del contexto legal, identificación de stakeholders clave y establecimiento de objetivos claros para la sesión.\n\nPasos principales:\n1. Preparación del contexto legal\n2. Identificación de participantes\n3. Definición de objetivos\n4. Estructuración del tablero\n5. Facilitación de la sesión",
        version: "1.2.0",
        autor: "María González",
        fechaEdicion: "2024-01-15",
        estado: "Validado",
        feedback: [
          {
            id: "f1",
            tipo: "incompleto",
            comentario: "Falta información sobre qué hacer cuando hay conflictos entre stakeholders",
            usuario: "Carlos Researcher",
            fecha: "2024-01-10"
          }
        ],
        historial: [
          {
            version: "1.1.0",
            autor: "María González",
            fecha: "2024-01-01",
            motivo: "Actualización basada en feedback de Q4 2023"
          }
        ]
      },
      {
        id: "2",
        titulo: "Módulo Triggers - Acciones Automáticas",
        textoVectorizado: "Los triggers en litigios son eventos específicos que desencadenan acciones automáticas en el sistema. Cada trigger debe ser claramente definido con su respectiva acción y estado de implementación.\n\nTipos de triggers:\n- Tarea: Actividades específicas a realizar\n- Decisión: Puntos de decisión críticos\n- Evento Externo: Acciones iniciadas por terceros\n\nCada trigger debe incluir: descripción clara, acción automática asociada, sistema donde ocurre, propósito y estado actual.",
        version: "2.0.0",
        autor: "Luis Martínez",
        fechaEdicion: "2024-01-12",
        estado: "En Validación",
        feedback: [],
        historial: [
          {
            version: "1.0.0",
            autor: "Luis Martínez",
            fecha: "2023-12-15",
            motivo: "Primera versión del módulo triggers"
          }
        ]
      }
    ]
  },
  "design_litigios": {
    id: "design_litigios",
    rol: "Design",
    servicio: "Litigios",
    titulo: "Biblia Design - Litigios",
    componentes: [
      {
        id: "3",
        titulo: "Principios de Diseño UX para Casos Legales",
        textoVectorizado: "El diseño de experiencias para casos legales debe priorizar la claridad, accesibilidad y trazabilidad. Los usuarios necesitan interfaces intuitivas que reduzcan la carga cognitiva en procesos complejos.\n\nPrincipios fundamentales:\n1. Claridad en la información legal\n2. Navegación intuitiva\n3. Feedback inmediato\n4. Accesibilidad universal\n5. Trazabilidad de acciones",
        version: "1.0.0",
        autor: "Ana Diseñadora",
        fechaEdicion: "2024-01-08",
        estado: "Validado",
        feedback: [],
        historial: []
      }
    ]
  }
};

let conversaciones = [];

// Rutas API

// Obtener todas las biblias disponibles
app.get('/api/biblias', (req, res) => {
  const resumen = Object.values(biblias).map(biblia => ({
    id: biblia.id,
    rol: biblia.rol,
    servicio: biblia.servicio,
    titulo: biblia.titulo,
    totalComponentes: biblia.componentes.length
  }));
  res.json(resumen);
});

// Obtener una biblia específica
app.get('/api/biblias/:id', (req, res) => {
  const biblia = biblias[req.params.id];
  if (!biblia) {
    return res.status(404).json({ error: 'Biblia no encontrada' });
  }
  res.json(biblia);
});

// Obtener componente específico
app.get('/api/biblias/:bibliaId/componentes/:componenteId', (req, res) => {
  const biblia = biblias[req.params.bibliaId];
  if (!biblia) {
    return res.status(404).json({ error: 'Biblia no encontrada' });
  }
  
  const componente = biblia.componentes.find(c => c.id === req.params.componenteId);
  if (!componente) {
    return res.status(404).json({ error: 'Componente no encontrado' });
  }
  
  res.json(componente);
});

// Actualizar componente (para curadores)
app.put('/api/biblias/:bibliaId/componentes/:componenteId', (req, res) => {
  const biblia = biblias[req.params.bibliaId];
  if (!biblia) {
    return res.status(404).json({ error: 'Biblia no encontrada' });
  }
  
  const componente = biblia.componentes.find(c => c.id === req.params.componenteId);
  if (!componente) {
    return res.status(404).json({ error: 'Componente no encontrado' });
  }
  
  // Guardar en historial
  componente.historial.push({
    version: componente.version,
    autor: componente.autor,
    fecha: componente.fechaEdicion,
    motivo: req.body.motivo || "Actualización"
  });
  
  // Actualizar componente
  componente.textoVectorizado = req.body.textoVectorizado;
  componente.autor = req.body.autor;
  componente.fechaEdicion = new Date().toISOString().split('T')[0];
  componente.estado = "En Validación";
  
  // Incrementar versión
  const versionParts = componente.version.split('.');
  versionParts[1] = parseInt(versionParts[1]) + 1;
  componente.version = versionParts.join('.');
  
  res.json(componente);
});

// Validar componente (marcar como validado)
app.post('/api/biblias/:bibliaId/componentes/:componenteId/validar', (req, res) => {
  const biblia = biblias[req.params.bibliaId];
  if (!biblia) {
    return res.status(404).json({ error: 'Biblia no encontrada' });
  }
  
  const componente = biblia.componentes.find(c => c.id === req.params.componenteId);
  if (!componente) {
    return res.status(404).json({ error: 'Componente no encontrado' });
  }
  
  componente.estado = "Validado";
  res.json(componente);
});

// Enviar feedback
app.post('/api/biblias/:bibliaId/componentes/:componenteId/feedback', (req, res) => {
  const biblia = biblias[req.params.bibliaId];
  if (!biblia) {
    return res.status(404).json({ error: 'Biblia no encontrada' });
  }
  
  const componente = biblia.componentes.find(c => c.id === req.params.componenteId);
  if (!componente) {
    return res.status(404).json({ error: 'Componente no encontrado' });
  }
  
  const feedback = {
    id: uuidv4(),
    tipo: req.body.tipo,
    comentario: req.body.comentario,
    usuario: req.body.usuario,
    fecha: new Date().toISOString().split('T')[0]
  };
  
  componente.feedback.push(feedback);
  res.json(feedback);
});

// Chat con agente IA (mockup)
app.post('/api/chat', (req, res) => {
  const { mensaje, contexto, usuario } = req.body;
  
  // Simulación de respuesta del agente basada en contexto
  let respuesta = "";
  
  if (contexto.includes("research") && contexto.includes("litigios")) {
    if (mensaje.toLowerCase().includes("kickoff")) {
      respuesta = "Para un Kickoff de Caso Journey en Litigios, te recomiendo seguir estos pasos:\n\n1. **Preparación**: Revisa el contexto legal del caso\n2. **Stakeholders**: Identifica todos los participantes clave\n3. **Objetivos**: Define metas claras para la sesión\n4. **Tablero**: Estructura la información de forma visual\n5. **Facilitación**: Conduce la sesión manteniendo el foco\n\n¿Te gustaría que profundice en alguno de estos pasos?";
    } else if (mensaje.toLowerCase().includes("triggers")) {
      respuesta = "Los triggers en litigios son fundamentales para automatizar acciones. Recuerda que cada trigger debe tener:\n\n- **Descripción clara** del evento\n- **Tipo** (Tarea, Decisión, Evento Externo)\n- **Acción automática** asociada\n- **Sistema** donde se ejecuta\n- **Estado** de implementación\n\n¿Necesitas ayuda para definir un trigger específico?";
    } else {
      respuesta = "Como tu agente Research especializado en Litigios, puedo ayudarte con metodologías de investigación, preparación de Kickoffs, definición de triggers y análisis de casos. ¿En qué te puedo asistir específicamente?";
    }
  } else if (contexto.includes("design")) {
    respuesta = "Como agente de Design, puedo ayudarte con principios de UX para casos legales, patrones de interfaz, y mejores prácticas de diseño centrado en el usuario. ¿Qué aspecto del diseño te interesa explorar?";
  } else {
    respuesta = "Hola, soy tu asistente de IA especializado. Para brindarte la mejor ayuda, ¿podrías especificar tu rol y el servicio en el que estás trabajando?";
  }
  
  const conversacion = {
    id: uuidv4(),
    usuario: usuario,
    mensaje: mensaje,
    respuesta: respuesta,
    contexto: contexto,
    timestamp: new Date().toISOString()
  };
  
  conversaciones.push(conversacion);
  
  res.json({
    respuesta: respuesta,
    id: conversacion.id
  });
});

// Obtener historial de conversaciones
app.get('/api/chat/historial', (req, res) => {
  res.json(conversaciones.slice(-20)); // últimas 20 conversaciones
});

// Probatón (prueba de curador)
app.post('/api/probaton', (req, res) => {
  const { pregunta, componenteId, bibliaId } = req.body;
  
  // Simulación de respuesta basada en el componente
  const biblia = biblias[bibliaId];
  const componente = biblia?.componentes.find(c => c.id === componenteId);
  
  let respuesta = "Respuesta basada en el contenido del componente: ";
  if (componente) {
    // Simular análisis del texto vectorizado
    if (pregunta.toLowerCase().includes("kickoff")) {
      respuesta += "Según el contenido validado, el proceso de Kickoff requiere 5 pasos principales que están documentados en el componente.";
    } else {
      respuesta += "La información solicitada está disponible en el texto vectorizado del componente.";
    }
  } else {
    respuesta = "No se pudo acceder al componente para generar la respuesta.";
  }
  
  res.json({
    pregunta: pregunta,
    respuesta: respuesta,
    componenteReferencia: componenteId,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Violet Studio Backend mockup ejecutándose en http://localhost:${PORT}`);
  console.log(`📚 Biblias disponibles: ${Object.keys(biblias).length}`);
});