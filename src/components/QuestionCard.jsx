import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({ worldId, currentPhase, onSubmitPhase }) {
  const questions = [
    { q: `Fase ${currentPhase} - P1: Resuelve para x: 3x = 12`, options: ['2', '3', '4', '6'], correct: '4' },
    { q: `Fase ${currentPhase} - P2: Evalúa 2² + 3²`, options: ['10', '13', '25', '5'], correct: '13' },
    { q: `Fase ${currentPhase} - P3: Simplifica 2(x + 3)`, options: ['2x + 3', '2x + 6', 'x + 6', '5x'], correct: '2x + 6' },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    setSelected(null);
    if (currentQ < 2) {
      setCurrentQ(currentQ + 1);
    } else {
      onSubmitPhase();
    }
  };

  const q = questions[currentQ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        maxWidth: '600px',
        width: '100%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Entrenamiento de Nodo • Fase {currentPhase}/4
        </span>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>
          {currentQ + 1} / 3
        </span>
      </div>

      <div>
        <h2 style={{ fontSize: '1.6rem', marginTop: '10px' }}>{q.q}</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {q.options.map((opt, idx) => (
          <div 
            key={idx}
            onClick={() => setSelected(opt)}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: `2px solid ${selected === opt ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              background: selected === opt ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-panel)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              transition: 'all 0.2s ease',
              fontSize: '1.1rem'
            }}
          >
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%', 
              background: selected === opt ? 'var(--accent-primary)' : 'transparent',
              border: `2px solid ${selected === opt ? 'var(--accent-primary)' : 'var(--text-secondary)'}`,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: selected === opt ? 'white' : 'var(--text-secondary)',
              fontWeight: 'bold'
            }}>
              {String.fromCharCode(65 + idx)}
            </div>
            {opt}
          </div>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ marginTop: '10px', opacity: selected ? 1 : 0.5, pointerEvents: selected ? 'auto' : 'none' }}
        onClick={handleNext}
      >
        {currentQ === 2 ? 'Enviar Fase' : 'Siguiente Pregunta'}
      </button>
    </motion.div>
  );
}
