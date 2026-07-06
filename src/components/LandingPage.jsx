import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MessageSquare, Shield, Zap, BarChart3, ArrowRight, Star, ChevronDown, Check } from 'lucide-react';

export default function LandingPage() {
  const { setIsLandingPage, setActiveTab } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    { icon: MessageSquare, title: 'Unified Inbox', desc: 'WhatsApp, Instagram DM, website chat, email, and Google reviews merged in a single smart view.' },
    { icon: Sparkles, title: 'AI Copilot', desc: 'ChatGPT built for your business. Ask for revenue stats, draft campaigns, or identify churn risks.' },
    { icon: Zap, title: 'Workflow Automations', desc: 'Trigger auto-replies, send customer birthday offers, or alert your team on negative reviews.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track sales patterns, lead response speed, satisfaction rates, and conversion funnels.' }
  ];

  const testimonials = [
    { quote: "Sutra acts like an automated general manager. Our booking conversion rate went up 40% in just two weeks because the AI replies to Instagram DMs instantly.", author: "Neha Kapoor", role: "Owner, Aura Premium Salon" },
    { quote: "Instead of copying WhatsApp numbers into spreadsheets, I manage table bookings, catering proposals, and reviews from one clean command center.", author: "Vikram Seth", role: "Manager, The Daily Grind Cafe" }
  ];

  const faqs = [
    { q: "How does the AI understand customer intent?", a: "Sutra uses fine-tuned LLMs trained on local business interactions. It automatically classifies whether a customer wants to book a reservation, complain about service, request pricing, or ask for returns." },
    { q: "Can I connect my actual WhatsApp Business API?", a: "Yes. Sutra supports official WhatsApp API integrations, Instagram webhook integrations, Gmail sync, and Google Business profile API connectors with one-click setup." },
    { q: "Do I need technical skills to build automations?", a: "Not at all. We provide pre-packaged recipes like 'Follow up after 24h of inactivity' or 'Negative Review Alert' that you can toggle with a single switch." }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030305',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto',
      position: 'relative'
    }}>
      {/* Dynamic Background Glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '600px',
        background: 'radial-gradient(circle 800px at 50% -200px, rgba(108, 76, 241, 0.18), transparent)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        top: '800px',
        left: '-200px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(79, 142, 247, 0.05), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header / Navbar */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="sutra-logo">
          <Sparkles size={24} color="var(--color-purple)" />
          <span>Sutra</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            className="btn btn-ghost" 
            onClick={() => { setIsLandingPage(false); setActiveTab('team'); }}
            style={{ color: '#94a3b8' }}
          >
            Meet the Team
          </button>
          <button 
            className="btn btn-ghost" 
            onClick={() => setIsLandingPage(false)}
            style={{ color: '#94a3b8' }}
          >
            Launch Command Center
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setIsLandingPage(false)}
          >
            Enter Demo Workspace
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(108, 76, 241, 0.1)',
          border: '1px solid rgba(108, 76, 241, 0.2)',
          color: '#A78BFA',
          fontSize: '0.8125rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
        }}>
          <Sparkles size={12} />
          <span>Introducing Sutra AI v2.0</span>
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          maxWidth: '850px',
          margin: '0 auto 1.5rem',
          background: 'linear-gradient(to right, #ffffff 30%, #a78bfa 70%, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          The AI Business Copilot for Local Businesses
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#94a3b8',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: '1.6'
        }}>
          One unified AI-powered Command Center that connects WhatsApp, Instagram, Reviews, Website Chat and payments, automating responses and uncovering leads.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setIsLandingPage(false)}
            style={{ padding: '0.875rem 2rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Start Free Trial <ArrowRight size={16} />
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsLandingPage(false)}
            style={{ 
              padding: '0.875rem 2rem', 
              fontSize: '1rem', 
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff'
            }}
          >
            Book Demo
          </button>
        </div>
      </section>

      {/* Features Cards Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Automated Operations. Human Scale.</h2>
          <p style={{ color: '#94a3b8' }}>Ditch traditional CRMs. Manage interactions with an intelligent, automated AI employee.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass-card" style={{
                backgroundColor: 'rgba(13, 13, 17, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.04)',
                textAlign: 'left'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(108, 76, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(108, 76, 241, 0.2)'
                }}>
                  <Icon size={20} color="var(--color-purple)" />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card" style={{
              backgroundColor: 'rgba(13, 13, 17, 0.4)',
              borderColor: 'rgba(255, 255, 255, 0.03)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t.author}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Packages */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Simple, Transparent Pricing</h2>
          <p style={{ color: '#94a3b8' }}>Pick a plan designed to accelerate bookings and reviews.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          {/* Starter Plan */}
          <div className="glass-card" style={{ backgroundColor: 'rgba(13, 13, 17, 0.4)', borderColor: 'rgba(255, 255, 255, 0.04)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Starter</h3>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Best for single cafes, clinics or salons just starting out.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800 }}>$0</span>
              <span style={{ fontSize: '0.875rem', color: '#64748b', marginLeft: '4px' }}>/ forever free</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: '#cbd5e1', marginBottom: '2rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> WhatsApp & IG Chat Integrations</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Basic AI Suggested Replies</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Up to 250 conversations / month</li>
            </ul>
            <button className="btn btn-secondary" onClick={() => setIsLandingPage(false)} style={{ width: '100%', borderRadius: '10px' }}>Get Started</button>
          </div>

          {/* Business Plan (Recommended) */}
          <div className="glass-card pulse-glow-purple" style={{ 
            backgroundColor: 'rgba(20, 20, 28, 0.8)', 
            borderColor: 'rgba(108, 76, 241, 0.4)',
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-purple)',
              color: 'white',
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              Most Popular
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '4px' }}>Professional</h3>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Complete AI capabilities for scaling operations.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800 }}>$49</span>
              <span style={{ fontSize: '0.875rem', color: '#94a3b8', marginLeft: '4px' }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: '#cbd5e1', marginBottom: '2rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Custom fine-tuned AI Copilot console</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Full Google Reviews and Gmail integration</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Automated campaigns & broadcast builder</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="var(--color-emerald)" /> Unlimited conversations & webhook rules</li>
            </ul>
            <button className="btn btn-primary" onClick={() => setIsLandingPage(false)} style={{ width: '100%', borderRadius: '10px' }}>Start 14-day Free Trial</button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '4rem 2rem 8rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((f, idx) => (
            <div key={idx} style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              paddingBottom: '12px'
            }}>
              <button 
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 4px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{f.q}</span>
                <ChevronDown size={16} style={{ 
                  transform: openFaq === idx ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  color: '#94a3b8'
                }} />
              </button>
              {openFaq === idx && (
                <div style={{
                  padding: '4px 4px 12px',
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  lineHeight: '1.6'
                }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#010103',
        padding: '3rem 2rem',
        textAlign: 'center',
        fontSize: '0.8125rem',
        color: '#64748b'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
            <Sparkles size={16} color="var(--color-purple)" />
            <span style={{ fontWeight: 700 }}>Sutra AI</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => { setIsLandingPage(false); setActiveTab('team'); }} 
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0, fontSize: '0.8125rem' }}
              className="btn-ghost"
            >
              Meet the Team
            </button>
            <span>© 2026 Sutra Technologies Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
