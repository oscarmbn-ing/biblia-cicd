# 📗 🔧 Biblia de Entornos de Desarrollo - Lexy

**Autor:** Consejo Catedral  
**Estado:** Versión 1.0  
**Fecha de Creación:** 4 de junio de 2025  
**Última Actualización:** [Fecha Stack & Flow Day]  
**Tags:** Biblia, Entornos, Desarrollo, Infraestructura, CI/CD  

---

# **1. 🧠 Introducción**

## **1.1. 🌟 Propósito y Contexto del Stack & Flow Day**

### **1.1.1 Origen de esta Biblia**

> Esta Biblia surge de las determinaciones tomadas durante el **Stack & Flow Day del 4 de junio de 2025**, una jornada estratégica donde los equipos de **Ingeniería (Soft Dev)** y **TI & Infraestructura (Hard Dev)** definieron conscientemente nuestra "sala de máquinas" interna.
> 
> El Stack & Flow Day representó el momento decisivo para diseñar un sistema tecnológico tan eficiente, ágil y robusto como los productos que aspiramos a construir, alineando nuestra operación con la **Visión Lexy 2025**.

### **1.1.2 La Transformación de Lexy**

> La transformación de Lexy en una **desarrolladora de software legal** exige que nuestra capacidad tecnológica no solo soporte, sino que **acelere el negocio**. 
> 
> Esta biblia documenta las decisiones arquitectónicas y de entornos que permitirán:
> 
> ✅ **Ordenar la casa:** Estandarizar operaciones tecnológicas eliminando redundancias y deuda técnica  
> ✅ **Establecer claridades:** Definir flujos de trabajo y fronteras de responsabilidad entre equipos  
> ✅ **Acelerar el desarrollo:** Implementar rutas eficientes para funcionalidades ágiles y robustas  
> ✅ **Ser adaptables:** Alinear arquitectura y procesos con futuras exigencias de escalabilidad e IA  

## **1.2. ⚖️ Filosofía de Entornos en Lexy**

### **1.2.1 Principios Fundamentales**

> Nuestros entornos de desarrollo se fundamentan en tres principios clave:
> 
> **🔒 Separación Sin Rigidez:** Entornos diferenciados que permiten experimentación segura sin bloquear la innovación  
> **🏗️ Modularidad por Servicio:** Arquitectura que aísla servicios para escalabilidad y mantenimiento independiente  
> **🔄 Flujo Continuo:** Pipeline CI/CD que transforma ideas en valor de negocio de manera predecible  

### **1.2.2 El Concepto de "Biblia Viva"**

> Esta biblia no es un manual estático. Es una **memoria viva** que evoluciona con nuestras decisiones técnicas y aprendizajes operativos.
> 
> Su estructura modular permite que cada "chunk" de conocimiento sea:
> - Consultable independientemente
> - Vectorizable para agentes IA
> - Actualizable sin perder trazabilidad
> - Transferible a nuevos miembros del equipo

---

# **2. 🏗️ Arquitectura de Entornos**

## **2.1. 🎯 Definición de Entornos**

### **2.1.1 Los Tres Entornos Fundamentales**

> **DESARROLLO (DEV):**
> - Entorno donde los desarrolladores escriben y prueban código localmente
> - Conectado a bases de datos espejo para pruebas seguras
> - Permite experimentación sin impacto en otros entornos
> 
> **STAGING/TEST:**
> - Entorno que simula condiciones de producción
> - Validación final antes del despliegue
> - Pruebas de integración y rendimiento
> 
> **PRODUCCIÓN (PROD):**
> - Entorno operativo donde corren los servicios en vivo
> - Máxima estabilidad y disponibilidad
> - Monitoreo continuo y soporte permanente

### **2.1.2 Decisión Clave: ¿Siempre Tres Entornos?**

> **Respuesta del Consejo Catedral:** Sí, excepto para áreas de IA donde los cambios son más frecuentes.
> 
> **Para servicios estables:** Desarrollo → Test → Producción  
> **Para proyectos de IA:** Desarrollo → Producción (ciclos más rápidos de iteración)

