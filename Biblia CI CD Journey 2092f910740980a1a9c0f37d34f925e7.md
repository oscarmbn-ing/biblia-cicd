# Biblia CI/CD Journey

Autor: Consejo Tech
Estado: En curso
Tags: Biblia

# **1. 🧠 Introducción**

## **1.1.🌟 Propósito**

Para cumplir nuestra misión de ser una **desarrolladora de software legal de vanguardia**, no basta con tener ideas brillantes; necesitamos un camino claro y robusto para llevarlas a la realidad. Una gran idea sin un flujo definido es solo una buena intención.

**El código excepcional no nace del caos, se forja con disciplina, claridad y colaboración.**

Esta biblia tiene como objetivo definir y estandarizar nuestro **viaje de desarrollo y despliegue continuo (CI/CD)**. Es el manual que articula cada etapa, desde la concepción de una solución hasta su operación y mejora en producción.

Formaliza el pacto de colaboración y las responsabilidades entre **Ingeniería/Soft Dev)** y **TI & Infraestructura/Hard Dev**, asegurando que cada equipo conozca su rol, sus entregables y cómo su trabajo impulsa al siguiente.

Con esta biblia, buscamos eliminar la ambigüedad, acelerar nuestros ciclos de entrega y construir una maquinaria tecnológica que sea predecible, escalable y una ventaja competitiva decisiva. **Convertimos el 'cómo' en nuestro súper poder.**

## **1.2.🗺️ El Mapa de Nuestro Viaje CI/CD**

El camino de un desarrollo en Lexy, desde su inicio hasta su despliegue en producción, se estructura a través de un pipeline de etapas bien definidas, las cuales son fundamentales para la **transformación de Lexy en una desarrolladora de software legal** y para **acelerar el negocio**. Este diseño de flujo de trabajo se basa en la necesidad de **ordenar la casa**, **establecer claridades**, **acelerar el desarrollo** y **ser adaptables al nuevo Lexy**.

A continuación, se detalla el pipeline del camino de un desarrollo:

### **Etapa 1: Definición y Diseño (Ingeniería - Soft Dev)**

- **Punto de Partida y Documentación Inicial:** El proceso comienza con la **definición de entregables entre áreas**, lo que incluye especificaciones de API y mockups. El principal entregable del equipo de **Software al Hardware es un prototipo funcional** que viene acompañado de un **repositorio (repo)**. Para evitar un "caos de múltiples proyectos", si ya existe un repositorio y el proyecto es una modificación, **se entrega una rama de un repositorio existente** en lugar de un nuevo repositorio para cada proyecto. La **documentación detallada** que acompaña el código es necesaria, y esta **incluye un pequeño resumen de uso** y maquetas técnicas que permiten que el equipo de hardware comprenda el código sin leerlo completamente; los comentarios en el código son importantes para este propósito.
- **Flujo de Trabajo y Estándares:** El flujo simple de trabajo es el siguiente: **del "hardDev" al "softDev" se entrega el "repo" (enlazado a un entorno especifico), y el "soft" entrega el código**. El entregable del softDev **cumple con las historias de usuario**, **no rompe nada** y **está testeado**. Es crucial que el código **cumpla con las normas de arquitectura definidas**. La **arquitectura es pseudomonolítica por servicio con vista-controlador**, la cual es un enfoque híbrido adecuado para aislar casos y evitar desorden. Existe la necesidad de **codificar y documentar estas normas de arquitectura** que actualmente residen en la mente de los desarrolladores.
- **Ciclos de Feedback:** Los **ciclos de feedback ocurren cada vez que se cumple un ciclo de entregable**, como una Pull Request (PR). En este punto, se revisa la funcionalidad, el cumplimiento de estándares y se documenta el tiempo de desarrollo para futuras planificaciones. El desarrollo **se toma "más en serio"** tanto en plazos como en calidad del software, basando los plazos en una **metodología (como Scrum)** y no en una agenda. Un buen Scrum, con entregables y ciclos de feedback, **ayuda a manejar los plazos y la calidad**.

### **Etapa 2: Preparación del Entorno (TI & Infraestructura - Hard Dev)**

- **Entornos de Desarrollo y Producción:** Para el código, **existen entornos de prueba** (desarrollo/test) y producción.
- **Bases de Datos para Pruebas:** La gestión de bases de datos **se resuelve con una base de datos espejo unidireccional de la productiva**, la cual se actualiza periódicamente con backups. Esta configuración **permite trabajar "sin miedo"** durante las pruebas y es la opción superior a bases de datos Dockerizadas por cada desarrollo en la fase inicial, dada la experiencia y habilidades actuales del equipo. Una **separación de bases de datos** entre datos de clientes/servicio (críticos) y datos internos de la empresa **es propuesta**.
- **Instancias de Servidores:** La existencia de **instancias separadas de servidores (S2)** por cada flujo de negocio (litigio, salud, RN, venta, postventa, marketing) **permite segmentar recursos** y evitar que la caída de uno afecte a los demás.

### **Etapa 3: Desarrollo y Pruebas (Ingeniería - Soft Dev)**

