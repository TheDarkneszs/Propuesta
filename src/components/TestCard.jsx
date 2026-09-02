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

const baseLinear = [
  { q: '¿Cuál es la intersección en y de y = 3x - 5?', options: ['3', '-5', '5', '0'], correct: '-5' },
  { q: 'Encuentra la pendiente de la recta que pasa por (1,2) y (3,6)', options: ['2', '4', '1/2', '-2'], correct: '2' },
  { q: '¿Qué ecuación representa una línea horizontal?', options: ['x = 5', 'y = x', 'y = 4', 'y = 4x'], correct: 'y = 4' },
];

const baseQuad = [
  { q: 'Encuentra las raíces de x² - 4 = 0', options: ['x=2, x=-2', 'x=4', 'x=0', 'x=2'], correct: 'x=2, x=-2' },
  { q: '¿Cuál es el vértice de y = x²?', options: ['(1,1)', '(0,0)', '(-1,1)', '(0,1)'], correct: '(0,0)' },
  { q: '¿Cuál es la intersección en y de y = 2x² + 3x + 5?', options: ['2', '3', '5', '0'], correct: '5' }
];

const baseGeo = [
  { q: '¿Cuál es el área de un círculo con radio r=3?', options: ['6π', '9π', '3π', '12π'], correct: '9π' },
  { q: '¿Suma de los ángulos interiores de un triángulo?', options: ['90°', '180°', '360°', '270°'], correct: '180°' },
  { q: '¿Cuál es la hipotenusa si los catetos son 3 y 4?', options: ['5', '7', '12', '25'], correct: '5' }
];

const baseApplied = [
  { q: 'Si un auto viaja a 100 km/h por 2.5 horas, ¿qué distancia recorre?', options: ['200 km', '250 km', '150 km', '300 km'], correct: '250 km' },
  { q: 'Un tanque tiene 50 litros. Si se fuga el 20%, ¿cuántos litros quedan?', options: ['30 L', '40 L', '45 L', '10 L'], correct: '40 L' },
  { q: 'Un corredor completa 5 km en 25 mins. ¿Ritmo en min/km?', options: ['4', '5', '6', '10'], correct: '5' }
];

const testQuestionsData = {
  1: generate20Questions(baseLinear),
  2: generate20Questions(baseQuad),
  3: generate20Questions(baseGeo),
  4: generate20Questions(baseApplied)
};

export default function TestCard({ worldId, worldName, testPhase, onSubmitTest }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const fullQuestions = testQuestionsData[worldId] || testQuestionsData[1];
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