## **2.2. 🌐 Arquitectura Modular por Servicio**

### **2.2.1 El Patrón de Instancias Separadas**

> **Decisión Arquitectónica:** Instancias separadas de servidores (S2) por cada flujo de negocio principal.
> 
> **Servicios Definidos:**
> - **Litigios:** Gestión de casos judiciales y escrituras públicas
> - **Salud:** Servicios de protección patrimonial y salud
> - **RN (Renegociación):** Procesos de renegociación y concursal
> - **Ventas:** Embudo comercial y captación
> - **Post-venta:** Gestión post-contratación y retención
> - **Marketing:** Campañas y comunicaciones masivas

### **2.2.2 Beneficios de la Segmentación**

> **🎯 Aislamiento de Fallas:** Si el backend de litigios se cae, otros servicios siguen operativos  
> **⚡ Optimización de Recursos:** Recursos asignados según demanda específica de cada servicio  
> **🔧 Mantenimiento Independiente:** Actualizaciones y experimentos sin afectar otros servicios  
> **📊 Monitoreo Granular:** Métricas y alertas específicas por servicio  

### **2.2.3 Arquitectura "Pseudomonolítica por Servicio"**

> **Patrón Arquitectónico Adoptado:** Vista-Controlador con separación por servicio
> 
> **Características:**
> - Cada servicio es internamente monolítico (vista-controlador)
> - Los servicios entre sí están separados y se comunican via API
> - Evita complejidad de microservicios completos
> - Permite evolución gradual hacia mayor modularidad

## **2.3. 🛡️ Componentes de Infraestructura**

### **2.3.1 S2 Validador**

> **Función:** Primer punto de entrada para solicitudes externas (Streak, Make, webhooks)
> 
> **Responsabilidades:**
> - Validación de requests entrantes
> - Enrutamiento a servicios específicos
> - Rate limiting y seguridad básica
> - Logging centralizado de accesos

### **2.3.2 Toolbox de Herramientas Transversales**

> **Concepto:** S2 dedicado a funciones que usan múltiples servicios
> 
> **Servicios del Toolbox:**
> - **Enviador de correos:** Servicio centralizado con templates por servicio
> - **Consultor de Nepal:** API para validación de causas judiciales
> - **Gestor de base de datos:** Operaciones CRUD comunes
> - **Integración con Bamb:** Conexiones de datos centralizadas
> - **Logs y monitoreo:** Servicios de observabilidad

### **2.3.3 Ventajas del Toolbox Centralizado**

> ✅ **Evita Replicación:** Una sola implementación de funciones comunes  
> ✅ **Mejora Trazabilidad:** Logs centralizados por tipo de operación  
> ✅ **Facilita Actualizaciones:** Cambios en un lugar benefician a todos los servicios  
> ✅ **Reduce Complejidad:** Servicios de negocio se enfocan en su lógica específica  

---

# **3. 💾 Gestión de Bases de Datos**

## **3.1. 🔄 Modelo de Base de Datos Espejo**

### **3.1.1 Decisión Fundamental: Espejo vs Docker**

> **Decisión del Consejo Catedral:** Base de datos espejo unidireccional de producción
> 
> **Razones de la Elección:**
> - **Volumen de datos legales:** Manejo eficiente de grandes volúmenes
> - **Complejidad reducida:** Menos overhead técnico que Docker por desarrollo
> - **Experiencia del equipo:** Alineado con habilidades actuales
> - **Tiempo de implementación:** Semanas vs meses para solución Docker
> - **Compliance:** Control y auditoría centralizados del acceso a datos

### **3.1.2 Funcionamiento del Espejo**

> **Proceso de Sincronización:**
> 1. **Backup programado:** Copia de seguridad de base de datos productiva
> 2. **Sobrescritura del espejo:** El backup reemplaza la base de desarrollo
> 3. **Frequency:** Sincronización semanal (viernes) con datos frescos
> 4. **Validación:** Verificación de integridad post-sincronización

### **3.1.3 Seguridad y Acceso**

