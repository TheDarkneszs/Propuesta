import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({ worldId, currentPhase, onSubmitPhase, onCancelPhase }) {
  const questions = [
    { q: `Fase ${currentPhase} - P1: Resuelve para x: 3x = 12`, options: ['2', '3', '4', '6'], correct: '4' },
    { q: `Fase ${currentPhase} - P2: Evalúa 2² + 3²`, options: ['10', '13', '25', '5'], correct: '13' },
    { q: `Fase ${currentPhase} - P3: Simplifica 2(x + 3)`, options: ['2x + 3', '2x + 6', 'x + 6', '5x'], correct: '2x + 6' },
    { q: `Fase ${currentPhase} - P4: ¿Cuál es el valor de y si y = 2x - 1 y x = 3?`, options: ['4', '5', '6', '7'], correct: '5' },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    const newAnswers = { ...answers, [currentQ]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (newAnswers[idx] === q.correct) correct++;
      });
      const finalScore = Math.round((correct / questions.length) * 100);
      setScore(finalScore);
      setShowResult(true);
    }
  };

  if (showResult) {
    const passed = score >= 70;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{ maxWidth: '400px', width: '100%', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center', border: `2px solid ${passed ? 'var(--success)' : 'var(--error)'}` }}
      >
        <h2 style={{ fontSize: '2.5rem', color: passed ? 'var(--success)' : 'var(--error)', margin: 0 }}>{score}%</h2>
        <h3 style={{ margin: 0 }}>{passed ? '¡Fase Superada!' : 'Entrenamiento Fallido'}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          {passed ? 'Excelente trabajo. Haz clic en continuar para que la IA evalúe tu progreso.' : 'Necesitas al menos 70% para aprobar esta fase. Revisa los conceptos e inténtalo de nuevo.'}
        </p>
        
        {passed ? (
          <button className="btn-primary" onClick={onSubmitPhase} style={{ marginTop: '10px', width: '100%' }}>
            Continuar a Evaluación
          </button>
        ) : (
          <button className="btn-secondary" onClick={onCancelPhase} style={{ marginTop: '10px', width: '100%', border: '1px solid var(--border-color)' }}>
            Volver al Mapa
          </button>
        )}
      </motion.div>
    );
  }

  const q = questions[currentQ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        maxWidth: '600px',
        width: '100%',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Entrenamiento de Nodo • Fase {currentPhase}/4
        </span>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>
          {currentQ + 1} / {questions.length}
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
              padding: '12px 16px',
              borderRadius: '10px',
              border: `2px solid ${selected === opt ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              background: selected === opt ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-panel)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              fontSize: '1.05rem'
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
        {currentQ === questions.length - 1 ? 'Enviar Respuestas' : 'Siguiente Pregunta'}
      </button>
    </motion.div>
  );
}
