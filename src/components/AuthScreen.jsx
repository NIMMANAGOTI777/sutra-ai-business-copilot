import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { Sparkles, ShieldAlert, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';

export default function AuthScreen() {
  const { setIsLandingPage, addNotification, loginAsDemo } = useApp();
  
  const [authMethod, setAuthMethod] = useState('google'); // google, phone
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile phone number.');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    
    // Auto-prefix Indian country code (+91) if it is a standard 10-digit number
    let formattedPhone = phone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91${formattedPhone}`;
    } else if (/^\d{12}$/.test(formattedPhone)) {
      formattedPhone = `+${formattedPhone}`;
    } else if (!formattedPhone.startsWith('+')) {
      setErrorMsg('Please provide your phone number with country code (e.g. +919876543210).');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });
      if (error) throw error;
      
      setOtpSent(true);
      setCountdown(60);
      addNotification(`OTP code requested for ${formattedPhone}`, 'system');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to dispatch verification code via SMS.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');

    let formattedPhone = phone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91${formattedPhone}`;
    } else if (/^\d{12}$/.test(formattedPhone)) {
      formattedPhone = `+${formattedPhone}`;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otpCode,
        type: 'sms'
      });
      if (error) throw error;
      
      addNotification('Mobile number verified successfully!', 'success');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to verify verification code.');
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

          {/* Auth method segmented control */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => { setAuthMethod('google'); setErrorMsg(''); }}
              style={{
                flex: 1,
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: authMethod === 'google' ? 'var(--color-purple)' : 'transparent',
                color: authMethod === 'google' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Google
            </button>
            <button
              onClick={() => { setAuthMethod('phone'); setErrorMsg(''); }}
              style={{
                flex: 1,
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: authMethod === 'phone' ? 'var(--color-purple)' : 'transparent',
                color: authMethod === 'phone' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Mobile OTP
            </button>
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
          {authMethod === 'google' && (
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
                    <span style={{ fontWeight: 600 }}>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* MOBILE PHONE OTP VIEW */}
          {authMethod === 'phone' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!otpSent ? (
                /* STEP 1: Send OTP Number input */
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Mobile Phone Number
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        className="form-input"
                        style={{ borderRadius: '8px', letterSpacing: '0.05em' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', height: '40px', borderRadius: '10px' }}
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <>
                        <Smartphone size={14} /> Send OTP Code
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* STEP 2: Verify OTP input */
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        Enter 6-digit Verification Code
                      </label>
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setOtpCode(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-purple)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                      >
                        Change Number
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="######"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      className="form-input"
                      style={{
                        borderRadius: '8px',
                        letterSpacing: '0.5em',
                        textAlign: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 700
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="btn btn-primary"
                    style={{ width: '100%', height: '40px', borderRadius: '10px' }}
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <>Verify & Continue</>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {countdown > 0 ? (
                      <span>Resend code in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        style={{ background: 'none', border: 'none', color: 'var(--color-purple)', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Guest / Demo Bypass Button */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center'
          }}>
            <button
              onClick={loginAsDemo}
              style={{
                background: 'linear-gradient(135deg, rgba(108, 76, 241, 0.1), rgba(96, 165, 250, 0.1))',
                border: '1px solid rgba(108, 76, 241, 0.3)',
                color: '#A78BFA',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                width: '100%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              className="hover-scale"
            >
              <Sparkles size={14} /> Continue with Demo Account (Sandbox)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