> **Control de Acceso:**
> - Usuarios predefinidos con permisos específicos
> - Acceso solo a personal autorizado de desarrollo
> - Log de todas las consultas y modificaciones
> - Separación entre datos de clientes y datos internos

## **3.2. 🗂️ Separación de Datos Críticos**

### **3.2.1 Clasificación de Datos**

> **DATOS CRÍTICOS (Base Clientes/Servicio):**
> - Información personal de clientes
> - Datos financieros y de casos
> - Documentos legales
> - Comunicaciones confidenciales
> 
> **DATOS INTERNOS (Base Empresa):**
> - Configuraciones de sistema
> - Logs operativos
> - Métricas de rendimiento
> - Datos de empleados y operación

### **3.2.2 Estrategia de Backup y Recuperación**

> **Para Datos Críticos:**
> - Backup diario automatizado
> - Almacenamiento en múltiples ubicaciones
> - Pruebas regulares de recuperación
> - Cifrado en tránsito y en reposo
> 
> **Para Datos Internos:**
> - Backup semanal
> - Recuperación menos crítica
> - Posibilidad de reconstrucción desde logs

## **3.3. 🔮 Evolución Futura: Docker**

### **3.3.1 Roadmap de Migración**

> **Claude 4 recommendation:** "Docker más adelante, una vez consolidado el stack modular"
> 
> **Fases de Migración:**
> 1. **Fase Actual:** Base de datos espejo para estabilizar procesos
> 2. **Fase Intermedia:** Docker para nuevos microservicios experimentales
> 3. **Fase Avanzada:** Migración gradual de servicios establecidos

### **3.3.2 Criterios para la Migración**

> **Indicadores de Readiness:**
> - Stack modular consolidado y estable
> - Equipo con experiencia Docker suficiente
> - Procesos de CI/CD maduros
> - Herramientas de monitoreo robustas

---

# **4. 🔀 Flujos de Desarrollo**

## **4.1. 👥 Roles y Responsabilidades**

### **4.1.1 Software Dev (Ingeniería)**

> **Responsabilidades Principales:**
> - Recibir prototipo/diseño desde Legal Design
> - Desarrollar código según historias de usuario
> - Escribir documentación técnica
> - Realizar pruebas locales y unitarias
> - Crear Pull Requests con código funcional
> 
> **Entregables:**
> - **Prototipo funcional** documentado
> - **Repositorio** con rama de desarrollo
> - **Documentación** técnica completa
> - **Tests** unitarios y de integración

### **4.1.2 Hardware Dev (TI & Infraestructura)**

> **Responsabilidades Principales:**
> - Proporcionar entornos de desarrollo
> - Validar código antes de producción
> - Gestionar despliegues y configuraciones
> - Monitoreo y soporte en producción
> - Cumplimiento de estándares de arquitectura
> 
> **Entregables:**
> - **Entorno** configurado y funcional
> - **Validación** técnica de PRs
> - **Despliegue** a producción
> - **Monitoreo** y alertas configuradas

## **4.2. 📦 Entregables Entre Áreas**

### **4.2.1 De Software a Hardware**

> **Prototipo Funcional:**
> - Código que cumple historias de usuario
> - No rompe funcionalidad existente
> - Está testeado en entorno local/test
> - Cumple normas de arquitectura definidas
> 
> **Documentación Obligatoria:**
> - Resumen ejecutivo de la funcionalidad
> - Parámetros de entrada y salida
> - Dependencias y configuraciones
> - Instrucciones de despliegue

### **4.2.2 De Hardware a Software**

> **Repositorio Configurado:**
> - Estructura de carpetas establecida
> - Rama main protegida
> - Configuración de entorno incluida
> - Acceso a base de datos espejo
> 
> **Documentación del Entorno:**
> - Variables de entorno necesarias
> - Configuración de dependencias
> - Instrucciones de setup local
> - Endpoints y servicios disponibles

## **4.3. 🔄 Ciclos de Feedback**

### **4.3.1 Frecuencia y Triggers**