- **Codificación y Pruebas:** El equipo de softDev realiza el desarrollo del código, el cual debe ser probado en un ambiente local o de test.
- **Roles Clave:** La necesidad de un **"guardián de la arquitectura" es evidente**, cuya función es asegurar el cumplimiento de los estándares y evitar la acumulación de deuda técnica. El equipo de TI, que incluye el "hard dev", **es el encargado de validar** que el software cumple con los estándares antes de pasar a producción. El **rol de "security" (ciberseguridad) es una necesidad urgente** que no se cubre internamente por el momento.

### **Etapa 4: Despliegue a Producción (TI & Infraestructura - Hard Dev)**

- **Criterios de Despliegue:** El software pasa a producción una vez que **cumple todos los puntos de calidad y seguridad**.
- **Soporte y Monitoreo:** El software cuenta con **soporte permanente** una vez en producción. Para activar el soporte, el monitoreo constante es clave, y este se encarga de identificar la raíz de los problemas.

### **Etapa 5: Mantenimiento, Mejora Continua y Evolución del Ecosistema (Ambos equipos)**

- **Gestión de Incidencias:** Los tickets de problemas en producción se dirigen al equipo responsable según la naturaleza del problema.
- **Documentación Viva ("Biblias"):** El concepto de **"Biblias" es introducido como documentación centralizada y viva** para servicios, roles, interacciones y aspectos técnicos. Su objetivo es asegurar que el conocimiento sea coherente, actualizado y sirva como fuente para el equipo y la IA.
- **Evolución del Equipo:** La necesidad de perfiles específicos, como un "guardián de la arquitectura" permanente, y la urgencia de cubrir el rol de ciberseguridad (security) son evidentes. El perfil de un **"minion" o practicante dedicado a la migración** de sistemas antiguos ("muda") es una posibilidad para iniciar el proceso de orden.

# **2.  Etapa 1: Definición y Diseño**

Esta primera etapa de nuestro pipeline de desarrollo es el punto de partida fundamental, donde se conciben y se articulan los requisitos y la arquitectura de cada iniciativa de software en Lexy. Es un momento estratégico que involucra una colaboración intrínseca entre los equipos de Ingeniería (Soft Dev) y TI & Infraestructura (Hard Dev), sentando las bases para una ejecución eficiente y alineada con los objetivos de negocio. El propósito es definir con precisión los flujos de trabajo, las responsabilidades y los estándares que regirán el ciclo de vida del software, garantizando un punto de partida claro y documentado que es esencial para la robustez de todo el proceso.

### **1.1. Punto de Partida y Documentación Inicial: La Gestación del Proyecto**

La claridad en esta fase es imperativa para la transformación de Lexy en una desarrolladora de software legal y para acelerar nuestro negocio. Aquí se establecen los "contratos" iniciales entre los equipos, evitando futuras fricciones y desviaciones.

### **1.1.1. Definición Colaborativa de Entregables**

El proceso se inicia con una **definición exhaustiva y colaborativa de los entregables esperados entre las áreas**. Esto abarca la elaboración de **especificaciones de API (Application Programming Interface)** y la creación de **mockups**. Estos elementos son cruciales para asegurar una comprensión unificada de lo que se construirá y cómo se integrará dentro de nuestro ecosistema tecnológico.

- **Prototipo Funcional y Repositorio**: El principal entregable del equipo de Software (Soft Dev) al equipo de Hardware (Hard Dev) es un prototipo funcional. Este prototipo debe estar acompañado de un repositorio de código (repo). Es crucial que este repositorio se gestione de manera eficiente para evitar la proliferación de proyectos desorganizados.
    - **Gestión del Repositorio**: Para proyectos que son modificaciones de funcionalidades existentes, se entregará una rama de un repositorio ya existente, en lugar de crear un nuevo repositorio para cada proyecto. Esto previene un "caos de múltiples proyectos" y fomenta la cohesión del código.
    - **Control de Ramas**: Idealmente, el repositorio se entrega con la rama principal (main) bloqueada. El equipo de Ingeniería (Soft Dev) trabajará en ramas paralelas y gestionará los cambios a través de Pull Requests (PRs), lo que facilita la revisión y el mantenimiento del código.
- **Documentación Detallada**: La documentación es un pilar fundamental en esta etapa. Cada pieza de código debe estar acompañada de una documentación exhaustiva que permita a los equipos, especialmente al Hard Dev, comprender el código sin necesidad de leerlo por completo.
    - **Contenido de la Documentación**: Debe incluir un pequeño resumen de uso y maquetas técnicas. Los comentarios en el código son de suma importancia para este propósito.
    - **Precisión de la Documentación**: Es necesario refinar y codificar los estándares de esta documentación, dado que gran parte de este conocimiento reside actualmente en la mente de los desarrolladores. Esta codificación es esencial para la "Biblia del soft", que servirá como fuente de conocimiento para la formación y la IA.

### **1.1.2. El Prototipo Funcional y la Gestión del Repositorio**

El principal entregable del equipo de Software (Soft Dev) al equipo de Hardware (Hard Dev) en esta etapa es un **prototipo funcional**. Este prototipo debe estar invariablemente acompañado de un **repositorio de código (repo)**. Es de vital importancia gestionar este repositorio de manera que se **evite la proliferación de proyectos desorganizados y un "caos de múltiples proyectos"**.

