import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Star } from 'lucide-react';

const levelsData = [
  { id: 1, title: 'Linear Functions' },
  { id: 2, title: 'Quadratic Functions' },
  { id: 3, title: 'Geometry Basics' },
  { id: 4, title: 'Real-world Applications' },
];

export default function ProgressionMap({ onSelectNode, completedLevels = [] }) {
  const currentLevelId = Math.max(...completedLevels, 0) + 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', gap: '30px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Pre-Calculus Journey
      </h1>
      
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
        {/* Background line connecting nodes */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', background: 'var(--border-color)', zIndex: 0, borderRadius: '2px' }}></div>
        
        {levelsData.map((level, index) => {
          // Determine status
          let status = 'locked';
          if (completedLevels.includes(level.id)) {
            status = 'completed';
          } else if (level.id === currentLevelId) {
            status = 'current';
          }

          // Zigzag offset
          const offset = index % 2 === 0 ? '-60px' : '60px';
          
          let icon;
          let nodeColor;
          let glow = 'none';
          
          if (status === 'completed') {
            icon = <Check size={28} color="white" />;
            nodeColor = 'var(--success)';
          } else if (status === 'current') {
            icon = <Star size={28} color="white" fill="white" />;
            nodeColor = 'var(--accent-primary)';
            glow = 'var(--glow)';
          } else {
            icon = <Lock size={28} color="var(--text-secondary)" />;
            nodeColor = 'var(--bg-panel)';
          }

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              style={{
                position: 'relative',
                zIndex: 1,
                transform: `translateX(${offset})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div 
                onClick={() => status === 'current' && onSelectNode(level.id)}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: nodeColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: status === 'current' ? 'pointer' : 'default',
                  boxShadow: glow,
                  border: status === 'locked' ? '2px solid var(--border-color)' : 'none',
                  transition: 'transform 0.2s ease',
                  transform: status === 'current' ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseOver={(e) => { if(status === 'current') e.currentTarget.style.transform = 'scale(1.2)' }}
                onMouseOut={(e) => { if(status === 'current') e.currentTarget.style.transform = 'scale(1.1)' }}
              >
                {icon}
              </div>
              
              <div style={{ 
                background: 'var(--bg-panel)', 
                padding: '6px 12px', 
                borderRadius: '8px', 
                fontSize: '0.9rem',
                fontWeight: 500,
                border: '1px solid var(--border-color)'
              }}>
                {level.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
