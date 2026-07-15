import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { Sparkles, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';

export default function AuthScreen() {
  const { setIsLandingPage } = useApp();
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      setErrorMsg(err.message || 'Failed to initialize Google Sign-In session.');
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
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background radial glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(108, 76, 241, 0.12), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => setIsLandingPage(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            padding: 0
          }}
          className="btn-ghost"
        >
          <ArrowLeft size={14} /> Back to Landing Page
        </button>

        {/* Auth Glassmorphism Card */}
        <div className="glass-card pulse-glow-purple" style={{
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          borderColor: 'rgba(108, 76, 241, 0.25)',
          padding: '2.5rem'
        }}>
          {/* Logo & Subtitle */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="sutra-logo" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <Sparkles size={24} color="var(--color-purple)" />
              <span>Sutra</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
              Sign in to access your Business Command Center
            </p>
          </div>

          {/* Alerts / Error Panel */}
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
              <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* GOOGLE AUTHENTICATION VIEW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-secondary"
              style={{
                width: '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1'
              }}
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <>
                  {/* SVG Google G Logo */}
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.66-.62-1.09-1.37-1.18-2.09l1.99-1.54z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span style={{ fontWeight: 600 }}>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
