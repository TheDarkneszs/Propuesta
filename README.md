# Math Leveling AI - Prototipo

Este es el prototipo de interfaz web diseñado para el curso de nivelación universitaria en el área de Pre-Cálculo. 
El proyecto implementa un sistema de progresión interactivo similar a Duolingo, enfocado en brindar una experiencia visual dinámica (con animaciones y diseño *glassmorphism*) para guiar al estudiante a través de diferentes módulos matemáticos.

## Tecnologías Utilizadas
- **React + Vite**: Para un desarrollo rápido y modular.
- **Framer Motion**: Para animaciones fluidas (transiciones entre pantallas, pulsaciones, etc).
- **Lucide React**: Para iconografía (candados, estrellas, verificaciones).
- **CSS Puro (Vanilla)**: Utilizando variables de CSS para manejar un "Dark Mode" moderno y efectos de desenfoque.

## Cómo ejecutar el proyecto en local

Sigue estos sencillos pasos para montar y visualizar el proyecto en tu entorno local:

### 1. Requisitos previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 2. Instalar dependencias
Abre una terminal, navega hasta la raíz de este proyecto (`c:\Propuesta`) y ejecuta el siguiente comando:

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Una vez finalizada la instalación de los paquetes, inicia el entorno de Vite ejecutando:

```bash
npm run dev
```

### 4. Abrir en el navegador
Vite te mostrará en la terminal una URL local (generalmente es `http://localhost:5173/`). Haz clic en ella o cópiala y pégala en tu navegador.

## Flujo del Prototipo
1. **Mapa de Progresión**: Verás una ruta de nodos. Haz clic en el nodo activo (el que tiene la estrella y el resplandor).
2. **Pregunta Interactiva**: Selecciona una respuesta a la pregunta matemática en pantalla y envíala.
3. **Simulación de IA**: Se mostrará una pantalla de transición donde un agente de IA analiza tu respuesta.
4. **Subida de Nivel**: Al finalizar la evaluación, ganarás puntos de experiencia y avanzarás en el mapa de ruta.
