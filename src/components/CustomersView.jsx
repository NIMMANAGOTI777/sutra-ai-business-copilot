import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, User, TrendingUp, ThumbsUp, ShoppingBag, Clock, Sparkles, Mail, Phone } from 'lucide-react';

export default function CustomersView() {
  const { activeBusinessData } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    activeBusinessData.customers[0]?.id || null
  );

  const customers = activeBusinessData.customers;

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😡';
      default: return '😐';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', margin: '-2rem' }}>
      {/* Left panel: list of directory */}
      <div style={{
        width: '320px',
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Search */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2rem', height: '32px', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        {/* Directory items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredCustomers.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              No profiles found.
            </div>
          ) : (
            filteredCustomers.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCustomerId(c.id)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: selectedCustomerId === c.id ? 'var(--bg-card-hover)' : 'transparent',
                  transition: 'background-color 0.15s'
                }}
              >
                <img src={c.avatar} alt={c.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {c.name}
                    </span>
                    <span style={{ fontSize: '0.6875rem' }}>{getSentimentEmoji(c.sentiment)}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Score: {c.leadScore} • Intent: {c.buyingIntent}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right panel: Details view */}
      {activeCustomer ? (
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyBetween: 'true', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img src={activeCustomer.avatar} alt={activeCustomer.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-purple)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeCustomer.name}</h2>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Customer Account ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{activeCustomer.id}</span></span>
              </div>
            </div>

            {/* Profile Scoring Pill */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Buying Intent</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-purple)' }}>{activeCustomer.buyingIntent}%</span>
              </div>
              <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Lead Score</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-blue)' }}>{activeCustomer.leadScore}</span>
              </div>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(108,76,241,0.04), rgba(79,142,247,0.02))',
            borderColor: 'rgba(108,76,241,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={16} color="var(--color-purple)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                AI Summary & Insights
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontStyle: 'italic' }}>
              "{activeCustomer.aiSummary}"
            </p>
          </div>

          {/* Details list grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {/* Contacts card */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Contact details</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
                <Mail size={14} color="var(--text-secondary)" />
                <span>{activeCustomer.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
                <Phone size={14} color="var(--text-secondary)" />
                <span>{activeCustomer.phone}</span>
              </div>
            </div>

            {/* Sales stats card */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Purchases</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Revenue:</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{activeCustomer.revenue}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Orders:</span>
                <span style={{ fontWeight: 700 }}>{activeCustomer.ordersCount}</span>
              </div>
            </div>

            {/* Products viewed card */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Interests</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {activeCustomer.productsViewed.map((p, idx) => (
                  <span key={idx} className="badge badge-purple" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Splits for timeline and internal notes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Timeline */}
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Customer Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeCustomer.timeline.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.8125rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-purple)', flexShrink: 0 }} />
                      {idx !== activeCustomer.timeline.length - 1 && (
                        <div style={{ width: '1px', flex: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                      <span style={{ color: 'var(--text-primary)', lineHeight: '1.3' }}>{item.content}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Internal Notes</h3>
              <textarea
                className="form-input"
                rows={5}
                defaultValue={activeCustomer.notes}
                placeholder="Write private notes about preferences, details, or appointments..."
                style={{ fontSize: '0.8125rem', borderRadius: '10px', resize: 'none', lineHeight: '1.4', flex: 1 }}
              />
              <button 
                onClick={() => alert('Notes updated successfully!')}
                className="btn btn-secondary" 
                style={{ fontSize: '0.75rem', padding: '6px 12px', alignSelf: 'flex-end', borderRadius: '6px' }}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          No customer selected.
        </div>
      )}
    </div>
  );
}
