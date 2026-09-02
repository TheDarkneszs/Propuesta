import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, CheckCircle2 } from 'lucide-react';

export const worldsData = [
  { id: 1, title: 'Funciones Lineales' },
  { id: 2, title: 'Funciones Cuadráticas' },
  { id: 3, title: 'Conceptos de Geometría' },
  { id: 4, title: 'Aplicaciones del Mundo Real' },
];

export default function WorldMap({ completedWorlds, onSelectWorld, isDevMode }) {
  const currentWorldId = Math.max(...completedWorlds, 0) + 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '40px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
          Multiverso de las Matemáticas
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Selecciona un mundo para comenzar tu viaje de aprendizaje.</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px', paddingBottom: '50px' }}>
        {/* Background line connecting the worlds */}
        <div style={{ position: 'absolute', top: 0, bottom: '80px', width: '6px', background: 'var(--border-color)', zIndex: 0, borderRadius: '3px' }}></div>
        
        {worldsData.map((world, index) => {
          const isCompleted = completedWorlds.includes(world.id);
          const isCurrent = world.id === currentWorldId;
          const isLocked = !isDevMode && world.id > currentWorldId;

          const offset = index % 2 === 0 ? '-80px' : '80px';
          
          let bg = 'var(--bg-panel)';
          let iconColor = 'var(--text-secondary)';
          let glow = 'none';

          if (isCompleted) {
            bg = 'var(--success)';
            iconColor = 'white';
          } else if (isCurrent) {
            bg = 'var(--accent-primary)';
            iconColor = 'white';
            glow = 'var(--glow)';
          }

          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              style={{
                position: 'relative',
                zIndex: 1,
                transform: `translateX(${offset})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                onClick={() => !isLocked && onSelectWorld(world.id)}
                style={{
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: bg,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  boxShadow: glow,
                  border: isLocked ? '3px solid var(--border-color)' : '3px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease',
                  transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseOver={(e) => { if(!isLocked) e.currentTarget.style.transform = isCurrent ? 'scale(1.2)' : 'scale(1.1)' }}
                onMouseOut={(e) => { if(!isLocked) e.currentTarget.style.transform = isCurrent ? 'scale(1.1)' : 'scale(1)' }}
              >
                {isCompleted ? <CheckCircle2 color={iconColor} size={40} /> : isLocked ? <Lock color={iconColor} size={40} /> : <Globe color={iconColor} size={40} />}
              </div>

              <div style={{
                background: 'var(--bg-panel)',
                padding: '8px 16px',
                borderRadius: '12px',
                border: isCurrent ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                textAlign: 'center',
                boxShadow: isCurrent ? '0 4px 15px rgba(139, 92, 246, 0.2)' : 'none',
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  World {world.id}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, color: isLocked ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                  {world.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