- **Gestión de Ramas Existentes**: Para proyectos que implican modificaciones a funcionalidades ya existentes o ampliaciones, se entregará una **rama de un repositorio ya existente**, en lugar de crear un nuevo repositorio para cada iniciativa. Esta práctica fomenta la cohesión del código y reduce la complejidad de la gestión.
- **Control de Versiones y Pull Requests (PRs)**: Idealmente, el repositorio se entrega con la **rama principal (main) bloqueada**, lo que significa que el equipo de Ingeniería (Soft Dev) trabajará en ramas paralelas. Los cambios y adiciones se gestionarán a través de **Pull Requests (PRs)**, un mecanismo que facilita la revisión de código y asegura la calidad antes de la integración.

### **1.1.3. Documentación Detallada: El Readme**

La documentación no es un mero formalismo; es un pilar fundamental en esta etapa y para la concepción de nuestras "Biblias". Cada pieza de código debe estar acompañada de una **documentación detallada y exhaustiva**.

- **Contenido Esencial**: Esta documentación debe incluir, como mínimo, un **pequeño resumen de uso** y **maquetas técnicas**. Los **comentarios en el código** son de suma importancia, ya que permiten que el equipo de Hardware (Hard Dev), y cualquier otro miembro del equipo, comprenda la lógica y el propósito del código sin necesidad de una lectura línea por línea.
- **Codificación de Estándares para IA y Formación**: Existe una necesidad urgente de **refinar, estandarizar y codificar estas normas de documentación**. Gran parte de este conocimiento reside actualmente en la mente de los desarrolladores, lo cual es un riesgo. La codificación formal de estos estándares es esencial para la creación de nuestra "Biblia del soft", que servirá como una fuente de conocimiento clave para la formación de nuevos talentos y para la alimentación de nuestros agentes de Inteligencia Artificial, mejorando la vectorización del texto.

### **1.2. Flujo de Trabajo y Estándares de Código: Asegurando la Calidad Arquitectónica**

La interacción entre Hard Dev y Soft Dev en esta etapa sigue un flujo de trabajo simplificado, pero con responsabilidades y criterios de calidad bien definidos.

### **1.2.1. Intercambio de Entregables entre Equipos**

El flujo de trabajo es bidireccional y claro: el equipo de Hard Dev es el encargado de entregar el repositorio (repo) al equipo de Soft Dev, este último enlazado a un entorno específico para el desarrollo. A su vez, el equipo de Soft Dev entregará el código resultante de su trabajo.

### **1.2.2. Criterios de Aceptación del Código (Soft Dev)**

El código producido y entregado por el equipo de Soft Dev debe satisfacer criterios estrictos antes de poder avanzar a las siguientes etapas del pipeline:

- **Cumplimiento de Historias de Usuario**: El entregable debe **cumplir con todas las historias de usuario** definidas para el proyecto, asegurando que la funcionalidad desarrollada responde a las necesidades planteadas. Este es un criterio fundamental para el propósito del desarrollo.
- **Integridad del Sistema**: El código no debe introducir rupturas o regresiones en el sistema existente ("no rompa nada"). La estabilidad del entorno productivo es primordial.
- **Testeado**: El código debe haber sido **probado exhaustivamente en un ambiente local o de test**. Este testing previo asegura una funcionalidad mínima y reduce la posibilidad de errores en fases posteriores.
- **Adherencia a Normas de Arquitectura**: Es crucial que el código **cumpla rigurosamente con las normas de arquitectura definidas por Lexy**. Nuestra arquitectura actual es **"pseudomonolítica por servicio con vista-controlador"**, un enfoque híbrido diseñado para aislar casos y prevenir el desorden.
    - **Necesidad de Codificación y Documentación**: Al igual que con la documentación general, se reitera la necesidad urgente de **codificar y documentar formalmente estas normas de arquitectura**, las cuales residen principalmente en el conocimiento de los desarrolladores. Este paso es vital para asegurar el cumplimiento de estándares, facilitar el proceso de integración continua y reducir la deuda técnica.
    - **El Rol del "Guardián de la Arquitectura"**: La necesidad de un **"guardián de la arquitectura"** es evidente y crítica. Esta figura será esencial para asegurar el cumplimiento de estos estándares, la coherencia arquitectónica y para evitar la acumulación de deuda técnica, garantizando que el código no solo funcione, sino que esté bien construido y sea mantenible.

### **1.3. Ciclos de Feedback y Metodología: Impulsando la Calidad y la Eficiencia**

La colaboración efectiva y la calidad del software en Lexy se nutren de ciclos de feedback constantes y de la aplicación rigurosa de metodologías ágiles.

### **1.3.1. Frecuencia y Propósito del Feedback**

Los **ciclos de feedback** se implementan de manera sistemática y **ocurren cada vez que se completa un ciclo de entregable**, como la presentación de una Pull Request (PR). Estos momentos de revisión continua y temprana son fundamentales para la funcionalidad y el cumplimiento de los estándares.

