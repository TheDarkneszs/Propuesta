import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap } from 'lucide-react';

export default function DiagnosticSimulation({ onSelectLevel }) {
  const levels = [
    { id: 'Principiante', icon: Shield, desc: 'Conceptos fundamentales y repaso básico.', color: '#3b82f6' },
    { id: 'Intermedio', icon: Brain, desc: 'Resolución de problemas de complejidad media.', color: '#8b5cf6' },
    { id: 'Avanzado', icon: Zap, desc: 'Desafíos matemáticos y lógica abstracta.', color: '#ef4444' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', width: '100%' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ maxWidth: '600px', width: '100%', padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#ef4444', fontWeight: 'bold', letterSpacing: '1px' }}>SIMULADOR DEV</span>
          <h1 style={{ fontSize: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ingreso de Diagnóstico
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            En la versión final, un examen externo diagnosticará al estudiante. Para este prototipo, simula el resultado inyectando el nivel de destreza a continuación. Esto ajustará la dificultad de toda la aplicación.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
          {levels.map(lvl => (
            <div 
              key={lvl.id}
              onClick={() => onSelectLevel(lvl.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = lvl.color;
                e.currentTarget.style.background = `rgba(${lvl.color === '#ef4444' ? '239, 68, 68' : lvl.color === '#3b82f6' ? '59, 130, 246' : '139, 92, 246'}, 0.1)`;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-panel)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: `rgba(${lvl.color === '#ef4444' ? '239, 68, 68' : lvl.color === '#3b82f6' ? '59, 130, 246' : '139, 92, 246'}, 0.2)`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: lvl.color }}>
                <lvl.icon size={24} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{lvl.id}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{lvl.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