> **Activación de Feedback:**
> - Al completar cada entregable (Pull Request)
> - En reuniones de sprint planning
> - Post-despliegue en cualquier entorno
> - Detección de problemas en producción

### **4.3.2 Métricas de Feedback**

> **Datos a Capturar:**
> - Tiempo de desarrollo por historia
> - Número de bugs detectados por fase
> - Tiempo de resolución de incidencias
> - Cumplimiento de estándares de código
> 
> **Uso de Métricas:**
> - Mejora de estimaciones futuras
> - Identificación de cuellos de botella
> - Optimización de procesos
> - Formación dirigida del equipo

---

# **5. 🛠️ Herramientas y Stack Tecnológico**

## **5.1. 📚 Control de Versiones**

### **5.1.1 Gestión de Repositorios**

> **Principio:** Un repositorio por servicio, ramas por funcionalidad
> 
> **Estructura de Repositorios:**
> ```
> lexy-litigios/
> ├── main (protegida)
> ├── desarrollo
> ├── feature/nueva-funcionalidad
> └── hotfix/correccion-urgente
> ```
> 
> **Flujo de Ramas:**
> 1. Crear rama desde `desarrollo`
> 2. Implementar funcionalidad
> 3. Pull Request hacia `desarrollo`
> 4. Review y merge
> 5. Deploy desde `main`

### **5.1.2 Criterios de Pull Request**

> **Checklist Obligatorio:**
> ✅ Código cumple historias de usuario  
> ✅ No rompe funcionalidad existente  
> ✅ Incluye tests unitarios  
> ✅ Documentación actualizada  
> ✅ Cumple estándares de arquitectura  
> ✅ Revisión de security básica  

## **5.2. 🔧 Automatización y Integraciones**

### **5.2.1 N8N: El Hub de Automatización**

> **Rol Central:** N8N se mantiene como plataforma principal de automatización
> 
> **Capacidades:**
> - Integración entre servicios internos
> - Conexión con herramientas externas (Streak, Bamb)
> - Workflows de notificaciones
> - Procesamiento de datos entre sistemas
> 
> **Ventajas sobre Make:**
> - Autohosted (control total)
> - Más económico a escala
> - Integración nativa con nuestro stack
> - Posibilidad de extraer código para migración

### **5.2.2 Plan de Migración desde Make**

> **Estado Actual:** Múltiples escenarios en Make con costos elevados
> 
> **Estrategia de Migración:**
> 1. **Mapeo:** Inventario completo de escenarios Make actuales
> 2. **Priorización:** Por costo, criticidad y frecuencia de uso
> 3. **Migración gradual:** Escenario por escenario a N8N
> 4. **Validación:** Pruebas en paralelo antes de desactivar Make
> 5. **Deprecación:** Eliminación gradual de dependencias Make

### **5.2.3 Gestión de Lambdas Legacy**

> **Problema Identificado:** "Hay más lambdas que personas" - gestión caótica
> 
> **Solución Propuesta:**
> - **Auditoría:** Mapeo de todos los lambdas existentes
> - **Consolidación:** Migrar lógica a N8N o servicios principales
> - **Documentación:** Cada lambda debe tener propietario y documentación
> - **Sunset:** Plan de deprecación para lambdas redundantes

## **5.3. 🏗️ Infraestructura como Código**

### **5.3.1 Configuración de Servidores**

> **Decisión de Hosting:** Digital Ocean como proveedor principal
> 
> **Configuración Estándar por S2:**
> - **S2 Validador:** 2GB RAM, 1 CPU, SSD 50GB
> - **S2 Servicios:** 4GB RAM, 2 CPU, SSD 80GB según demanda
> - **S2 Toolbox:** 2GB RAM, 1 CPU, SSD 60GB
> - **Base de Datos:** Instancia separada, backup automatizado

### **5.3.2 Configuración de Red y Seguridad**

> **Proxy y Enrutamiento:**
> - Nginx como proxy reverso
> - SSL/TLS para todas las conexiones
> - Rate limiting por servicio
> - Logs centralizados en S2 Toolbox

---

# **6. 📋 Estándares y Governance**