### **1.3.2. Evaluación y Documentación del Tiempo de Desarrollo**

Durante estos ciclos de feedback, se lleva a cabo una revisión exhaustiva de la funcionalidad del código y se verifica la adherencia a los estándares definidos. Además, se **documenta el tiempo de desarrollo** invertido en cada entregable. Esta recopilación de datos es vital para futuras planificaciones, permitiendo una mejora continua en la estimación de plazos y recursos.

### **1.3.3. Seriedad en el Desarrollo y Metodología Ágil**

En Lexy, el desarrollo de software se asume con la máxima "seriedad", tanto en la calidad del producto final como en el cumplimiento de los plazos. Los plazos se establecerán de forma rigurosa, **basándose en una metodología probada como Scrum**, y no simplemente en una agenda arbitraria. Un buen Scrum, caracterizado por entregables claros, ciclos de feedback definidos y una gestión proactiva, es una herramienta poderosa para manejar eficazmente tanto los plazos como la calidad del software. La implicación de los equipos de desarrollo en las decisiones de diseño es clave para el éxito del proyecto.

Esta Etapa 1 es el cimiento indispensable para que cada desarrollo en Lexy no solo cumpla con su propósito funcional, sino que también se integre de manera coherente y robusta en nuestra arquitectura, acelerando nuestra capacidad de innovación y fortaleciendo nuestra posición como una desarrolladora de software legal de vanguardia.

# **3.  Etapa 2: Preparación del Entorno de Desarrollo (Prueba)**

Esta etapa, bajo la responsabilidad directa del equipo de TI & Infraestructura (Hard Dev), es donde se materializan y configuran los ambientes técnicos que permitirán que el código de un proyecto sea **desarrollado, integrado y probado rigurosamente**. El énfasis principal de esta fase es asegurar que los desarrolladores dispongan de entornos estables y bases de datos representativas para realizar su trabajo sin impactar los sistemas en producción.

### **3.1. Entornos de Desarrollo y Producción: La Infraestructura del Código en Pruebas**

Para la gestión y validación del código, en Lexy mantenemos entornos segregados. La clave aquí es la **existencia de entornos separados de prueba (desarrollo/test) y producción para el código**. Esta distinción es fundamental y permite a los equipos de Ingeniería (Soft Dev) testear nuevas funcionalidades o modificaciones exhaustivamente sin la preocupación de afectar la estabilidad o integridad del ambiente productivo.

Es vital entender que, si bien se pueden realizar pruebas en un entorno local, la experiencia ha demostrado que el comportamiento del código puede variar significativamente al ser ejecutado en un servidor real, especialmente en lo que respecta al comportamiento en Linux y la gestión de dominios. Por ello, los entornos de prueba simulan las condiciones productivas lo más fielmente posible. Gracias a esta aproximación estructurada, ya hemos logrado **reducir considerablemente los errores como los "502" en producción**, lo cual indica un proceso de validación más sólido.

### **3.2. Bases de Datos para Pruebas: La Gestión de Datos en Desarrollo**

Una gestión adecuada de las bases de datos en los entornos de prueba es crítica para la seguridad de la información y para que los desarrolladores puedan trabajar "sin miedo".

### **3.2.1. Modelo de Base de Datos Espejo Unidireccional para Desarrollo**

La estrategia preferida en esta fase es la implementación de una **base de datos espejo unidireccional de la productiva**. Esto significa que creamos una copia de la base de datos de producción que se actualiza periódicamente mediante *backups*, permitiendo a los equipos de desarrollo trabajar con datos representativos y actualizados.

Este modelo se ha considerado superior a las bases de datos Dockerizadas por cada desarrollo en la fase inicial, dadas las habilidades y experiencia actuales de nuestro equipo. Permite a los desarrolladores ver y trabajar sobre los cambios que otros equipos (como Pablo o Puma) están realizando en paralelo, fomentando la integración temprana y la detección de conflictos. Además, la implementación de este espejo centralizado se estima en semanas, en contraste con los meses que podría tomar una solución Docker local más compleja, y ofrece beneficios de cumplimiento al limitar y auditar el acceso a los datos de manera controlada.

### **3.2.2. Separación de Datos Críticos y Esquemas de Prueba**

Se propone una **separación adicional entre las bases de datos que contienen datos de clientes/servicio (considerados críticos) y los datos internos de la empresa**. Esta segmentación de datos tiene como objetivo minimizar el impacto en caso de una falla en la base de datos interna, protegiendo así la información más sensible de nuestros clientes. El proceso también contemplaría la creación de una copia del esquema de la base de datos sin datos sensibles, lo que facilita las pruebas sin comprometer la información crítica.

### **3.3. Instancias de Servidores (S2): Segmentación por Flujo de Negocio para la Estabilidad de Pruebas**

Para garantizar la segregación de recursos y evitar que la caída de un servicio afecte a otros, hemos definido la existencia de instancias separadas de servidores (S2).

### **3.3.1. Arquitectura Pseudomonolítica por Servicio con Vista-Controlador**

