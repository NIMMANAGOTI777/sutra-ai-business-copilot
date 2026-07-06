import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Sparkles, Inbox, Users, Megaphone, 
  BarChart3, Star, Zap, Link as LinkIcon, Settings,
  ChevronDown, Building2, Moon, Sun, LogOut, Info
} from 'lucide-react';
import { BUSINESS_PROFILES } from '../data/mockData';

export default function Sidebar() {
  const { 
    currentBusinessId, selectBusiness, activeBusiness, 
    activeTab, setActiveTab, theme, toggleTheme, setIsLandingPage,
    activeBusinessData, logout
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'copilot', label: 'AI Copilot', icon: Sparkles, badge: 'AI' },
    { id: 'inbox', label: 'Unified Inbox', icon: Inbox, badge: activeBusinessData.unreadMessages > 0 ? activeBusinessData.unreadMessages : null, badgeStyle: 'rose' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: activeBusinessData.reviews.filter(r => !r.replied).length || null, badgeStyle: 'warning' },
    { id: 'automations', label: 'Automations', icon: Zap },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'team', label: 'Meet the Team', icon: Info }
  ];

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      zIndex: 40,
      flexShrink: 0
    }}>
      {/* Brand Logo & Business Switcher Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div className="sutra-logo" style={{ cursor: 'pointer' }} onClick={() => setIsLandingPage(true)}>
            <Sparkles size={20} color="var(--color-purple)" />
            <span>Sutra</span>
          </div>
          <button 
            className="btn-icon" 
            onClick={toggleTheme}
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: '8px' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Business Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.625rem 0.875rem',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
              <Building2 size={16} color="var(--color-purple)" style={{ flexShrink: 0 }} />
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {activeBusiness.name}
              </span>
            </div>
            <ChevronDown size={14} style={{ 
              transform: dropdownOpen ? 'rotate(180deg)' : 'none', 
              transition: 'transform 0.2s',
              flexShrink: 0
            }} />
          </button>

          {dropdownOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 50,
                padding: '4px'
              }}
            >
              {BUSINESS_PROFILES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    selectBusiness(b.id);
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '8px 12px',
                    border: 'none',
                    background: b.id === currentBusinessId ? 'var(--bg-card-hover)' : 'transparent',
                    color: 'var(--text-primary)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    textAlign: 'left',
                    fontWeight: b.id === currentBusinessId ? 600 : 400
                  }}
                  className="btn-ghost"
                >
                  <span style={{ color: b.id === currentBusinessId ? 'var(--color-purple)' : 'inherit' }}>
                    {b.name}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {b.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, rgba(108, 76, 241, 0.12), rgba(79, 142, 247, 0.08))' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                  className={isActive ? '' : 'btn-ghost'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon 
                      size={16} 
                      color={isActive ? 'var(--color-purple)' : 'var(--text-secondary)'} 
                      style={{ 
                        transition: 'color 0.15s ease',
                        filter: isActive ? 'drop-shadow(0 0 4px rgba(108, 76, 241, 0.3))' : 'none'
                      }} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span 
                      className={`badge ${
                        item.badgeStyle === 'rose' 
                          ? 'badge-rose' 
                          : item.badgeStyle === 'warning' 
                            ? 'badge-warning' 
                            : 'badge-purple'
                      }`}
                      style={{ 
                        padding: '1px 6px', 
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        borderRadius: '6px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dashboard Footer */}
      <div style={{
        padding: '0.75rem 1.25rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.6875rem',
        color: 'var(--text-muted)',
        lineHeight: '1.4',
        backgroundColor: 'rgba(255, 255, 255, 0.01)'
      }}>
        <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Sutra v1.0.0</div>
        <div style={{ margin: '2px 0 4px' }}>Designed & Built by <span style={{ color: 'var(--color-purple)', fontWeight: 500 }}>Karthik Nimmanagoti</span></div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>Powered by OpenAI • Supabase • React</div>
      </div>

      {/* Profile Footer */}
      <div style={{ 
        padding: '1.25rem', 
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(9, 9, 11, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
            alt="Rahul" 
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-purple)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Rahul 👋
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              rahul@dailygrind.com
            </span>
          </div>
        </div>
        <button 
          className="btn-icon" 
          onClick={logout}
          style={{ width: '32px', height: '32px', border: 'none', padding: 0, background: 'transparent' }}
          title="Logout / Exit Session"
        >
          <LogOut size={14} color="var(--text-secondary)" />
        </button>
      </div>
    </div>
  );
}