## **6.1. 🏛️ Normas de Arquitectura**

### **6.1.1 Estándares Técnicos Definidos**

> **Arquitectura Base:** Vista-Controlador pseudomonolítica por servicio
> 
> **Reglas Obligatorias:**
> - **ORM Obligatorio:** No queries directas a base de datos
> - **Estructura MVC:** Separación clara de responsabilidades
> - **API RESTful:** Para comunicación entre servicios
> - **Documentación:** README y comentarios en código
> - **Testing:** Cobertura mínima de tests unitarios

### **6.1.2 El "Guardián de la Arquitectura"**

> **Rol Definido:** Persona dedicada a mantener estándares arquitectónicos
> 
> **Responsabilidades:**
> - Revisar Pull Requests antes de merge
> - Validar cumplimiento de estándares
> - Rechazar código que no cumple criterios
> - Mentorear equipo en buenas prácticas
> - Actualizar y evolucionar estándares
> 
> **Autoridad:** Poder de veto sobre despliegues que no cumplan estándares

### **6.1.3 Codificación de Estándares**

> **Necesidad Identificada:** Convertir conocimiento tácito en documentación explícita
> 
> **Plan de Codificación:**
> 1. **Captura:** Documentar estándares actuales del equipo
> 2. **Formalización:** Crear guías escritas detalladas
> 3. **Vectorización:** Preparar para consumo por agentes IA
> 4. **Validación:** Pruebas con casos reales
> 5. **Evolución:** Actualización continua basada en aprendizajes

## **6.2. 🔒 Security y Compliance**

### **6.2.1 Rol de Security (Necesidad Urgente)**

> **Diagnóstico:** "Security es una carrera" - no se puede improvisar
> 
> **Perfil Requerido:**
> - Mínimo 2 años de experiencia especializada
> - Actualización continua en vulnerabilidades
> - Capacidad de auditoría de código
> - Conocimiento en compliance legal
> 
> **Responsabilidades:**
> - Auditoría de seguridad de código
> - Configuración de políticas de acceso
> - Jornadas de hacking ético interno
> - Compliance con regulaciones legales

### **6.2.2 Buenas Prácticas de Seguridad**

> **Estándares Mínimos:**
> - Cifrado de datos en tránsito y reposo
> - Autenticación de dos factores
> - Logs de acceso y auditoría
> - Principio de menor privilegio
> - Revisión regular de permisos

## **6.3. 📊 Monitoreo y Observabilidad**

### **6.3.1 Métricas Clave**

> **Métricas de Sistema:**
> - Tiempo de respuesta por servicio
> - Uso de CPU y memoria por S2
> - Número de requests por minuto
> - Tasa de errores por endpoint
> 
> **Métricas de Negocio:**
> - Tiempo de procesamiento de casos
> - Tasa de éxito de automatizaciones
> - Disponibilidad de servicios críticos
> - Tiempo de resolución de incidencias

### **6.3.2 Alertas y Escalamiento**

> **Niveles de Alerta:**
> - **INFO:** Eventos normales de operación
> - **WARNING:** Degradación de rendimiento
> - **ERROR:** Fallas que requieren intervención
> - **CRITICAL:** Servicios caídos o datos en riesgo
> 
> **Escalamiento:**
> 1. Alerta automática a equipo de guardia
> 2. Notificación a Hard Dev responsible
> 3. Escalamiento a Soft Dev si es bug de código
> 4. Notificación a management si impacto crítico

---

# **7. 🔄 Migración y Evolución**

## **7.1. 📦 Plan de Migración Legacy**

### **7.1.1 Estrategia de "Muda"**

> **Concepto:** Migración sistemática de sistemas antiguos al nuevo stack
> 
> **Fases de Migración:**
> 1. **Mapeo completo:** Inventario de todos los sistemas actuales
> 2. **Priorización:** Por costo, riesgo y criticidad
> 3. **Migración gradual:** Sistema por sistema
> 4. **Validación:** Comparación de resultados
> 5. **Deprecación:** Apagado seguro de sistemas antiguos

