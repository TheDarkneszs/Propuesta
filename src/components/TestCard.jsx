import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generate20Questions = (baseQuestions) => {
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      ...baseQuestions[i % baseQuestions.length],
      id: i + 1,
      title: i < 10 ? 'Fase 1: Estándar' : 'Fase 2: Avanzado'
    });
  }
  return result;
};

const baseLinear = {
  Principiante: [
    { q: '¿Cuál es la intersección en y de y = x - 5?', options: ['1', '-5', '5', '0'], correct: '-5' },
    { q: 'Encuentra la pendiente de la recta que pasa por (0,0) y (2,4)', options: ['2', '4', '1/2', '0'], correct: '2' },
    { q: '¿Qué ecuación representa una línea horizontal?', options: ['x = 5', 'y = x', 'y = 4', 'y = 4x'], correct: 'y = 4' }
  ],
  Intermedio: [
    { q: '¿Cuál es la intersección en y de y = 3x - 5?', options: ['3', '-5', '5', '0'], correct: '-5' },
    { q: 'Encuentra la pendiente de la recta que pasa por (1,2) y (3,6)', options: ['2', '4', '1/2', '-2'], correct: '2' },
    { q: '¿Cuál es la ecuación de la recta con m=2 que pasa por (0,1)?', options: ['y = 2x + 1', 'y = x + 2', 'y = 2x', 'y = 2'], correct: 'y = 2x + 1' }
  ],
  Avanzado: [
    { q: 'Encuentra la pendiente de la recta 4x - 2y = 8', options: ['2', '4', '-2', '8'], correct: '2' },
    { q: '¿Qué recta es perpendicular a y = 2x + 1?', options: ['y = -1/2 x', 'y = 2x - 1', 'y = -2x', 'y = 1/2 x'], correct: 'y = -1/2 x' },
    { q: 'Encuentra la intersección x de 3y + 6x = 18', options: ['3', '6', '2', '0'], correct: '3' }
  ]
};

const baseQuad = {
  Principiante: [
    { q: 'Encuentra las raíces de x² - 4 = 0', options: ['x=2, x=-2', 'x=4', 'x=0', 'x=2'], correct: 'x=2, x=-2' },
    { q: '¿Cuál es el vértice de y = x²?', options: ['(1,1)', '(0,0)', '(-1,1)', '(0,1)'], correct: '(0,0)' },
    { q: '¿Hacia dónde abre la parábola y = x²?', options: ['Arriba', 'Abajo', 'Izquierda', 'Derecha'], correct: 'Arriba' }
  ],
  Intermedio: [
    { q: '¿Cuál es la intersección en y de y = 2x² + 3x + 5?', options: ['2', '3', '5', '0'], correct: '5' },
    { q: 'Encuentra las raíces de x² - 5x + 6 = 0', options: ['x=2, x=3', 'x=-2, x=-3', 'x=1, x=6', 'x=0'], correct: 'x=2, x=3' },
    { q: '¿Cuál es el eje de simetría de y = x² - 4x?', options: ['x = 4', 'x = 2', 'y = 2', 'x = -2'], correct: 'x = 2' }
  ],
  Avanzado: [
    { q: 'Encuentra el vértice de y = 2(x - 3)² + 4', options: ['(3,4)', '(-3,4)', '(3,-4)', '(2,4)'], correct: '(3,4)' },
    { q: '¿Cuántas raíces reales tiene 3x² + x + 5 = 0?', options: ['0', '1', '2', 'Infinitas'], correct: '0' },
    { q: 'Factoriza completamente: 4x² - 12x + 9', options: ['(2x - 3)²', '(2x + 3)²', '(4x - 3)(x - 3)', '(2x - 3)(2x + 3)'], correct: '(2x - 3)²' }
  ]
};

