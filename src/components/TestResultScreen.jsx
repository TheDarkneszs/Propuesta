import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowRight, RotateCcw, Swords } from 'lucide-react';

export default function TestResultScreen({ score, testPhase, onContinue, onRetry }) {
  const passed = score >= 70;
  
  const isPhase1 = testPhase === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        maxWidth: '500px',
        width: '100%',
        padding: '50px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        border: `2px solid ${passed ? 'var(--success)' : 'var(--error)'}`
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
      >
        {passed ? <ShieldCheck size={80} color="var(--success)" /> : <ShieldAlert size={80} color="var(--error)" />}
      </motion.div>
      
      <h2 style={{ fontSize: '2.5rem', color: passed ? 'var(--success)' : 'var(--error)' }}>
        {score}%
      </h2>
      
      <h3>
        {!passed ? 'Entrenamiento Requerido' : (isPhase1 ? '¡Fase 1 Dominada!' : '¡Mundo Dominado!')}
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px' }}>
        {passed 
          ? (isPhase1 
              ? "¡Excelente trabajo! Has superado la Fase 1 (Estándar) con más del 70%. Ahora puedes enfrentarte a la Fase 2 cuando estés listo."
              : "¡Increíble! Has dominado completamente este mundo superando ambas fases. El siguiente mundo está desbloqueado.")
          : "Obtuviste menos del 70% requerido. ¡Repasa los conceptos y vuelve a intentarlo!"}
      </p>

      {passed ? (
        <button className="btn-primary" onClick={onContinue} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          {isPhase1 ? <><Swords size={20} /> Continuar al Mapa</> : <><ArrowRight size={20} /> Continuar al Multiverso</>}
        </button>
      ) : (
        <button className="btn-primary" onClick={onRetry} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', color: 'white' }}>
          <RotateCcw size={20} /> Reintentar Fase {testPhase + 1}
        </button>
      )}
    </motion.div>
  );
}
