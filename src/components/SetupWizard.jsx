import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { 
  Sparkles, Check, ChevronRight, MessageSquare, Camera, Mail, 
  Star, Globe, Image as ImageIcon, Database, Sliders, RefreshCw 
} from 'lucide-react';

export default function SetupWizard() {
  const { user, workspace, setWorkspace, addNotification } = useApp();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1: Channels State
  const [channels, setChannels] = useState({
    whatsapp: false,
    instagram: false,
    gmail: false,
    google_reviews: false,
    website: false
  });

  // Step 2: Assets State
  const [logoUrl, setLogoUrl] = useState(workspace?.business_logo || '');
  const [catalog, setCatalog] = useState('');
  const [services, setServices] = useState('');

  // Step 3: AI Training State
  const [aiDesc, setAiDesc] = useState('');
  const [aiHours, setAiHours] = useState('9:00 AM - 9:00 PM, Daily');
  const [aiPricing, setAiPricing] = useState('');
  const [aiFaqs, setAiFaqs] = useState('');

  const toggleChannel = (key) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNextStep = () => {
    setErrorMsg('');
    setStep(s => s + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(s => s - 1);
  };

  const handleCompleteSetup = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      // Update workspaces table in database
      const { data, error } = await supabase
        .from('workspaces')
        .update({
          business_logo: logoUrl || null,
          connected_channels: channels,
          catalog: catalog,
          services: services,
          ai_description: aiDesc,
          ai_hours: aiHours,
          ai_pricing: aiPricing,
          ai_faqs: aiFaqs,
          setup_completed: true
        })
        .eq('owner_id', user.id)
        .select('*')
        .single();

      if (error) throw error;

      // Update workspace context
      setWorkspace(data);

      // Trigger Onboarding progress alerts
      addNotification('Sutra AI Engine successfully initialized', 'success');
      addNotification('Workspace channels connected', 'system');
      addNotification('Sutra Profile setup completed', 'success');
      addNotification(`Business Command Center initialized (ID: ${data.id.substring(0, 8)})`, 'system');

    } catch (err) {
      setErrorMsg(err.message || 'Failed to complete workspace configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030305',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(108, 76, 241, 0.1), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '560px' }}>
        
        {/* Progress Bar Indicators */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 10px' }}>
          {[
            { s: 1, name: 'Channels' },
            { s: 2, name: 'Knowledge Base' },
            { s: 3, name: 'AI Core Rules' }
          ].map((item) => (
            <div key={item.s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: step >= item.s ? 'var(--color-purple)' : 'var(--bg-card)',
                color: step >= item.s ? 'white' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {step > item.s ? <Check size={12} /> : item.s}
              </div>
              <span style={{ fontSize: '0.8125rem', color: step >= item.s ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: step === item.s ? 600 : 400 }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Form Card */}
        <div className="glass-card pulse-glow-purple" style={{
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          borderColor: 'rgba(108, 76, 241, 0.25)',
          padding: '2.5rem'
        }}>
          {errorMsg && (
            <div style={{
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#FCA5A5',
              fontSize: '0.75rem',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
              marginBottom: '1.25rem'
            }}>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Connect Channels */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Connect Channels</h3>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Select the customer touchpoints you want the AI to unify and monitor.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'whatsapp', name: 'WhatsApp Business', icon: MessageSquare, color: '#10B981', desc: 'Sync DMs and broadcast campaigns' },
                  { id: 'instagram', name: 'Instagram Direct DMs', icon: Camera, color: '#EC4899', desc: 'Auto-reply to stories and messages' },
                  { id: 'gmail', name: 'Gmail Account Sync', icon: Mail, color: '#4F8EF7', desc: 'Monitor and draft catering/leads email' },
                  { id: 'google_reviews', name: 'Google Business Profile', icon: Star, color: '#F59E0B', desc: 'Retrieve reviews and auto-draft ratings replies' },
                  { id: 'website', name: 'Website Chat Widget', icon: Globe, color: '#6C4CF1', desc: 'Live customer chat widget for direct sales' }
                ].map((ch) => {
                  const Icon = ch.icon;
                  const isChecked = channels[ch.id];
                  return (
                    <div
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: `1.5px solid ${isChecked ? 'var(--color-purple)' : 'var(--border-color)'}`,
                        backgroundColor: isChecked ? 'rgba(108,76,241,0.04)' : 'rgba(255,255,255,0.01)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                          <Icon size={18} color={isChecked ? ch.color : 'var(--text-secondary)'} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{ch.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ch.desc}</span>
                        </div>
                      </div>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: isChecked ? 'var(--color-purple)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {isChecked && <Check size={10} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleNextStep}
                className="btn btn-primary"
                style={{ width: '100%', height: '40px', borderRadius: '10px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                Continue Setup <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* STEP 2: Upload Assets / Knowledge Base */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Business Assets & Catalog</h3>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Provide operational parameters to feed the AI Knowledge Base.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Logo Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Product Catalog Details (Optional)</label>
                  <textarea
                    placeholder="List key products, pricing structures, or items to sell..."
                    rows={3}
                    value={catalog}
                    onChange={(e) => setCatalog(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Services & Bookings List (Optional)</label>
                  <textarea
                    placeholder="e.g. Bridal Trials - ₹5,000, Hair Extensions - ₹8,000..."
                    rows={2}
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: 1, borderRadius: '10px' }}>Back</button>
                <button onClick={handleNextStep} className="btn btn-primary" style={{ flex: 2, borderRadius: '10px' }}>Continue</button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Training & operational rules */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Train AI Employee Core</h3>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>These guidelines define what rules the AI uses to draft replies and suggest campaigns.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Description *</label>
                  <textarea
                    required
                    placeholder="Describe what your business does, your core audience, and value proposition..."
                    rows={3}
                    value={aiDesc}
                    onChange={(e) => setAiDesc(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Operational Working Hours *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9:00 AM - 9:00 PM, Daily"
                    value={aiHours}
                    onChange={(e) => setAiHours(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Pricing & Package Guidelines *</label>
                  <textarea
                    required
                    placeholder="e.g. Coffee starting at ₹120, Sandwich combos from ₹250. 10% discount on orders above ₹1,000..."
                    rows={2}
                    value={aiPricing}
                    onChange={(e) => setAiPricing(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Frequently Asked Questions (optional)</label>
                  <textarea
                    placeholder="Q: Do you offer corporate menu options? A: Yes, starting from ₹380 per plate..."
                    rows={2}
                    value={aiFaqs}
                    onChange={(e) => setAiFaqs(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: 1, borderRadius: '10px' }}>Back</button>
                <button
                  onClick={handleCompleteSetup}
                  disabled={loading || !aiDesc.trim() || !aiPricing.trim()}
                  className="btn btn-primary"
                  style={{ flex: 2, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  {loading ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={14} /> Initialize Workspace
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
