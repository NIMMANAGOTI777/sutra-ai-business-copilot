import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Plus, ArrowRight, Play, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AutomationsView() {
  const { activeBusinessData, addNotification } = useApp();
  const [automations, setAutomations] = useState(activeBusinessData.automations);

  const toggleAutomation = (id) => {
    setAutomations(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.active;
        addNotification(`Automation "${a.name}" ${nextState ? 'enabled' : 'disabled'}`, 'system');
        return { ...a, active: nextState };
      }
      return a;
    }));
  };

  const triggerTestRun = (auto) => {
    alert(`Testing Automation workflow "${auto.name}"...\nTrigger: "${auto.trigger}"\nAction: "${auto.action}"\n\nAI successfully simulated the trigger match and dispatched action!`);
    addNotification(`Test run successful for automation: ${auto.name}`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Workflow Automations</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Create rules that trigger actions based on customer events and AI insights.</p>
        </div>

        <button 
          onClick={() => alert('New Automation Builder is locked in the Demo. Full customization is available in the Professional plan!')}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Custom Automation
        </button>
      </div>

      {/* Grid showing preconfigured rules */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {automations.map((auto) => (
          <div key={auto.id} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
            opacity: auto.active ? 1 : 0.75,
            borderLeft: auto.active ? '3px solid var(--color-purple)' : '3px solid var(--text-muted)'
          }}>
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {auto.name}
                </h3>
                <button
                  onClick={() => toggleAutomation(auto.id)}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: auto.active ? 'var(--color-emerald)' : 'var(--text-muted)'
                  }}
                >
                  {auto.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Trigger description card */}
              <div style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '10px'
              }}>
                <span style={{ fontWeight: 600, color: 'var(--color-purple)', marginRight: '4px' }}>TRIGGER:</span>
                {auto.trigger}
              </div>

              {/* Action details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                <ArrowRight size={12} color="var(--color-emerald)" />
                <span>{auto.action}</span>
              </div>
            </div>

            {/* Test action trigger button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '12px'
            }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Status: {auto.active ? 'Running' : 'Paused'}
              </span>
              <button
                onClick={() => triggerTestRun(auto)}
                className="btn btn-secondary"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.6875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  borderRadius: '6px'
                }}
              >
                <Play size={10} /> Test Run
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
