import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bell, Sparkles, AlertCircle, CheckCircle, Database } from 'lucide-react';

export default function Navbar() {
  const { 
    notifications, activeBusiness, searchQuery, setSearchQuery, 
    isPipelineActive, pipelineCurrentStep, setActiveTab,
    demoMode, setDemoMode
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => n.unread).length;

  return (
    <div style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--bg-sidebar)',
      zIndex: 30,
      flexShrink: 0
    }}>
      {/* Left Search Bar */}
      <div style={{ position: 'relative', width: '320px' }}>
        <Search 
          size={16} 
          color="var(--text-secondary)" 
          style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder={`Search customers, leads, campaigns...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.25rem', height: '36px', borderRadius: '10px' }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Demo Mode Toggle Switch */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '9999px',
            backgroundColor: demoMode ? 'rgba(108, 76, 241, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${demoMode ? 'rgba(108, 76, 241, 0.2)' : 'var(--border-color)'}`,
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: demoMode ? '#C084FC' : 'var(--text-secondary)',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          title="Toggle presentation demo data on/off"
        >
          <Database size={12} color={demoMode ? '#C084FC' : 'var(--text-secondary)'} />
          <span>Demo Data: {demoMode ? 'On' : 'Off'}</span>
        </button>

        {/* Live Pipeline Status Pill */}
        <button 
          onClick={() => setActiveTab('integrations')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '9999px',
            backgroundColor: isPipelineActive ? 'rgba(108, 76, 241, 0.12)' : 'rgba(16, 185, 129, 0.08)',
            border: `1px solid ${isPipelineActive ? 'rgba(108, 76, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
            color: isPipelineActive ? '#A78BFA' : 'var(--color-emerald)',
            position: 'relative'
          }}
          className={isPipelineActive ? 'pulse-glow-purple' : ''}
        >
          <span 
            style={{ 
               width: '8px', 
               height: '8px', 
               borderRadius: '50%', 
               backgroundColor: isPipelineActive ? 'var(--color-purple)' : 'var(--color-emerald)',
               display: 'inline-block',
               animation: isPipelineActive ? 'pulse 1s infinite alternate' : 'none'
            }} 
          />
          <span>
            {isPipelineActive 
              ? `AI Pipelines: Processing (${pipelineCurrentStep})`
              : 'AI Engine: Active'
            }
          </span>
        </button>

        {/* Notifications Icon with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn-icon" 
            onClick={() => setNotifOpen(!notifOpen)}
            style={{ 
              position: 'relative', 
              width: '36px', 
              height: '36px', 
              borderRadius: '10px',
              padding: 0
            }}
          >
            <Bell size={16} />
            {unreadNotifs > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--color-rose)',
                color: 'white',
                fontSize: '0.625rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-sidebar)'
              }}>
                {unreadNotifs}
              </span>
            )}
          </button>

          {notifOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 50,
                overflow: 'hidden'
              }}
            >
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{unreadNotifs} unread</span>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        gap: '10px',
                        backgroundColor: notif.unread ? 'rgba(108, 76, 241, 0.03)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ marginTop: '2px' }}>
                        {notif.type === 'lead' ? (
                          <Sparkles size={14} color="var(--color-purple)" />
                        ) : notif.type === 'review' ? (
                          <AlertCircle size={14} color="var(--color-rose)" />
                        ) : (
                          <CheckCircle size={14} color="var(--color-emerald)" />
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                        <span style={{ 
                          fontSize: '0.8125rem', 
                          fontWeight: notif.unread ? 600 : 400,
                          color: 'var(--text-primary)',
                          lineHeight: '1.3'
                        }}>
                          {notif.text}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{notif.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
