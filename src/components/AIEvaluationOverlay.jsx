import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, ArrowRight, PlayCircle, Lightbulb } from 'lucide-react';

export default function AIEvaluationOverlay({ onComplete }) {
  const [phase, setPhase] = useState('evaluating'); // evaluating -> result

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('result');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 17, 21, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '800px' }}>
        <AnimatePresence mode="wait">
          {phase === 'evaluating' ? (
            <motion.div 
              key="eval"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  boxShadow: ['0 0 0px var(--accent-primary)', '0 0 40px var(--accent-primary)', '0 0 0px var(--accent-primary)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: '100px', height: '100px', borderRadius: '50%',
                  background: 'var(--bg-panel)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  border: '2px solid var(--accent-primary)'
                }}
              >
                <Brain size={48} color="var(--accent-primary)" />
              </motion.div>
              <h2 style={{ fontSize: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
                Modelo de IA Analizando tu Lógica...
              </h2>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}
            >
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={60} color="var(--success)" style={{ marginBottom: '10px' }} />
                <h2 style={{ fontSize: '2rem', color: 'white' }}>Fase Completada</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)' }}>
                    <Lightbulb size={24} />
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Análisis Cognitivo de IA</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Basado en tus tiempos de respuesta y elecciones, demostraste un sólido dominio del razonamiento deductivo. Identificaste rápidamente los distractores. Sin embargo, hubo una ligera duda en los pasos de abstracción.
                  </p>
                  <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                    <strong>Perfil:</strong> Pensador Analítico 🧠
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
                    <PlayCircle size={24} />
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Recomendado para ti</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Para fortalecer tus habilidades de abstracción antes del World Test, te recomendamos revisar esta breve explicación.
                  </p>
                  
                  <a 
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #ef4444',
                      color: '#ef4444',
                      padding: '12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  >
                    <PlayCircle size={20} /> Ver Video Lección
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ background: 'var(--bg-panel)', padding: '15px 30px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Progreso de Fase</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>+10 XP</span>
                </div>

                <button className="btn-primary" onClick={onComplete} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px' }}>
                  Continuar al Mapa <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
