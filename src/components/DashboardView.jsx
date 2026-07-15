import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, Users, MessageSquare, AlertCircle, 
  Smile, Sparkles, ChevronRight, Phone, MessageCircle, Megaphone, ArrowRight, Zap
} from 'lucide-react';

export default function DashboardView() {
  const { 
    activeBusiness, activeBusinessData, setActiveTab, 
    completeAction, simulateIncomingWebhook, isPipelineActive,
    profile
  } = useApp();

  const handleActionClick = (action) => {
    if (action.type === 'call') {
      // In a real app we would call. Here we show alert and remove the action card.
      alert(`Simulating Phone Call connection to ${action.title.replace('Call ', '')}...`);
      completeAction(action.id);
    } else if (action.type === 'reply') {
      setActiveTab('inbox');
    } else if (action.type === 'campaign') {
      setActiveTab('marketing');
    }
  };

  // Stats definition for easy mapping
  const stats = [
    { label: 'Revenue Today', value: activeBusinessData.revenueToday, icon: TrendingUp, color: 'var(--color-emerald)', bg: 'rgba(16, 185, 129, 0.08)' },
    { label: 'Pending Leads', value: activeBusinessData.pendingLeads, icon: Users, color: 'var(--color-blue)', bg: 'rgba(79, 142, 247, 0.08)' },
    { label: 'Unread Messages', value: activeBusinessData.unreadMessages, icon: MessageSquare, color: 'var(--color-purple)', bg: 'rgba(108, 76, 241, 0.08)' },
    { label: 'Missed Follow-ups', value: activeBusinessData.missedFollowUps, icon: AlertCircle, color: 'var(--color-rose)', bg: 'rgba(239, 68, 68, 0.08)' },
    { label: 'Customer Satisfaction', value: activeBusinessData.customerSat, icon: Smile, color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.08)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Greeting Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Good Morning, {profile?.full_name || 'Rahul'} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Here is the status of <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeBusiness.name}</span> today.
          </p>
        </div>

        {/* Business Health Score Circle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="glass-card">
          <div style={{ position: 'relative', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justify: 'center' }}>
            {/* Simple circular ring background */}
            <svg style={{ transform: 'rotate(-90deg)', width: '48px', height: '48px' }}>
              <circle cx="24" cy="24" r="20" fill="transparent" stroke="var(--border-color)" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="transparent" stroke="var(--color-purple)" strokeWidth="4" 
                strokeDasharray={`${2 * Math.PI * 20}`} 
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - activeBusinessData.healthScore / 100)}`} 
              />
            </svg>
            <span style={{ position: 'absolute', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeBusinessData.healthScore}%
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Health Score</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-emerald)' }}>Excellent</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {stat.label}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={16} color={stat.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Split Main Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Left Column: AI Summary & Suggest Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Summary Card */}
          <div className="glass-card" style={{ 
            borderColor: 'rgba(108, 76, 241, 0.2)',
            background: 'linear-gradient(135deg, rgba(108, 76, 241, 0.03), rgba(79, 142, 247, 0.02))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Sparkles size={18} color="var(--color-purple)" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Today's AI Intel Briefing</h2>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
              <span className="badge badge-purple">{activeBusinessData.aiSummary.enquiries} Enquiries</span>
              <span className="badge badge-emerald">{activeBusinessData.aiSummary.hotLeads} Hot Leads</span>
              <span className="badge badge-rose">{activeBusinessData.aiSummary.negativeReviews} Critical Alert</span>
              <span className="badge badge-blue">Value {activeBusinessData.aiSummary.estimatedRevenue}</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeBusinessData.aiSummary.bullets.map((bullet, idx) => (
                <li key={idx} style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.5',
                  position: 'relative',
                  paddingLeft: '1.25rem'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    left: '2px', 
                    top: '8px', 
                    width: '5px', 
                    height: '5px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--color-purple)' 
                  }} />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Actions List */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>Proactive Recommendations</h2>
            
            {activeBusinessData.suggestedActions.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textDecoration: 'italic', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.875rem' }}>
                All clear! No recommended actions pending.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeBusinessData.suggestedActions.map((action) => (
                  <div 
                    key={action.id}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      backgroundColor: 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: action.type === 'call' ? 'rgba(16, 185, 129, 0.1)' : action.type === 'reply' ? 'rgba(79, 142, 247, 0.1)' : 'rgba(108, 76, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {action.type === 'call' ? (
                          <Phone size={16} color="var(--color-emerald)" />
                        ) : action.type === 'reply' ? (
                          <MessageCircle size={16} color="var(--color-blue)" />
                        ) : (
                          <Megaphone size={16} color="var(--color-purple)" />
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {action.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {action.description}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleActionClick(action)}
                      className="btn-icon animate-pulse" 
                      style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, color: 'white', backgroundColor: 'var(--color-purple)', borderColor: 'transparent' }}
                    >
                      Action
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Webhook Simulator & Operations Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Simulation Trigger */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02), rgba(79, 142, 247, 0.02))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <Zap size={18} color="var(--color-emerald)" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Interactive Webhook Simulation</h2>
            </div>
            
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Simulate an incoming message from a customer. See the live data stream flow from API webhook connector through normalization and database matching directly into this dashboard in real-time.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '0.75rem', padding: '8px 12px' }}
                disabled={isPipelineActive}
                onClick={() => simulateIncomingWebhook('instagram', 'Kiran Joshi', 'Do you have table bookings open for this Saturday night? Group of 6.')}
              >
                Simulate Instagram DM
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '0.75rem', padding: '8px 12px' }}
                disabled={isPipelineActive}
                onClick={() => simulateIncomingWebhook('whatsapp', 'Vikash Kumar', 'I saw your prices on Shopify, can I place a bulk corporate order?')}
              >
                Simulate WhatsApp Lead
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '0.75rem', padding: '8px 12px' }}
                disabled={isPipelineActive}
                onClick={() => simulateIncomingWebhook('website', 'User #4092', 'Is wifi included in your workspace options?')}
              >
                Simulate Website Chat
              </button>
            </div>

            {isPipelineActive && (
              <div 
                onClick={() => setActiveTab('integrations')}
                style={{ 
                  marginTop: '1rem', 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(108,76,241,0.06)',
                  border: '1px solid rgba(108,76,241,0.12)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pulse-glow-purple" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-purple)' }} />
                  <span style={{ color: 'var(--color-purple)', fontWeight: 600 }}>Real-time Data Processing Pipeline active...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                  <span>View Monitor</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            )}
          </div>

          {/* Activity Logs/Mini Feed */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>Unified Activity Log</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)', marginTop: '6px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>Google Review reply published</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>2h ago for Meera Sen (5 stars)</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-purple)', marginTop: '6px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>Campaign 'July Brew Ethiopia' drafted</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Today, 9:30 AM via Email Channel</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-blue)', marginTop: '6px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>WhatsApp Lead matching completed</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Yesterday, 5:12 PM - Customer: Rahul Mehta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