Nuestra arquitectura actual es **"pseudomonolítica por servicio con vista-controlador"**, un enfoque híbrido que aísla casos específicos y previene el desorden general del sistema. Esto se traduce en **instancias separadas de servidores (S2) para cada flujo de negocio principal**, como litigios, salud, renegociación (RN), venta, postventa y marketing.

Los beneficios de esta segmentación son claros: permite **segmentar los recursos** de hardware y, crucialmente, **evitar que la caída de un servicio impacte a los demás**. Por ejemplo, si el *backend* de litigio experimenta una falla, el resto de los servicios web seguirán operativos, asegurando la continuidad del negocio. Esta estructura también facilita la experimentación con nuevas librerías o lenguajes en un flujo de negocio específico sin afectar el conjunto del sistema.

### **3.3.2. S2 "Validador" y "Toolbox" de Herramientas Genéricas**

Hemos considerado la inclusión de un **S2 "validador"** que actuaría como un primer punto de entrada para solicitudes, especialmente aquellas provenientes de sistemas externos como Streak o Make, asegurando que las solicitudes pasen "limpias" antes de ser procesadas por los S2 de negocio.

Asimismo, se ha discutido la posibilidad de tener una **instancia S2 dedicada a un "toolbox" de herramientas genéricas**. Esta instancia centralizaría funciones transversales como el envío de correos o módulos de consulta a Nepal, evitando la replicación de código y lógica en cada S2 de negocio. Esto no solo simplifica el mantenimiento y mejora de estas herramientas, sino que también facilita la trazabilidad y el registro de eventos (logs) al centralizar su origen.

En resumen, la **Etapa 2** es la fase en la que Lexy construye y refina su "sala de máquinas" de desarrollo y pruebas. Al enfocarnos en la preparación meticulosa de estos entornos, estamos asegurando que cada línea de código sea concebida, probada y validada en un terreno fértil y seguro, permitiendo una base tecnológica sólida y escalable que es indispensable para nuestro camino hacia la vanguardia del LegalTech y la potenciación de nuestras capacidades de Inteligencia Artificial. Esta claridad en la definición y preparación de nuestros entornos de desarrollo y prueba es un pilar fundamental para el éxito continuo de nuestro pipeline de CI/CD.

# **4.  Etapa 3: Desarrollo y Pruebas**

### **4.1. Propósito y Alcance**

La Etapa 3 es el crisol donde el diseño y la definición (Etapa 1) se materializan en código funcional y probado. Es responsabilidad del equipo de Soft Dev la **codificación y las pruebas exhaustivas del software**. Esta etapa es vital para asegurar que cada funcionalidad desarrollada no solo cumpla con su propósito, sino que también se integre de manera coherente y robusta en nuestra arquitectura, impulsando nuestra capacidad de innovación.

### **4.2. Actividades Clave del Equipo de Soft Dev**

### **4.2.1. Codificación y Pruebas Rigurosas**

El equipo de Ingeniería (Soft Dev) se encarga de la codificación de las funcionalidades, las cuales deben ser **probadas exhaustivamente en un ambiente local o de test**. Este testing es fundamental para asegurar una funcionalidad mínima y para reducir la probabilidad de errores en fases posteriores. La seriedad en el desarrollo se manifiesta tanto en la calidad del producto final como en el cumplimiento de los plazos rigurosos.

### **4.2.2. Adherencia a Estándares y Normas de Arquitectura**

Un pilar central en esta etapa es la **adherencia rigurosa a las normas de arquitectura definidas por Lexy**. Nuestra arquitectura es **"pseudomonolítica por servicio con vista-controlador"**, un enfoque híbrido diseñado para aislar casos y prevenir el desorden y la acumulación de deuda técnica.

Actualmente, gran parte de este conocimiento y estos estándares de arquitectura **"residen principalmente en el conocimiento de los desarrolladores"**. Es una **necesidad urgente codificar y documentar formalmente estas normas de arquitectura**. Esta codificación es esencial para la creación de nuestra **"Biblia del soft"**, la cual servirá como una fuente de conocimiento clave para la formación de nuevos talentos y, crucialmente, para la alimentación de nuestros agentes de Inteligencia Artificial, **mejorando la vectorización del texto**. Esto significa que, por ejemplo, los detalles sobre la implementación de un ORM o las convenciones de nombres para el código deben estar explícitamente definidos en "chunks" dentro de la "Biblia del soft".

### **4.2.3. Criterios de Aceptación del Código (Soft Dev)**

El código producido y entregado por el equipo de Soft Dev debe satisfacer criterios estrictos antes de avanzar:

- **Cumplimiento de Historias de Usuario:** El entregable debe **cumplir con todas las historias de usuario** definidas para el proyecto, asegurando que la funcionalidad desarrollada responde a las necesidades planteadas.
- **Integridad del Sistema:** El código **"no debe introducir rupturas o regresiones en el sistema existente"** ("no rompa nada"), ya que la estabilidad del entorno productivo es primordial.
- **Testeado:** El código debe haber sido **probado exhaustivamente en un ambiente local o de test**.
- **Adherencia a Normas de Arquitectura:** Como se mencionó, el código debe **cumplir rigurosamente con las normas de arquitectura definidas por Lexy**.

