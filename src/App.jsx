import React, { useState } from 'react';
import WorldMap, { worldsData } from './components/WorldMap';
import SubNodeMap from './components/SubNodeMap';
import QuestionCard from './components/QuestionCard';
import AIEvaluationOverlay from './components/AIEvaluationOverlay';
import TestCard from './components/TestCard';
import TestResultScreen from './components/TestResultScreen';
import './index.css';

function App() {
  const [view, setView] = useState('world-map');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDevMode, setIsDevMode] = useState(false);

  // --- Student State ---
  const [completedWorlds, setCompletedWorlds] = useState([]);
  const [nodeProgressByWorld, setNodeProgressByWorld] = useState({});
  const [testProgressByWorld, setTestProgressByWorld] = useState({});
  const [xp, setXp] = useState(0);

  // --- Dev State (Isolated) ---
  const [devCompletedWorlds, setDevCompletedWorlds] = useState([]);
  const [devNodeProgressByWorld, setDevNodeProgressByWorld] = useState({});
  const [devTestProgressByWorld, setDevTestProgressByWorld] = useState({});
  const [devXp, setDevXp] = useState(0);

  const [testScore, setTestScore] = useState(0);

  // Dynamic state getters based on mode
  const activeCompletedWorlds = isDevMode ? devCompletedWorlds : completedWorlds;
  const activeNodeProgress = isDevMode ? devNodeProgressByWorld : nodeProgressByWorld;
  const activeTestProgress = isDevMode ? devTestProgressByWorld : testProgressByWorld;
  const activeXp = isDevMode ? devXp : xp;

  // --- XP to Level Logic ---
  const XP_PER_LEVEL = 100;
  const currentLevel = Math.floor(activeXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = activeXp % XP_PER_LEVEL;
  const progressPercent = (currentLevelXp / XP_PER_LEVEL) * 100;

  // --- Handlers ---
  const handleSelectWorld = (worldId) => {
    setSelectedWorld(worldId);
    setView('subnode-map');
  };

  const handleBackToWorldMap = () => {
    setSelectedWorld(null);
    setView('world-map');
  };

  const handleSelectNode = (nodeId) => {
    setSelectedNode(nodeId);
    setView('question');
  };

  const handleSubmitPhase = () => {
    setView('evaluation');
  };

  const handleEvaluationComplete = () => {
    const currentWorldProgress = activeNodeProgress[selectedWorld] || {};
    const currentPhases = currentWorldProgress[selectedNode] || 0;
    const nextPhases = Math.min(currentPhases + 1, 4);

    if (isDevMode) {
      setDevNodeProgressByWorld({
        ...devNodeProgressByWorld,
        [selectedWorld]: { ...currentWorldProgress, [selectedNode]: nextPhases }
      });
      setDevXp(devXp + 10);
    } else {
      setNodeProgressByWorld({
        ...nodeProgressByWorld,
        [selectedWorld]: { ...currentWorldProgress, [selectedNode]: nextPhases }
      });
      setXp(xp + 10);
    }
    setView('subnode-map');
  };

  const handleSkipToTest = () => {
    const all10 = {};
    for (let i = 1; i <= 10; i++) {
      all10[i] = 4;
    }
    
    if (isDevMode) {
      setDevNodeProgressByWorld({
        ...devNodeProgressByWorld,
        [selectedWorld]: all10
      });
    } else {
      setNodeProgressByWorld({
        ...nodeProgressByWorld,
        [selectedWorld]: all10
      });
    }
  };

  const handleSelectTest = () => {
    setView('test');
  };

  const handleSubmitTest = (score) => {
    setTestScore(score);
    setView('test-result');
  };

  const handleTestContinue = () => {
    const currentTestPhase = activeTestProgress[selectedWorld] || 0;
    
    if (testScore >= 70) {
      const newPhase = currentTestPhase + 1;
      const xpGained = newPhase === 2 ? 500 : 250;

      if (isDevMode) {
        setDevTestProgressByWorld({ ...devTestProgressByWorld, [selectedWorld]: newPhase });
        setDevXp(devXp + xpGained);
        if (newPhase === 2 && !devCompletedWorlds.includes(selectedWorld)) {
          setDevCompletedWorlds([...devCompletedWorlds, selectedWorld]);
        }
      } else {
        setTestProgressByWorld({ ...testProgressByWorld, [selectedWorld]: newPhase });
        setXp(xp + xpGained);
        if (newPhase === 2 && !completedWorlds.includes(selectedWorld)) {
          setCompletedWorlds([...completedWorlds, selectedWorld]);
        }
      }

      if (newPhase === 2) {
        setView('world-map');
      } else {
        setView('subnode-map');
      }
    } else {
      setView('subnode-map');
    }
  };

  const handleTestRetry = () => {
    setView('subnode-map');
  };

  const worldName = selectedWorld ? worldsData.find(w => w.id === selectedWorld)?.title : '';
  const nodeProgress = selectedWorld ? (activeNodeProgress[selectedWorld] || {}) : {};
  const currentTestPhase = selectedWorld ? (activeTestProgress[selectedWorld] || 0) : 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: '40px 20px' }}>
      
      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 17, 21, 0.8)', backdropFilter: 'blur(10px)', zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
        <div 
          style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px', cursor: 'pointer' }}
          onClick={handleBackToWorldMap}
        >
          AXIOMANTE <span style={{ color: 'var(--accent-primary)' }}>LEVELING</span>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          
          {/* Dev Mode Toggle */}
          <button 
            onClick={() => setIsDevMode(!isDevMode)}
            style={{ 
              background: isDevMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)', 
              color: isDevMode ? '#ef4444' : 'var(--text-secondary)',
              border: `1px solid ${isDevMode ? '#ef4444' : 'var(--border-color)'}`,
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              transition: 'all 0.2s'
            }}
          >
            {isDevMode ? 'MODO DEV: ON' : 'MODO DEV: OFF'}
          </button>

          {/* Level & XP Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
              <span>Nivel {currentLevel} {isDevMode && <span style={{color: '#ef4444'}}>(DEV)</span>}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{currentLevelXp}/{XP_PER_LEVEL} XP</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-panel)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: isDevMode ? '#ef4444' : 'var(--accent-primary)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-panel)', border: `2px solid ${isDevMode ? '#ef4444' : 'var(--accent-primary)'}`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
            R
          </div>
        </div>
      </header>

      <main style={{ marginTop: '80px', width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'hidden' }}>
        {view === 'world-map' && (
          <WorldMap completedWorlds={activeCompletedWorlds} onSelectWorld={handleSelectWorld} isDevMode={isDevMode} />
        )}
        
        {view === 'subnode-map' && (
          <SubNodeMap 
            worldName={worldName} 
            nodeProgress={nodeProgress} 
            testPhase={currentTestPhase}
            isDevMode={isDevMode}
            onSelectNode={handleSelectNode} 
            onSkipToTest={handleSkipToTest}
            onSelectTest={handleSelectTest}
            onBack={handleBackToWorldMap}
          />
        )}
        
        {view === 'question' && (
          <QuestionCard 
            worldId={selectedWorld} 
            onSubmitPhase={handleSubmitPhase} 
            currentPhase={(nodeProgress[selectedNode] || 0) + 1} 
          />
        )}
        
        {view === 'test' && (
          <TestCard 
            worldId={selectedWorld} 
            worldName={worldName} 
            testPhase={currentTestPhase}
            onSubmitTest={handleSubmitTest} 
          />
        )}
        
        {view === 'test-result' && (
          <TestResultScreen 
            score={testScore} 
            testPhase={currentTestPhase}
            onContinue={handleTestContinue} 
            onRetry={handleTestRetry} 
          />
        )}
      </main>

      {view === 'evaluation' && <AIEvaluationOverlay onComplete={handleEvaluationComplete} />}
      
    </div>
  );
}

export default App;