### **7.1.2 Criterios de Priorización**

> **Alta Prioridad:**
> - Sistemas con alto costo mensual (Make, Zapier)
> - Servicios con fallas frecuentes
> - Integraciones críticas para el negocio
> - Sistemas que bloquean otros desarrollos
> 
> **Baja Prioridad:**
> - Sistemas estables y de bajo costo
> - Automatizaciones de uso esporádico
> - Integraciones que funcionan sin intervención

### **7.1.3 Rol del "Minion de Migración"**

> **Perfil Definido:** Desarrollador junior dedicado exclusivamente a migración
> 
> **Responsabilidades:**
> - Analizar sistema legacy asignado
> - Documentar funcionalidad actual
> - Implementar equivalente en nuevo stack
> - Validar funcionamiento en paralelo
> - Migrar datos si es necesario
> 
> **Supervisión:** Liderado por miembro senior durante onboarding inicial

## **7.2. 🔮 Roadmap de Evolución**

### **7.2.1 Corto Plazo (1-3 meses)**

> **Objetivos Inmediatos:**
> ✅ Implementar base de datos espejo funcional  
> ✅ Migrar 3 escenarios críticos de Make a N8N  
> ✅ Establecer S2 Validador básico  
> ✅ Documentar estándares de arquitectura actuales  
> ✅ Contratar rol de Security  

### **7.2.2 Mediano Plazo (3-6 meses)**

> **Expansión del Sistema:**
> ✅ Completar migración de Make (80% de escenarios)  
> ✅ Implementar S2 Toolbox completo  
> ✅ Establecer "Guardián de Arquitectura" permanente  
> ✅ Automatizar despliegues básicos  
> ✅ Implementar monitoreo robusto  

### **7.2.3 Largo Plazo (6+ meses)**

> **Madurez del Sistema:**
> ✅ Migración completa de sistemas legacy  
> ✅ Implementación gradual de Docker  
> ✅ CI/CD completamente automatizado  
> ✅ Agentes IA integrados en workflow  
> ✅ Capacity planning automatizado  

---

# **8. 🏛️ Consejo Catedral**

## **8.1. 🎯 Governance Técnica**

### **8.1.1 Origen del Consejo Catedral**

> **Concepto:** Órgano de gobierno técnico inspirado en la construcción de catedrales
> 
> **Metáfora:** Como Pedro puso la primera piedra de la Iglesia, el Consejo Catedral establece los fundamentos arquitectónicos de Lexy
> 
> **Propósito:** Tomar decisiones técnicas estratégicas con visión de largo plazo

### **8.1.2 Composición del Consejo**

> **Miembros Permanentes:**
> - Tech Lead (Presidente del Consejo)
> - Guardián de la Arquitectura
> - Líder Hard Dev
> - Líder Soft Dev
> - Security Officer (cuando se contrate)
> 
> **Miembros Consultativos:**
> - Product Manager senior
> - Legal Designer lead
> - CEO (para decisiones estratégicas)

### **8.1.3 Autoridad y Responsabilidades**

> **Decisiones del Consejo:**
> - Evolución de arquitectura técnica
> - Adopción de nuevas tecnologías
> - Estándares de desarrollo y despliegue
> - Priorización de migraciones técnicas
> - Resolución de conflictos técnicos
> 
> **Proceso de Decisión:**
> 1. Propuesta documentada con contexto
> 2. Discusión en sesión del Consejo
> 3. Decisión por consenso o voto
> 4. Documentación en esta Biblia
> 5. Comunicación a equipos

## **8.2. 📋 Reuniones y Procesos**

### **8.2.1 Frecuencia de Reuniones**

> **Reuniones Regulares:**
> - **Semanal:** Revisión de progreso y issues menores
> - **Mensual:** Decisiones estratégicas y roadmap
> - **Trimestral:** Evaluación de arquitectura y evolución
> - **Ad-hoc:** Para decisiones urgentes o conflictos

### **8.2.2 Documentación de Decisiones**