### **4.3. Roles Clave y Colaboración Inter-Equipos**

### **4.3.1. El Rol del "Guardián de la Arquitectura"**

La necesidad de un **"guardián de la arquitectura" es "evidente y crítica"**. Esta figura será esencial para **asegurar el cumplimiento de los estándares**, la coherencia arquitectónica y para evitar la acumulación de deuda técnica, garantizando que el código no solo funcione, sino que esté bien construido y sea mantenible. Este rol será el principal validador de que el código entregado por Soft Dev cumple con las normas arquitectónicas antes de pasar a producción.

### **4.3.2. Rol del Hard Dev (TI & Infraestructura)**

Aunque la codificación es del Soft Dev, el equipo de TI y Infraestructura (Hard Dev) juega un rol crucial en esta etapa, ya que **"es el encargado de validar que el software cumple con los estándares antes de pasar a producción"**. Esta validación se integra con los ciclos de feedback.

### **4.3.3. El Rol Urgente de "Security" (Ciberseguridad)**

Se ha identificado la **"necesidad urgente" de un rol de "security" (ciberseguridad)**, el cual no se cubre internamente por el momento. Este perfil es una carrera de mínimo "unos par de años" y se actualiza constantemente con nuevas vulnerabilidades. Este rol sería vital para asegurar que el código no solo sea funcional, sino también seguro.

# 5. Etapa 4: Despliegue a Producción

### **5.1. Propósito y Alcance**

La Etapa 4 es el punto culminante del proceso de desarrollo, donde el software, una vez que ha superado las rigurosas fases de definición, diseño, desarrollo y pruebas, es finalmente **desplegado en el entorno productivo**. La responsabilidad primordial recae en el equipo de **TI & Infraestructura (Hard Dev)**, asegurando que la transición sea fluida, segura y que el sistema mantenga su integridad y rendimiento bajo cargas reales. El propósito central es materializar el valor del desarrollo en un entorno operativo estable, listo para ser utilizado por nuestros usuarios y clientes.

### **5.2. Criterios de Despliegue a Producción**

Para que el software avance a producción, debe cumplir con un conjunto de **criterios estrictos de calidad y seguridad**. Estos criterios no son meros requisitos; son la garantía de que cada funcionalidad implementada se integre de manera robusta y sin comprometer la estabilidad del ecosistema tecnológico de Lexy.

### **5.2.1. Calidad del Software**

El código proveniente de la Etapa 3 debe satisfacer exhaustivamente los siguientes puntos para ser considerado apto para producción:

- **Cumplimiento de Historias de Usuario:** El entregable debe **cumplir con todas las historias de usuario** definidas para el proyecto, asegurando que la funcionalidad desarrollada responde directamente a las necesidades planteadas. Este es el propósito fundamental del desarrollo de software.
- **Integridad del Sistema:** Es imperativo que el código **"no introduzca rupturas o regresiones en el sistema existente"**. La estabilidad del entorno productivo es la prioridad máxima, y cualquier desarrollo debe coexistir armónicamente con la infraestructura ya desplegada.
- **Testeado Riguroso:** El código debe haber sido **probado exhaustivamente en un ambiente local o de test** antes de llegar a esta etapa. Este testing previo es crucial para asegurar una funcionalidad mínima y para reducir drásticamente la posibilidad de errores en fases posteriores, impactando directamente la eficiencia del despliegue.
- **Adherencia a Normas de Arquitectura:** El código debe **cumplir rigurosamente con las normas de arquitectura definidas por Lexy**. Nuestra arquitectura actual es **"pseudomonolítica por servicio con vista-controlador"**, un enfoque híbrido diseñado para aislar casos y prevenir el desorden y la acumulación de deuda técnica. La **seriedad en el desarrollo** se manifiesta tanto en la calidad del producto final como en el cumplimiento de los plazos rigurosos y los estándares arquitectónicos.

### **5.2.2. Seguridad del Software**

Los **criterios de seguridad** son un pilar fundamental para el despliegue. Se ha identificado la **"necesidad urgente" de un rol de "security" (ciberseguridad)**, el cual no se cubre internamente por el momento. Este perfil requiere una carrera de al menos "unos par de años" y una actualización constante sobre nuevas vulnerabilidades, siendo vital para asegurar que el código no solo sea funcional, sino también intrínsecamente seguro. 

### **5.3. Proceso de Despliegue y Roles Clave**

El proceso de despliegue a producción es una orquestación precisa entre los equipos, donde la colaboración y los ciclos de feedback son fundamentales.

### **5.3.1. Rol del Hard Dev (TI & Infraestructura)**

El equipo de Hard Dev **es el encargado de validar que el software cumple con los estándares antes de pasar a producción**. Este equipo recibe el código desarrollado por Soft Dev y es el último filtro de calidad y seguridad antes del despliegue. Esta validación se integra intrínsecamente con los ciclos de feedback que se detallan a continuación.

### **5.3.2. Rol del Soft Dev (Ingeniería)**

Aunque la fase de desarrollo principal recae en el Soft Dev, su interacción con la producción se limita principalmente a casos de **soporte continuo** si surge un error una vez que el software ya está en vivo. Su enfoque principal es la "exploración y explotación" de nuevas funcionalidades y mejoras.

