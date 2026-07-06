import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function EmptyState({ 
  title, 
  description, 
  icon: Icon, 
  tip, 
  actionText, 
  onAction 
}) {
  return (
    <div className="glass-card" style={{
      padding: '3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      maxWidth: '480px',
      margin: '4rem auto',
      gap: '1.25rem',
      backgroundColor: 'rgba(9, 9, 11, 0.4)'
    }}>
      {/* Icon Capsule */}
      {Icon && (
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(108, 76, 241, 0.1)',
          border: '1px solid rgba(108, 76, 241, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-purple)'
        }}>
          <Icon size={24} />
        </div>
      )}

      {/* Texts */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          {description}
        </p>
      </div>

      {/* AI Pro-Tip Box */}
      {tip && (
        <div style={{
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(108, 76, 241, 0.04)',
          border: '1px solid rgba(108, 76, 241, 0.15)',
          fontSize: '0.75rem',
          color: '#A78BFA',
          textAlign: 'left',
          width: '100%',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start'
        }}>
          <Sparkles size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span><b>AI Tip:</b> {tip}</span>
        </div>
      )}

      {/* CTA Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary"
          style={{
            marginTop: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8125rem',
            padding: '8px 16px',
            borderRadius: '8px'
          }}
        >
          {actionText} <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