const baseGeo = {
  Principiante: [
    { q: '¿Cuál es el área de un cuadrado de lado 4?', options: ['8', '12', '16', '4'], correct: '16' },
    { q: '¿Suma de los ángulos interiores de un triángulo?', options: ['90°', '180°', '360°', '270°'], correct: '180°' },
    { q: '¿Cuál es el perímetro de un rectángulo 3x4?', options: ['7', '12', '14', '24'], correct: '14' }
  ],
  Intermedio: [
    { q: '¿Cuál es el área de un círculo con radio r=3?', options: ['6π', '9π', '3π', '12π'], correct: '9π' },
    { q: '¿Cuál es la hipotenusa si los catetos son 3 y 4?', options: ['5', '7', '12', '25'], correct: '5' },
    { q: '¿Volumen de un cubo de arista 3?', options: ['9', '18', '27', '81'], correct: '27' }
  ],
  Avanzado: [
    { q: 'Volumen de un cilindro con r=2, h=5', options: ['10π', '20π', '10', '25π'], correct: '20π' },
    { q: 'Suma de ángulos interiores de un hexágono', options: ['360°', '540°', '720°', '180°'], correct: '720°' },
    { q: 'Diagonal de un cuadrado de lado 5', options: ['5', '10', '5√2', '25'], correct: '5√2' }
  ]
};

const baseApplied = {
  Principiante: [
    { q: 'Si compras 3 manzanas a $2, ¿cuánto pagas?', options: ['$5', '$6', '$2', '$1'], correct: '$6' },
    { q: 'Viajas 100 km en 2 horas, ¿velocidad media?', options: ['200 km/h', '100 km/h', '50 km/h', '20 km/h'], correct: '50 km/h' },
    { q: 'Descuento del 10% en $100', options: ['$10', '$90', '$100', '$0'], correct: '$90' }
  ],
  Intermedio: [
    { q: 'Si un auto viaja a 100 km/h por 2.5 horas, ¿distancia?', options: ['200 km', '250 km', '150 km', '300 km'], correct: '250 km' },
    { q: 'Un tanque de 50L fuga 20%, ¿cuántos quedan?', options: ['30 L', '40 L', '45 L', '10 L'], correct: '40 L' },
    { q: 'Un corredor hace 5 km en 25 mins. ¿Ritmo?', options: ['4 min/km', '5 min/km', '6 min/km', '10 min/km'], correct: '5 min/km' }
  ],
  Avanzado: [
    { q: 'Interés simple del 5% anual en $1000 por 3 años', options: ['$50', '$150', '$1150', '$1500'], correct: '$150' },
    { q: 'Si f(t) = -5t² + 20t modela altura, ¿tiempo máximo?', options: ['2s', '4s', '5s', '10s'], correct: '2s' },
    { q: 'Mezclar 2L al 10% y 3L al 20%, ¿concentración final?', options: ['15%', '16%', '30%', '12%'], correct: '16%' }
  ]
};

export default function TestCard({ worldId, worldName, testPhase, proficiencyLevel, onSubmitTest }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const rawQuestions = {
    1: baseLinear,
    2: baseQuad,
    3: baseGeo,
    4: baseApplied
  };

  const selectedWorldBank = rawQuestions[worldId] || rawQuestions[1];
  const selectedLevelBank = selectedWorldBank[proficiencyLevel] || selectedWorldBank['Intermedio'];
  const fullQuestions = generate20Questions(selectedLevelBank);
  const activeQuestions = fullQuestions.slice(testPhase * 10, (testPhase + 1) * 10);

  const handleNext = () => {
    const newAnswers = { ...answers, [currentQ]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      let correctCount = 0;
      activeQuestions.forEach((q, idx) => {
        if (newAnswers[idx] === q.correct) correctCount++;
      });
      const score = (correctCount / activeQuestions.length) * 100;
      onSubmitTest(score);
    }
  };

  const q = activeQuestions[currentQ];

  return (
    <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>WORLD TEST: {worldName}</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', display: 'block' }}>
            Fase {testPhase + 1} de 2
          </span>
        </div>
        <span style={{ background: 'var(--bg-panel)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>
          Pregunta {currentQ + 1} de 10
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="glass-panel"
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', border: '2px solid #ef4444' }}
        >
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{q.title}</span>
            <h3 style={{ fontSize: '1.6rem', marginTop: '10px' }}>{q.q}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.options.map((opt, idx) => (
              <div 
                key={idx}
                onClick={() => setSelected(opt)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: `2px solid ${selected === opt ? '#ef4444' : 'var(--border-color)'}`,
                  background: selected === opt ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-panel)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1.1rem'
                }}
              >
                {opt}
              </div>
            ))}
          </div>

          <button 
            className="btn-primary" 
            style={{ marginTop: '10px', opacity: selected ? 1 : 0.5, pointerEvents: selected ? 'auto' : 'none', background: '#ef4444', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}
            onClick={handleNext}
          >
            {currentQ === 9 ? 'Enviar Fase de Test' : 'Siguiente Pregunta'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
