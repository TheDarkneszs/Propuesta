import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ProficiencyDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ['Principiante', 'Intermedio', 'Avanzado'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'var(--border-color)'}`,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          boxShadow: isOpen ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none'
        }}
        onMouseOver={(e) => { if (!isOpen) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
        onMouseOut={(e) => { if (!isOpen) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
      >
        {value}
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: 'rgba(15, 17, 21, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '140px',
              zIndex: 50,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  background: value === opt ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  color: value === opt ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  fontWeight: value === opt ? 'bold' : 'normal'
                }}
                onMouseOver={(e) => {
                  if (value !== opt) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (value !== opt) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