> **Registro Obligatorio:**
> - Contexto de la decisión
> - Opciones consideradas
> - Criterios de evaluación
> - Decisión tomada y justificación
> - Impacto esperado
> - Fecha de revisión programada
> 
> **Almacenamiento:** Todas las decisiones se documentan en esta Biblia con versionado completo

### **8.2.3 Proceso de Escalamiento**

> **Flujo de Escalamiento:**
> 1. **Nivel 1:** Equipos resuelven issues técnicos cotidianos
> 2. **Nivel 2:** Guardián de Arquitectura para estándares
> 3. **Nivel 3:** Consejo Catedral para decisiones estratégicas
> 4. **Nivel 4:** CEO para impacto en negocio o inversión mayor

---

# **9. 📚 Apéndices y Referencias**

## **9.1. 🔧 Configuraciones de Referencia**

### **9.1.1 Variables de Entorno Estándar**

```bash
# Configuración base para servicios
SERVICE_NAME=litigios
ENVIRONMENT=desarrollo
DATABASE_URL=postgresql://user:pass@db-espejo:5432/lexy_dev
API_BASE_URL=https://api-dev.lexy.cl
N8N_WEBHOOK_URL=https://n8n.lexy.cl/webhook
LOG_LEVEL=debug
```

### **9.1.2 Estructura de Directorios**

```
/proyecto-servicio/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── views/
│   └── utils/
├── tests/
├── docs/
├── config/
├── .env.example
├── README.md
└── requirements.txt
```

## **9.2. 📖 Glosario de Términos**

> **Biblia:** Documentación viva y vectorizable que contiene conocimiento estructurado
> 
> **Consejo Catedral:** Órgano de gobierno técnico para decisiones arquitectónicas
> 
> **Guardián de la Arquitectura:** Rol dedicado a mantener estándares de código y diseño
> 
> **Hard Dev:** Equipo de TI & Infraestructura, responsable de entornos y despliegues
> 
> **Muda:** Proceso de migración de sistemas legacy al nuevo stack tecnológico
> 
> **S2:** Instancia de servidor dedicada a un servicio específico
> 
> **Soft Dev:** Equipo de Ingeniería, responsable de desarrollo de código
> 
> **Stack & Flow Day:** Jornada estratégica para definir arquitectura y procesos técnicos
> 
> **Toolbox:** Conjunto de servicios transversales compartidos entre servicios

## **9.3. 📞 Contactos y Responsables**

> **Guardián de la Arquitectura:** [Por definir]  
> **Líder Hard Dev:** Gastón  
> **Líder Soft Dev:** [Por definir]  
> **Security Officer:** [Por contratar]  
> **Tech Lead:** [Por definir]  

---

# **10. 🔄 Control de Versiones de esta Biblia**

## **10.1. 📋 Historial de Cambios**

> **v1.0 - Stack & Flow Day (4 Jun 2025)**
> - Creación inicial basada en decisiones del Stack & Flow Day
> - Definición de arquitectura modular por servicio
> - Establecimiento del Consejo Catedral
> - Documentación de flujos Soft Dev ↔ Hard Dev
> 
> **v1.1 - [Fecha próxima actualización]**
> - [Actualizaciones por determinar]

## **10.2. 🎯 Próximas Actualizaciones Planificadas**

> **Pendientes de Documentación:**
> - Detalles específicos de configuración de N8N
> - Guía completa de migración Make → N8N
> - Protocolos específicos de security
> - Métricas y KPIs definidos por servicio
> - Proceso detallado de onboarding de minions

## **10.3. 📝 Contribuciones**

> **Cómo Actualizar esta Biblia:**
> 1. Proponer cambio en reunión del Consejo Catedral
> 2. Documentar contexto y justificación
> 3. Obtener aprobación del Consejo
> 4. Actualizar sección correspondiente
> 5. Incrementar versión y documentar cambio
> 6. Comunicar actualización a equipos

---

**Esta Biblia es un documento vivo que evoluciona con nuestras decisiones técnicas y aprendizajes operativos. Su propósito es ser la fuente de verdad para nuestros entornos de desarrollo y el legado arquitectónico del Stack & Flow Day.**