### **5.3.3. Integración con Ciclos de Feedback**

Los **ciclos de feedback** se implementan de manera sistemática y **ocurren cada vez que se completa un entregable**, como la presentación de una Pull Request (PR). Estos momentos de revisión continua y temprana son fundamentales para asegurar la funcionalidad y el cumplimiento de los estándares antes de que el código progrese en el pipeline. Durante estos ciclos, se revisa la funcionalidad del código, se verifica la adherencia a los estándares definidos y se **documenta el tiempo de desarrollo invertido en cada entregable**. Esta recopilación de datos es vital para futuras planificaciones, permitiendo una mejora continua en la estimación de plazos y recursos.

### **5.4. Soporte y Monitoreo Post-Despliegue**

Una vez que el software ha sido desplegado en producción, la Etapa 4 establece los mecanismos para su operación y mantenimiento continuos.

### **5.4.1. Soporte Permanente**

El software cuenta con **soporte permanente una vez en producción**. Este soporte continuo es una garantía para los desarrollos internos de Lexy. Para proyectos o servicios externos, los términos de soporte podrían ser diferentes, con un período inicial (por ejemplo, 3 o 6 meses) y luego un modelo distinto de "aporte de uso plataforma".

### **5.4.2. Monitoreo Constante**

Para activar el soporte y gestionar proactivamente cualquier incidente, el **monitoreo constante es clave**. Este monitoreo se encarga de **identificar la raíz de los problemas** y dirigir los tickets de incidencias al equipo responsable según la naturaleza del problema.

### **5.5. Consideraciones y Desafíos Clave para el Despliegue**

La eficacia de la Etapa 4 está intrínsecamente ligada a la robustez de las etapas previas y a la anticipación de desafíos organizacionales y técnicos.

# 6. Etapa 5: **Mantenimiento, Mejora Continua y Evolución del Ecosistema**

### **5.1. Propósito y Alcance**

La Etapa 5 es la fase de vitalidad continua del software en Lexy. Su propósito es asegurar que los sistemas desplegados en producción no solo operen de manera estable, sino que también evolucionen, se optimicen y se adapten a nuevas necesidades y desafíos tecnológicos. Esta etapa es responsabilidad compartida de los equipos de **Ingeniería (Soft Dev)** y **TI & Infraestructura (Hard Dev)**, quienes colaboran estrechamente para garantizar el soporte, la resolución de incidencias, la documentación viva y la evolución estratégica de nuestro talento y nuestras plataformas.

### **5.2. Gestión de Incidencias y Soporte Post-Despliegue**

Una vez que el software se encuentra en producción, se establece un sistema robusto para su operación y mantenimiento.

### **5.2.1. Soporte Permanente y Proactivo**

El software de Lexy cuenta con **soporte permanente una vez en producción**. Este soporte continuo es una garantía esencial para todos los desarrollos internos, asegurando su estabilidad y funcionalidad operativa. Para proyectos o servicios externos, los términos de soporte pueden variar, incluyendo un período inicial (por ejemplo, 3 o 6 meses) antes de transicionar a un modelo diferente de "aporte de uso de plataforma".

### **5.2.2. Monitoreo Constante y Direccionamiento de Tickets**

Para activar proactivamente el soporte y gestionar cualquier incidente, el **monitoreo constante del software en producción es clave**. Este monitoreo es el encargado de **identificar la raíz de los problemas** y, consecuentemente, **dirigir los tickets de incidencias al equipo responsable** según la naturaleza específica del problema. La claridad en el flujo de trabajo post-producción garantiza que los problemas se atiendan de manera eficiente, optimizando la resolución y minimizando el impacto en la operación.

- **Instrucción Clave:** Cualquier alerta o anomalía detectada por el monitoreo debe generar un ticket con información detallada sobre la posible causa raíz, clasificando la incidencia para su asignación al equipo Soft Dev (problemas de código o funcionalidad) o Hard Dev (problemas de infraestructura o despliegue).

### **5.3. Documentación Viva: El Rol Central de las "Biblias"**

Para Lexy, la documentación no es un entregable estático, sino un activo dinámico y central para la gestión del conocimiento.

### **5.3.1. El Concepto de "Biblia" en Lexy**

El concepto de **"Biblias" es introducido como documentación centralizada y viva**. Una "Biblia" en Lexy es un **documento maestro o guía de referencia** que compila, de manera estructurada y detallada, todo el conocimiento necesario para un rol, un proceso o un módulo específico.

