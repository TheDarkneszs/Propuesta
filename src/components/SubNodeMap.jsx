import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Lock, Swords, FastForward, ArrowLeft } from 'lucide-react';

export default function SubNodeMap({ worldName, nodeProgress, testPhase, isDevMode, onSelectNode, onSkipToTest, onSelectTest, onBack }) {
  const totalNodes = 10;
  const nodes = Array.from({ length: totalNodes }, (_, i) => i + 1);
  
  let activeNodeId = 1;
  for (let i = 1; i <= totalNodes; i++) {
    if ((nodeProgress[i] || 0) < 4) {
      activeNodeId = i;
      break;
    }
    if (i === totalNodes && nodeProgress[totalNodes] === 4) {
      activeNodeId = totalNodes + 1;
    }
  }

  if (isDevMode) {
    activeNodeId = totalNodes + 1;
  }

  const isTestUnlocked = activeNodeId > totalNodes;
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current && !isDevMode) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeNodeId, isDevMode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '30px', width: '100%' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={onBack} className="btn-secondary" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ArrowLeft size={20} /> Volver
          </button>
          <div>
            <h2 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Explorando</h2>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)' }}>{worldName}</h1>
          </div>
        </div>
        
        {isDevMode && (
          <button onClick={onSkipToTest} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', border: '1px solid #ef4444', color: '#ef4444' }}>
            <FastForward size={16} /> Dev: Saltar al Test
          </button>
        )}
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px', padding: '40px 0' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', background: 'var(--border-color)', zIndex: 0, borderRadius: '2px' }}></div>

        {nodes.map((nodeId, index) => {
          const phases = nodeProgress[nodeId] || 0;
          const isCompleted = phases === 4;
          const isCurrent = nodeId === activeNodeId;
          const isLocked = nodeId > activeNodeId;
          const progressPercent = (phases / 4) * 100;

          const offset = index % 2 === 0 ? '-70px' : '70px';
          
          let icon = <Lock size={20} color="var(--text-secondary)" />;
          let bg = 'var(--bg-panel)';
          let glow = 'none';

          if (isCompleted) {
            icon = <Check size={20} color="white" />;
            bg = 'var(--success)';
          } else if (isCurrent) {
            icon = <Star size={20} color="white" fill="white" />;
            bg = 'var(--accent-primary)';
            glow = 'var(--glow)';
          }

          return (
            <motion.div
              key={nodeId}
              ref={isCurrent ? currentRef : null}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % 5) * 0.05 }}
              style={{
                position: 'relative', zIndex: 1,
                transform: `translateX(${offset})`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
              }}
            >
              <div 
                onClick={() => isCurrent && onSelectNode(nodeId)}
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: isLocked ? 'var(--bg-panel)' : `conic-gradient(var(--accent-secondary) ${progressPercent}%, var(--border-color) 0)`,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: isCurrent ? 'pointer' : 'default',
                  boxShadow: glow,
                  transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                  padding: '4px'
                }}
                onMouseOver={(e) => { if(isCurrent) e.currentTarget.style.transform = 'scale(1.3)' }}
                onMouseOut={(e) => { if(isCurrent) e.currentTarget.style.transform = 'scale(1.2)' }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: bg, display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {icon}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--bg-panel)', padding: '2px 8px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  Nodo {nodeId}
                </span>
                {!isLocked && !isCompleted && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Fase {phases}/4
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {testPhase < 2 && (
          <motion.div
            ref={isTestUnlocked ? currentRef : null}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'relative', zIndex: 1,
              marginTop: '20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
            }}
          >
            <div 
              onClick={() => isTestUnlocked && onSelectTest()}
              style={{
                width: '90px', height: '90px', borderRadius: '16px',
                background: isTestUnlocked ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'var(--bg-panel)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: isTestUnlocked ? 'pointer' : 'not-allowed',
                boxShadow: isTestUnlocked ? '0 0 30px rgba(239, 68, 68, 0.6)' : 'none',
                border: isTestUnlocked ? 'none' : '2px solid var(--border-color)',
                transform: 'rotate(45deg)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { if(isTestUnlocked) e.currentTarget.style.transform = 'rotate(45deg) scale(1.1)' }}
              onMouseOut={(e) => { if(isTestUnlocked) e.currentTarget.style.transform = 'rotate(45deg) scale(1)' }}
            >
              <div style={{ transform: 'rotate(-45deg)' }}>
                {isTestUnlocked ? <Swords size={40} color="white" /> : <Lock size={40} color="var(--text-secondary)" />}
              </div>
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isTestUnlocked ? '#ef4444' : 'var(--text-secondary)', marginTop: '10px', textAlign: 'center' }}>
              WORLD TEST<br />
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>Fase {testPhase + 1} de 2</span>
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
