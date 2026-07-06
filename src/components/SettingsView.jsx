import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Save, Shield, Eye, Database, Cpu } from 'lucide-react';

export default function SettingsView() {
  const { activeBusiness } = useApp();
  const [profileName, setProfileName] = useState(activeBusiness.name);
  const [email, setEmail] = useState('rahul@dailygrind.com');
  const [autoReply, setAutoReply] = useState(true);
  const [leadThreshold, setLeadThreshold] = useState(80);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Workspace Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Configure profile details, messaging behaviors, and AI tuning parameters.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Settings */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Settings size={16} color="var(--color-purple)" />
            Profile Configuration
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="form-input"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>
        </div>

        {/* AI Autoreply Configuration */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={16} color="var(--color-purple)" />
            AI Copilot Agent Behavior
          </h3>

          {/* Toggle Switch */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Enable Automated Draft Responses</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Suggests pre-composed answers for customer messages based on history.</span>
            </div>
            <button
              type="button"
              onClick={() => setAutoReply(!autoReply)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: autoReply ? 'var(--color-emerald)' : 'var(--text-muted)',
                fontSize: '1.75rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {autoReply ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Range Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Lead Intent Alert Threshold</span>
              <span style={{ fontWeight: 700, color: 'var(--color-purple)' }}>&gt; {leadThreshold}% Intent Probability</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={leadThreshold}
              onChange={(e) => setLeadThreshold(Number(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--color-purple)'
              }}
            />
          </div>
        </div>

        {/* Security & Access */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} color="var(--color-purple)" />
            Security & Authentication Keys
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                <Database size={14} color="var(--text-secondary)" />
                Sutra Database Encryption
              </span>
              <span style={{ color: 'var(--color-emerald)', fontWeight: 600 }}>Enabled (AES-256)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                <Eye size={14} color="var(--text-secondary)" />
                API Client Webhook Signature Verification
              </span>
              <span style={{ color: 'var(--color-emerald)', fontWeight: 600 }}>Active</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', padding: '0.75rem 1.5rem' }}
        >
          <Save size={16} /> Save Settings
        </button>
      </form>
    </div>
  );
}
