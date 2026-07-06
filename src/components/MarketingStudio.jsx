import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Camera, MessageSquare, Mail, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { MARKETING_CAMPAIGNS } from '../data/mockData';

export default function MarketingStudio() {
  const { activeBusiness } = useApp();
  const campaignsList = MARKETING_CAMPAIGNS[activeBusiness.id] || [];

  const [channel, setChannel] = useState('whatsapp'); // whatsapp, instagram, email
  const [tone, setTone] = useState('promotional'); // professional, friendly, bold, promotional
  const [prompt, setPrompt] = useState(campaignsList[0]?.prompt || 'Launch Weekend Offer');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    subject: campaignsList[0]?.subject || 'Weekend Offer',
    content: campaignsList[0]?.content || 'Hey there! Planning your weekend combos?'
  });
  const [campaignSent, setCampaignSent] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setCampaignSent(false);

    // Simulate AI generation delay
    setTimeout(() => {
      // Find matches in presets or create one
      const matched = campaignsList.find(c => c.channel === channel);
      
      if (matched) {
        setGeneratedContent({
          subject: matched.subject,
          content: matched.content
        });
      } else {
        // Generic fallback generator based on parameters
        const toneAdj = tone === 'bold' ? 'Hurry up! 🔥' : tone === 'friendly' ? 'Hey friend! 😊' : 'Exclusive Deal:';
        setGeneratedContent({
          subject: `${toneAdj} Special Offer from ${activeBusiness.name}`,
          content: `We have something special for you! Use coupon code SUTRA15 to get 15% off your next checkout. Drop by or order online today!`
        });
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handlePublish = () => {
    setCampaignSent(true);
    setTimeout(() => {
      setCampaignSent(false);
      alert(`Campaign successfully published and dispatched to target audience via ${channel.toUpperCase()}!`);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>AI Marketing Studio</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>One-click AI promotional campaign generator for multi-channel broadcasts.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left Card: Generator Settings */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--color-purple)" />
            Campaign Generator
          </h3>

          {/* Channel Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Channel</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {[
                { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: '#10B981' },
                { id: 'instagram', name: 'Instagram', icon: Camera, color: '#EC4899' },
                { id: 'email', name: 'Email', icon: Mail, color: '#4F8EF7' }
              ].map((c) => {
                const Icon = c.icon;
                const isSelected = channel === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setChannel(c.id);
                      // Update prompt to match channel defaults
                      const match = campaignsList.find(item => item.channel === c.id);
                      if (match) {
                        setPrompt(match.prompt);
                        setGeneratedContent({ subject: match.subject, content: match.content });
                      }
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'transparent',
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 600 : 400,
                      borderColor: isSelected ? 'var(--color-purple)' : 'var(--border-color)'
                    }}
                  >
                    <Icon size={14} color={isSelected ? c.color : 'var(--text-secondary)'} />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tone Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaign Tone</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['promotional', 'bold', 'friendly', 'professional'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: tone === t ? 'var(--bg-card-hover)' : 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    color: tone === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                    borderColor: tone === t ? 'var(--color-purple)' : 'var(--border-color)',
                    textTransform: 'capitalize',
                    fontWeight: tone === t ? 600 : 400
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>What do you want to promote?</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="e.g. 15% discount combo for weekend brunches..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ borderRadius: '10px', resize: 'none', lineHeight: '1.4' }}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn btn-primary"
            style={{ width: '100%', height: '40px' }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Generating copy...
              </>
            ) : (
              <>
                <Sparkles size={14} /> Generate Campaign Copy
              </>
            )}
          </button>
        </div>

        {/* Right Card: Social Media Preview Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Device Broadcast Preview
          </h3>

          {/* Simulated Mobile Mock */}
          <div style={{
            width: '100%',
            maxWidth: '340px',
            height: '480px',
            backgroundColor: '#000000',
            borderRadius: '36px',
            border: '8px solid #1f2937',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Phone Top Speaker/Camera */}
            <div style={{
              width: '100px',
              height: '18px',
              backgroundColor: '#1f2937',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30
            }} />

            {/* Simulated app screen header */}
            <div style={{
              height: '44px',
              backgroundColor: channel === 'whatsapp' ? '#075E54' : channel === 'instagram' ? '#121212' : '#f3f4f6',
              color: channel === 'email' ? '#1f2937' : '#ffffff',
              padding: '12px 16px 0',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              zIndex: 10
            }}>
              <span>
                {channel === 'whatsapp' ? 'WhatsApp Business' : channel === 'instagram' ? 'Instagram' : 'Inbox (Email)'}
              </span>
            </div>

            {/* Phone Screen body */}
            <div style={{
              flex: 1,
              backgroundColor: channel === 'whatsapp' ? '#efeae2' : channel === 'instagram' ? '#000000' : '#ffffff',
              color: channel === 'instagram' ? '#ffffff' : '#1f2937',
              padding: '1.25rem 1rem',
              overflowY: 'auto',
              fontSize: '0.8125rem'
            }}>
              {/* WHATSAPP TEMPLATE PREVIEW */}
              {channel === 'whatsapp' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                    maxWidth: '85%',
                    fontSize: '0.75rem',
                    lineHeight: '1.4',
                    borderLeft: '4px solid var(--color-purple)'
                  }}>
                    <span style={{ color: 'var(--color-purple)', fontWeight: 600, display: 'block', marginBottom: '4px', fontSize: '0.6875rem' }}>
                      {generatedContent.subject}
                    </span>
                    {generatedContent.content}
                    <span style={{ display: 'block', fontSize: '0.625rem', color: '#888', marginTop: '6px', textAlign: 'right' }}>
                      Template Code: SUTRA_DISC_15
                    </span>
                  </div>
                </div>
              )}

              {/* INSTAGRAM POST PREVIEW */}
              {channel === 'instagram' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Inst Profile Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-purple)' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.6875rem' }}>{activeBusiness.id}_official</span>
                  </div>

                  {/* Inst Image Mock */}
                  <div style={{
                    height: '160px',
                    backgroundColor: '#1f2937',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#9ca3af',
                    background: 'linear-gradient(135deg, rgba(108,76,241,0.2), rgba(79,142,247,0.2))'
                  }}>
                    <Sparkles size={24} color="var(--color-purple)" />
                    <span style={{ fontSize: '0.6875rem' }}>[AI Generated Image Layout]</span>
                  </div>

                  {/* Inst Caption */}
                  <p style={{ fontSize: '0.75rem', lineHeight: '1.4', marginTop: '4px' }}>
                    <span style={{ fontWeight: 600, marginRight: '6px' }}>{activeBusiness.id}_official</span>
                    {generatedContent.content}
                  </p>
                </div>
              )}

              {/* EMAIL TEMPLATE PREVIEW */}
              {channel === 'email' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '6px' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.6875rem' }}>Subject:</span>
                    <span style={{ fontWeight: 600, marginLeft: '4px', fontSize: '0.75rem' }}>{generatedContent.subject}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                    {generatedContent.content}
                  </p>
                </div>
              )}
            </div>

            {/* Phone bottom control bar */}
            <div style={{
              height: '40px',
              backgroundColor: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <button
                disabled={campaignSent}
                onClick={handlePublish}
                style={{
                  padding: '4px 16px',
                  borderRadius: '16px',
                  backgroundColor: campaignSent ? 'var(--color-emerald)' : 'var(--color-purple)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {campaignSent ? (
                  <>
                    <CheckCircle2 size={12} /> Dispatched!
                  </>
                ) : (
                  <>
                    <Send size={12} /> Publish & Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
