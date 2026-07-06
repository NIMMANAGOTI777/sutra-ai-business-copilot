import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, Phone, MessageSquare, Megaphone, User, RefreshCw, BarChart } from 'lucide-react';
import { MARKETING_CAMPAIGNS } from '../data/mockData';

export default function CopilotView() {
  const { activeBusiness, activeBusinessData, setActiveTab } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'copilot',
      text: `Hello Rahul! I am your Sutra AI Business Copilot. How can I help you manage ${activeBusiness.name} today?`,
      timestamp: 'Just now'
    }
  ]);
  const [queryInput, setQueryInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetPrompts = [
    { text: "How is my business today?", icon: BarChart },
    { text: "Which customers should I call?", icon: Phone },
    { text: "Generate today's Instagram post", icon: Megaphone },
    { text: "Summarize today's conversations", icon: MessageSquare },
    { text: "Who is likely to buy?", icon: User }
  ];

  const handleQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Append User Message
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let responseObj = {
        id: `c-${Date.now()}`,
        sender: 'copilot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: ''
      };

      const normalized = queryText.toLowerCase().trim();

      if (normalized.includes('business today')) {
        responseObj.text = `Here is your business status at a glance:
• Business Health Score is at **${activeBusinessData.healthScore}%** (Excellent).
• Sales Today are **${activeBusinessData.revenueToday}** across WhatsApp and Google channels.
• You have **${activeBusinessData.unreadMessages} unread enquiries** and **${activeBusinessData.pendingLeads} active leads**.

AI Recommendation: The catering pipeline has ₹22,000 pending. You should confirm the menu with Rahul Mehta.`;
        responseObj.extraData = {
          type: 'kpi',
          data: [
            { label: 'Revenue Today', val: activeBusinessData.revenueToday },
            { label: 'Pending Leads', val: activeBusinessData.pendingLeads },
            { label: 'Health Score', val: `${activeBusinessData.healthScore}%` }
          ]
        };
      } 
      else if (normalized.includes('should i call') || normalized.includes('who to call')) {
        responseObj.text = `Here are the top customers you should contact immediately, sorted by buying intent:`;
        responseObj.extraData = {
          type: 'leads',
          data: activeBusinessData.customers.filter(c => c.leadScore > 75).map(c => ({
            name: c.name,
            intent: `${c.buyingIntent}%`,
            score: c.leadScore,
            phone: c.phone,
            summary: c.aiSummary
          }))
        };
      } 
      else if (normalized.includes('instagram post') || normalized.includes('generate campaign')) {
        const campaign = MARKETING_CAMPAIGNS[activeBusiness.id]?.[1] || MARKETING_CAMPAIGNS[activeBusiness.id]?.[0];
        responseObj.text = `Here is today's recommended campaign copy for **Instagram**:`;
        responseObj.extraData = {
          type: 'campaign',
          data: {
            subject: campaign ? campaign.subject : 'Monsoon Special',
            content: campaign ? campaign.content : 'Rainy days are best for warm, fresh brews! ☕ Grab your favorite combo.'
          }
        };
      } 
      else if (normalized.includes('summarize conversations') || normalized.includes('summary')) {
        responseObj.text = `Summary of today's customer interactions:
• **Rahul Mehta (WhatsApp):** Enquiring about catering for 50 people. Ready to purchase, requested pricing and menu. Buying intent is **94%**.
• **Priya Sharma (Instagram):** Enquired about gluten-free anniversary cakes for this Saturday. Waiting on details.
• **Sneha Reddy (Website):** Asked about weekly freshness of Cold Brew subscription.
• **Amit Patel (Reviews):** Left a 2-star Google review regarding brunch waiting times. Needs urgent resolution.`;
      } 
      else if (normalized.includes('likely to buy') || normalized.includes('lead scoring')) {
        responseObj.text = `Here are the top leads ranked by Purchase Probability:`;
        responseObj.extraData = {
          type: 'scores',
          data: activeBusinessData.customers.map(c => ({
            name: c.name,
            intent: c.buyingIntent,
            score: c.leadScore
          })).sort((a,b) => b.intent - a.intent)
        };
      } 
      else {
        responseObj.text = `I have analyzed your request: "${queryText}". As your copilot, I recommend checking the Unified Inbox to respond to your ${activeBusinessData.unreadMessages} pending customer threads, or launching a targeted marketing campaign in the Marketing Studio.`;
      }

      setMessages(prev => [...prev, responseObj]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--bg-page)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Console Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-sidebar)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--color-purple)" />
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Sutra AI Copilot Console</h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Context: {activeBusiness.name}
        </span>
      </div>

      {/* Message History logs */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {messages.map((m) => {
          const isCopilot = m.sender === 'copilot';
          return (
            <div 
              key={m.id} 
              style={{
                alignSelf: isCopilot ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                gap: '12px',
                flexDirection: isCopilot ? 'row' : 'row-reverse'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isCopilot ? 'rgba(108, 76, 241, 0.1)' : 'rgba(79, 142, 247, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${isCopilot ? 'rgba(108, 76, 241, 0.2)' : 'rgba(79, 142, 247, 0.2)'}`,
                flexShrink: 0
              }}>
                {isCopilot ? <Sparkles size={14} color="var(--color-purple)" /> : <User size={14} color="var(--color-blue)" />}
              </div>

              {/* Message Bubble + Extras */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  backgroundColor: isCopilot ? 'var(--bg-card)' : 'var(--color-purple)',
                  color: isCopilot ? 'var(--text-primary)' : 'white',
                  border: isCopilot ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {m.text}
                </div>

                {/* Extra Data Rendering (Dynamic cards generated in chat) */}
                {isCopilot && m.extraData && (
                  <div style={{ marginTop: '4px' }}>
                    {/* KPI response */}
                    {m.extraData.type === 'kpi' && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {m.extraData.data.map((item, idx) => (
                          <div key={idx} className="glass-card" style={{ padding: '8px 12px', borderRadius: '10px' }}>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{item.val}</h4>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Leads Response cards */}
                    {m.extraData.type === 'leads' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {m.extraData.data.map((lead, idx) => (
                          <div key={idx} className="glass-card" style={{
                            padding: '10px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{lead.name}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lead.summary}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <span className="badge badge-purple">{lead.intent} Intent</span>
                              <button 
                                onClick={() => alert(`Connecting call to ${lead.phone}...`)}
                                className="btn-icon" 
                                style={{ padding: '6px', borderRadius: '6px' }}
                              >
                                <Phone size={12} color="var(--color-emerald)" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Campaign Output */}
                    {m.extraData.type === 'campaign' && (
                      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-purple)' }}>Draft: {m.extraData.data.subject}</span>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderLeft: '2px solid var(--color-purple)', paddingLeft: '8px' }}>
                          "{m.extraData.data.content}"
                        </p>
                        <button 
                          onClick={() => setActiveTab('marketing')}
                          className="btn btn-secondary" 
                          style={{ padding: '4px 8px', fontSize: '0.75rem', alignSelf: 'flex-start', borderRadius: '6px' }}
                        >
                          Open in Marketing Studio
                        </button>
                      </div>
                    )}

                    {/* Lead Score rankings */}
                    {m.extraData.type === 'scores' && (
                      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {m.extraData.data.map((s, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            <span>{idx + 1}. {s.name}</span>
                            <span style={{ color: 'var(--color-purple)', fontWeight: 600 }}>{s.intent}% Probability</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(108, 76, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(108, 76, 241, 0.2)'
            }}>
              <Sparkles size={14} color="var(--color-purple)" />
            </div>
            <div className="glass-card animate-pulse" style={{ padding: '8px 16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)', animationDelay: '0.2s' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)', animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggested Prompts footer panel */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'rgba(9, 9, 11, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {presetPrompts.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => handleQuery(p.text)}
                style={{
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                className="btn-ghost"
              >
                <Icon size={12} color="var(--color-purple)" />
                <span>{p.text}</span>
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Ask anything about your business..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (handleQuery(queryInput), setQueryInput(''))}
            className="form-input"
            style={{ flex: 1, borderRadius: '10px', height: '40px' }}
          />
          <button
            onClick={() => {
              handleQuery(queryInput);
              setQueryInput('');
            }}
            className="btn btn-primary"
            style={{ width: '40px', height: '40px', padding: 0, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyCircle: 'center', justifyContent: 'center' }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
