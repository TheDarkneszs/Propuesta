# User Flow: Recorrido de Aprendizaje en la Interfaz

Basado en el análisis de los componentes React (`App.jsx`, `WorldMap`, `SubNodeMap`, `QuestionCard`, `AIEvaluationOverlay`, etc.), este es el diagrama de flujo interactivo del usuario (User Flow) que mapea la navegación real entre las pantallas del prototipo.

```mermaid
flowchart TD
    %% Estilos
    classDef screen fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef logic fill:#334155,stroke:#94a3b8,stroke-width:1px,stroke-dasharray: 5 5,color:#fff
    classDef overlay fill:#4c1d95,stroke:#8b5cf6,stroke-width:2px,color:#fff

    %% Inicio
    Start(["Ingreso a la App"]) --> Diag["Pantalla: DiagnosticSimulation<br/><small>Selección Inicial de Nivel</small>"]:::screen
    
    %% Header General
    Diag --> Header{"Header de Navegación<br/><small>- Barra XP y Nivel<br/>- Selector de Nivel</small>"}:::logic
    
    %% Mapa de Mundos
    Header --> WM["Pantalla: WorldMap<br/><small>Selección de Área (Ej. Aritmética)</small>"]:::screen
    
    %% Mapa de Nodos
    WM -->|Hace clic en un Mundo| SNM["Pantalla: SubNodeMap<br/><small>Ruta de nodos y Test Final</small>"]:::screen
    SNM -.->|Botón Atrás| WM
    
    %% Rutas desde SubNodeMap
    SNM -->|Selecciona Nodo Normal| QC["Pantalla: QuestionCard<br/><small>Ejercicio Matemático (hasta 4 Fases)</small>"]:::screen
    SNM -->|Selecciona Evaluación Final| TC["Pantalla: TestCard<br/><small>Examen del Mundo Completo</small>"]:::screen
    
    %% Flujo de Nodos (Preguntas)
    QC -->|Envía Respuesta| AIE["Overlay: AIEvaluationOverlay<br/><small>Animación IA Evaluando</small>"]:::overlay
    AIE -->|Asigna +10 XP| CheckPhase{"¿Terminó el Nodo?"}:::logic
    CheckPhase -->|Vuelve a Fase Siguiente| SNM
    
    %% Flujo de Test
    TC -->|Envía Examen| TRS["Pantalla: TestResultScreen<br/><small>Calcula Score</small>"]:::screen
    
    TRS --> ScoreCheck{"¿Score >= 70?"}:::logic
    
    ScoreCheck -- No --> Fail["Reprobado: Volver al Mapa para Repasar"]:::logic
    Fail --> SNM
    
    ScoreCheck -- Sí --> Pass{"Fase del Test"}:::logic
    Pass -- Fase 1 --> P1["Gana 250 XP"]:::logic --> SNM
    Pass -- Fase 2 --> P2["Gana 500 XP y Completa Mundo"]:::logic --> WM
```

### Detalle de Pantallas (Componentes):

1. **`DiagnosticSimulation.jsx`**: Es lo primero que ve el estudiante si no tiene nivel asignado. Hace unas preguntas rápidas o permite seleccionar el nivel directamente.
2. **Header (en `App.jsx`)**: Siempre visible. Mantiene al usuario informado sobre su progreso general (Nivel y XP) y le permite cambiar la dificultad de los ejercicios con el `ProficiencyDropdown`.
3. **`WorldMap.jsx`**: Visión global de los grandes bloques (ej. Aritmética, Álgebra). Al pasar la fase 2 del test de un mundo, este se marca como completado aquí.
4. **`SubNodeMap.jsx`**: El mapa detallado de un mundo específico. Muestra 10 nodos de aprendizaje y 1 nodo gigante de Test al final.
5. **`QuestionCard.jsx` & `AIEvaluationOverlay.jsx`**: El núcleo del aprendizaje interactivo. El estudiante responde, presiona enviar y salta el overlay de evaluación de la IA. Si acierta, sube la barra de progreso de ese nodo (tiene hasta 4 fases de preguntas).
6. **`TestCard.jsx` & `TestResultScreen.jsx`**: La prueba final. Tiene dos "Fases". Pasar la fase 1 da 250 XP. Pasar la fase 2 da 500 XP y te devuelve al `WorldMap` coronando ese mundo.
