import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EmptyState from './EmptyState';
import { 
  MessageSquare, Camera, Star, Mail, Globe, 
  Send, Sparkles, Phone, Mail as MailIcon, AlertCircle, 
  Clock, Heart, ShoppingBag, ThumbsUp, HelpCircle
} from 'lucide-react';

export default function InboxView() {
  const { activeBusinessData, sendSuggestedReply, setActiveTab } = useApp();
  const [selectedConvId, setSelectedConvId] = useState(
    activeBusinessData.conversations[0]?.id || null
  );
  const [filter, setFilter] = useState('all'); // all, unread, high, waiting, completed
  const [replyInput, setReplyInput] = useState('');

  // Automatically update selectedConvId when conversations update
  React.useEffect(() => {
    if (activeBusinessData.conversations.length > 0 && !selectedConvId) {
      setSelectedConvId(activeBusinessData.conversations[0].id);
    }
  }, [activeBusinessData.conversations]);

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare size={14} color="#10B981" />;
      case 'instagram': return <Camera size={14} color="#EC4899" />;
      case 'reviews': return <Star size={14} color="#F59E0B" />;
      case 'email': return <Mail size={14} color="#4F8EF7" />;
      default: return <Globe size={14} color="#6C4CF1" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="badge badge-purple">High Priority</span>;
      case 'urgent': return <span className="badge badge-rose">Urgent</span>;
      case 'completed': return <span className="badge badge-emerald">Completed</span>;
      case 'waiting': return <span className="badge badge-blue">Waiting</span>;
      default: return null;
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😡';
      default: return '😐';
    }
  };

  // filter logic
  const filteredConversations = activeBusinessData.conversations.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'unread') return c.unread;
    if (filter === 'high') return c.priority === 'high' || c.priority === 'urgent';
    if (filter === 'waiting') return c.priority === 'waiting';
    if (filter === 'completed') return c.priority === 'completed';
    return true;
  });

  const activeConv = activeBusinessData.conversations.find(c => c.id === selectedConvId) || activeBusinessData.conversations[0];
  const activeCustomer = activeBusinessData.customers.find(cust => cust.id === activeConv?.customerId);

  const handleSend = () => {
    if (!replyInput.trim() || !activeConv) return;
    sendSuggestedReply(activeConv.id, replyInput);
    setReplyInput('');
  };

  if (activeBusinessData.conversations.length === 0) {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', width: '100%' }}>
        <EmptyState
          title="Unified Inbox is Empty"
          description="Connect your communication channels (WhatsApp, Instagram, Gmail) to automatically sync and reply to messages in one workspace."
          icon={MessageSquare}
          tip="The AI Employee automatically prioritizes high-intent enquiries and drafts responses so you never miss a sale."
          actionText="Connect Channels"
          onAction={() => setActiveTab('integrations')}
        />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      margin: '-2rem', // offset parent padding to fill container
      backgroundColor: 'var(--bg-page)'
    }}>
      {/* COLUMN 1: Conversation List Panel */}
      <div style={{
        width: '320px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-sidebar)',
        flexShrink: 0
      }}>
        {/* Quick Filters */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filters</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['all', 'unread', 'high', 'waiting', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: filter === f ? 'var(--color-purple)' : 'var(--bg-page)',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: filter === f ? 600 : 400,
                  textTransform: 'capitalize'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Cards Scroll Container */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConversations.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              No messages match this filter.
            </div>
          ) : (
            filteredConversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedConvId(c.id)}
                style={{
                  padding: '1.25rem 1rem',
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  backgroundColor: c.id === activeConv?.id ? 'var(--bg-card-hover)' : 'transparent',
                  display: 'flex',
                  gap: '12px',
                  position: 'relative',
                  borderLeft: c.unread ? '3px solid var(--color-purple)' : '3px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={c.avatar}
                    alt={c.customerName}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '50%',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {getChannelIcon(c.channel)}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {c.customerName}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {c.lastMsgTime}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {c.snippet}
                  </span>

                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                    {getPriorityBadge(c.priority)}
                    {c.intent && (
                      <span className="badge badge-blue" style={{ fontSize: '0.625rem', padding: '1px 6px', borderRadius: '4px' }}>
                        {c.intent}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* COLUMN 2: Message Flow Area */}
      {activeConv ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-page)',
          borderRight: '1px solid var(--border-color)'
        }}>
          {/* Active Chat Header */}
          <div style={{
            height: '64px',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-sidebar)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={activeConv.avatar} alt={activeConv.customerName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{activeConv.customerName}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Via {activeConv.channel.toUpperCase()} {getSentimentEmoji(activeConv.sentiment)}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {getPriorityBadge(activeConv.priority)}
            </div>
          </div>

          {/* Messages Logs Box */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {activeConv.messages.map((m) => {
              const isCust = m.sender === 'customer';
              return (
                <div 
                  key={m.id} 
                  className={`chat-bubble ${isCust ? 'customer' : 'agent'}`}
                  style={{
                    alignSelf: isCust ? 'flex-start' : 'flex-end',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <span>{m.content}</span>
                  <span style={{ fontSize: '0.625rem', opacity: 0.7, alignSelf: 'flex-end', fontFamily: 'var(--font-mono)' }}>{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* AI Floating Recommendation Box */}
          {activeConv.priority !== 'completed' && activeConv.aiSuggestedReply && (
            <div style={{
              margin: '0 1.5rem 1rem',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(108, 76, 241, 0.25)',
              backgroundColor: 'rgba(108, 76, 241, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }} className="pulse-glow-purple">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="var(--color-purple)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-purple)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  AI Copilot Recommended Response
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: '1.4' }}>
                "{activeConv.aiSuggestedReply}"
              </p>
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                <button
                  onClick={() => setReplyInput(activeConv.aiSuggestedReply)}
                  className="btn btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  Edit draft
                </button>
                <button
                  onClick={() => sendSuggestedReply(activeConv.id, activeConv.aiSuggestedReply)}
                  className="btn btn-primary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                >
                  Approve & Send
                </button>
              </div>
            </div>
          )}

          {/* Chat Reply Area */}
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-sidebar)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder={`Write response back via ${activeConv.channel.toUpperCase()}...`}
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="form-input"
              style={{ flex: 1, borderRadius: '10px', height: '40px' }}
            />
            <button
              onClick={handleSend}
              className="btn btn-primary"
              style={{ width: '40px', height: '40px', padding: 0, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          No conversations found.
        </div>
      )}

      {/* COLUMN 3: Customer AI Profile Details Overlay */}
      {activeCustomer && (
        <div style={{
          width: '300px',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          {/* Card Info Header */}
          <div style={{
            padding: '1.5rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '8px'
          }}>
            <img 
              src={activeCustomer.avatar} 
              alt={activeCustomer.name} 
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-purple)' }}
            />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{activeCustomer.name}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Customer Profile</span>
            </div>
            
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.625rem' }}>Intent: {activeCustomer.buyingIntent}%</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.625rem' }}>Score: {activeCustomer.leadScore}</span>
            </div>
          </div>

          {/* AI Generated Intelligence Section */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={14} color="var(--color-purple)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                AI Summary
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4', fontStyle: 'italic' }}>
              "{activeCustomer.aiSummary}"
            </p>
          </div>

          {/* Buying Intent Visual Progress Bar */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Buying Intent Probability</span>
              <span style={{ fontWeight: 700, color: 'var(--color-purple)' }}>{activeCustomer.buyingIntent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
              <div style={{ width: `${activeCustomer.buyingIntent}%`, height: '100%', backgroundColor: 'var(--color-purple)', borderRadius: '9999px' }} />
            </div>
          </div>

          {/* Numeric parameters grid */}
          <div style={{
            padding: '1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Revenue Gen</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {activeCustomer.revenue}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Total Orders</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeCustomer.ordersCount}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <MailIcon size={14} />
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{activeCustomer.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <Phone size={14} />
              <span>{activeCustomer.phone}</span>
            </div>
          </div>

          {/* Event Timeline */}
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              Customer Journey Timeline
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
              {activeCustomer.timeline.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-purple)', flexShrink: 0 }} />
                    {idx !== activeCustomer.timeline.length - 1 && (
                      <div style={{ width: '1px', flex: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                    <span style={{ color: 'var(--text-primary)', lineHeight: '1.3' }}>{item.content}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
