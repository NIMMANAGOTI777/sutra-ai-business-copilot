import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, Camera, Star, Mail, Globe, 
  ShoppingBag, CreditCard, Wallet, Share2, Calendar,
  ArrowRight, ShieldCheck, Zap, Database, Cpu, LayoutDashboard, UserCheck
} from 'lucide-react';

export default function IntegrationsView() {
  const { 
    integrations, setIntegrations, simulateIncomingWebhook, 
    pipelineLogs, isPipelineActive, pipelineCurrentStep, addNotification 
  } = useApp();

  const getIntegrationIcon = (iconName) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare size={18} color="#10B981" />;
      case 'Instagram': return <Camera size={18} color="#EC4899" />;
      case 'Star': return <Star size={18} color="#F59E0B" />;
      case 'Mail': return <Mail size={18} color="#4F8EF7" />;
      case 'Globe': return <Globe size={18} color="#6C4CF1" />;
      case 'ShoppingBag': return <ShoppingBag size={18} color="#E11D48" />;
      case 'CreditCard': return <CreditCard size={18} color="#A78BFA" />;
      case 'Pocket': return <Wallet size={18} color="#3B82F6" />;
      case 'Share2': return <Share2 size={18} color="#64748B" />;
      case 'Calendar': return <Calendar size={18} color="#F59E0B" />;
      default: return <Zap size={18} />;
    }
  };

  const toggleConnection = (id, name, currentStatus) => {
    const nextStatus = currentStatus === 'connected' ? 'disconnected' : 'connected';
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));
    addNotification(`${name} connection ${nextStatus === 'connected' ? 'established' : 'disabled'}`, 'system');
  };

  // Pipeline workflow steps matching the attached diagram structure
  const pipelineSteps = [
    { id: 'connector', title: 'Channel Connectors', desc: 'Webhooks & APIs', icon: Globe },
    { id: 'pipeline', title: 'Data Pipeline', desc: 'Normalize & Deduplicate', icon: ShieldCheck },
    { id: 'database', title: 'Customer Database', desc: 'Merge Identity footprints', icon: Database },
    { id: 'ai', title: 'AI Intel Engine', desc: 'NLP, Intents, Scores', icon: Cpu },
    { id: 'dashboard', title: 'Command Center', desc: 'Suggested Actions & Reply', icon: LayoutDashboard }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Visual Pipeline Monitor */}
      <div className="glass-card" style={{
        borderColor: isPipelineActive ? 'rgba(108, 76, 241, 0.4)' : 'var(--border-color)',
        transition: 'border-color 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} color="var(--color-purple)" className={isPipelineActive ? 'animate-spin' : ''} />
              Sutra AI System Pipeline Monitor
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '2px' }}>
              Visual representation of incoming webhook streams passing through data engineering pipelines, customer matching databases, and AI scoring algorithms.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => simulateIncomingWebhook('instagram', 'Kiran Joshi', 'Do you have table bookings open for this Saturday night? Group of 6.')}
              disabled={isPipelineActive}
              className="btn btn-secondary animate-pulse"
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              Simulate Instagram Lead
            </button>
            <button
              onClick={() => simulateIncomingWebhook('whatsapp', 'Vikash Kumar', 'I saw your prices on Shopify, can I place a bulk corporate order?')}
              disabled={isPipelineActive}
              className="btn btn-secondary animate-pulse"
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              Simulate WhatsApp Lead
            </button>
          </div>
        </div>

        {/* Visual flow pipeline blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}>
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = pipelineCurrentStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: `1.5px solid ${isActive ? 'var(--color-purple)' : 'var(--border-color)'}`,
                  backgroundColor: isActive ? 'rgba(108,76,241,0.06)' : 'rgba(255,255,255,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'scale(1.03)' : 'none',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--color-purple)' : 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{step.title}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{step.desc}</span>
                </div>
                {idx !== 4 && (
                  <div style={{ display: 'flex', justifyContent: 'center', color: isActive ? 'var(--color-purple)' : 'var(--border-color)' }}>
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live event logs block */}
        <div style={{
          backgroundColor: '#050507',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          maxHeight: '160px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {pipelineLogs.map((log) => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', color: log.status === 'success' ? 'var(--color-emerald)' : 'var(--text-secondary)' }}>
              <span>[{log.timestamp}] &gt; {log.message}</span>
              <span style={{ color: 'var(--text-muted)' }}>{log.step.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Grid Section */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Channel Connectors</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Manage connections, endpoints, and credentials for your communication nodes.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {integrations.map((item) => (
            <div key={item.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              backgroundColor: 'rgba(255,255,255,0.01)',
              opacity: item.status === 'connected' ? 1 : 0.8
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)'
                  }}>
                    {getIntegrationIcon(item.icon)}
                  </div>
                  <span className={`badge ${item.status === 'connected' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.625rem' }}>
                    {item.status === 'connected' ? 'Connected' : 'Not Connected'}
                  </span>
                </div>

                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '10px'
              }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Sync: Real-time API
                </span>
                <button
                  onClick={() => toggleConnection(item.id, item.name, item.status)}
                  className="btn btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.6875rem', borderRadius: '6px' }}
                >
                  {item.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