- **Propósito de Referencia Integral:** Contienen la descripción completa de servicios (ej., Litigios, Renegociación), sus etapas, tácticas y flujos operativos. Incluyen tanto el “qué” (objetivos, entregables, métricas) como el “cómo” (paso a paso, *triggers*, acciones automáticas, roles involucrados).
- **Estructura Modular y Jerárquica:** Se organizan en capítulos, secciones y sub-secciones, donde **cada bloque (o “chunk”) contiene un propósito claro, instrucciones precisas y ejemplos prácticos** para facilitar la consulta y aplicación inmediata. Esta estructura permite un "chunking" eficiente de la información, donde cada unidad de conocimiento es autocontenida.
- **Aplicación Práctica y Vectorización:** Las Biblias sirven como **fuente principal de conocimiento para los agentes de IA** (ej., Research o Design) y para los equipos humanos. Cuando se actualiza una Biblia, se “vectoriza” para alimentar los modelos de búsqueda y recuperación de Lexy, permitiendo que la IA recupere rápidamente la sección correspondiente ante una pregunta. Esta vectorización es crucial para que la IA asista a los desarrolladores en análisis de vulnerabilidades y validación de estándares de seguridad.
- **Roles y Responsabilidades en la Empresa:** Cada Biblia puede estar dirigida a un rol concreto (ej., Biblia Research Core, Biblia de Litigios, Biblia de Design).
- **Actualizaciones Continuas:** Cuando se sube una nueva versión de una Biblia, reemplaza por completo la anterior, se vectoriza de nuevo y se notifica para asegurar que todos trabajen con la versión más reciente.

### **5.3.2. Importancia de la Codificación y Estandarización**

Existe una **necesidad urgente de codificar y documentar formalmente las normas de arquitectura**. Gran parte de este conocimiento reside actualmente en la mente de los desarrolladores, lo que representa un riesgo para la coherencia y la escalabilidad. La creación de la **"Biblia del soft"** es esencial para la formación de nuevos talentos y para mejorar la vectorización de texto que alimentará a nuestros agentes de IA. Esta formalización garantiza que el código no solo sea funcional, sino también bien construido y mantenible.

- **Ejemplo Práctico:** Si un desarrollador necesita saber "cómo se maneja la autenticación para un nuevo microservicio", la Biblia de Arquitectura debería tener un *chunk* que explique el protocolo, los *endpoints* a utilizar, ejemplos de código y las consideraciones de seguridad, facilitando la consulta y la adherencia al estándar.

### **5.4. Evolución del Equipo y Perfiles Clave**

La mejora continua en Lexy no solo abarca el software y los procesos, sino también el crecimiento y la especialización de nuestros equipos. Se ha identificado la necesidad de perfiles específicos para fortalecer nuestra capacidad tecnológica.

### **5.4.1. El Guardián de la Arquitectura**

La necesidad de un **"guardián de la arquitectura" es evidente y crítica**. Esta figura es esencial para **asegurar el cumplimiento de los estándares de arquitectura definidos por Lexy**. Su rol es crucial para mantener la coherencia arquitectónica, evitar la acumulación de deuda técnica y garantizar que el código esté bien construido y sea mantenible.

- **Propósito del Rol:** Ser el garante de la salud y coherencia de nuestra arquitectura "pseudomonolítica por servicio con vista-controlador", asegurando que cada nuevo desarrollo se integre armoniosamente y sin introducir regresiones.

### **5.4.2. El Rol Urgente de Ciberseguridad (Security)**

Se reitera la **"necesidad urgente" de incorporar un rol de "security" (ciberseguridad)**. Este perfil es fundamental para asegurar que el software no solo sea funcional, sino también intrínsecamente seguro frente a las amenazas en constante evolución. A diferencia de otros roles, la ciberseguridad requiere una carrera de al menos "unos par de años" y una actualización constante sobre nuevas vulnerabilidades. Este rol es una prioridad para la madurez de nuestro pipeline.

- **Instrucción Clave:** Una vez incorporado, el especialista en ciberseguridad deberá establecer y documentar los protocolos de seguridad específicos para cada etapa del desarrollo, supervisar los testeos de seguridad (incluyendo jornadas de *hacking* ético) y asistir en la configuración de la IA para la detección de vulnerabilidades.

### **5.4.3. El Perfil de Practicante para la "Muda"**

El perfil de un **practicante dedicado a la migración de sistemas antiguos ("muda") es una posibilidad para iniciar el proceso de orden** y reducir la deuda técnica. Esta persona se dedicaría a realizar el trabajo de migración y organización de sistemas antiguos, con una misión clara de transformar la infraestructura a un estado más profesional.

- **Propósito del Rol:** Liberar a los desarrolladores con mayor experiencia de tareas de migración repetitivas, permitiéndoles enfocarse en la "exploración y explotación" de nuevas funcionalidades y en la arquitectura. Este rol puede ser el **"germen del hard"**, con una proyección de carrera hacia roles de DevOps o Cloud una vez que adquiera un conocimiento profundo de nuestra infraestructura.
- **Proceso de Incorporación y Liderazgo:** Inicialmente, estos perfiles podrían ser liderados por un miembro experimentado del equipo (ej., Gastón) para asegurar que comprendan el "porqué" de la migración y la visión general, antes de que se les deleguen tareas más específicas.
- **Ejemplo de Tarea:** Tomar el código de una funcionalidad antigua en Make o un Lambda, analizarlo, y refactorizarlo para su implementación en un entorno más moderno y modular, bajo las nuevas normas de arquitectura definidas por el Consejo Catedral. La priorización de la "muda" se establecerá en base a la criticidad y el costo de mantenimiento actual del sistema.