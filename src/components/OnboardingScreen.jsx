import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { Sparkles, Building, Phone, Mail, MapPin, Users, HelpCircle, ShieldAlert, RefreshCw } from 'lucide-react';

export default function OnboardingScreen() {
  const { user, setProfile, addNotification } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Cafe');
  const [logoUrl, setLogoUrl] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [address, setAddress] = useState('');
  const [employees, setEmployees] = useState('1-5');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!businessName.trim() || !businessPhone.trim() || !businessEmail.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Update database profile
      const { data, error } = await supabase
        .from('profiles')
        .update({
          business_name: businessName,
          business_category: category,
          business_logo: logoUrl || null,
          business_phone: businessPhone,
          business_email: businessEmail,
          business_address: address,
          employees_count: employees,
          onboarded: true
        })
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) throw error;

      setProfile(data);
      addNotification('Business registration setup completed!', 'success');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit onboarding credentials to database.');
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
      position: 'relative',
      overflowY: 'auto'
    }}>
      {/* Background glow */}
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

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '520px' }}>
        
        {/* Onboarding Glassmorphic Form Card */}
        <div className="glass-card pulse-glow-purple" style={{
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          borderColor: 'rgba(108, 76, 241, 0.25)',
          padding: '2rem 2.5rem'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="sutra-logo" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <Sparkles size={24} color="var(--color-purple)" />
              <span>Sutra Onboarding</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
              Register your business profile to configure the AI employee
            </p>
          </div>

          {/* Error Banner */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Grid 1: Name and Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aura Cafe"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', height: '38px', outline: 'none' }}
                >
                  <option value="Cafe">Cafe</option>
                  <option value="Salon">Salon</option>
                  <option value="Gym">Gym</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Retail Store">Retail Store</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Grid 2: Phone and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. info@auracafe.com"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>

            {/* Employees Count & Logo URL */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Number of Employees *</label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', height: '38px', outline: 'none' }}
                >
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21-50">21-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Logo Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Business Address</label>
              <textarea
                placeholder="Enter complete store address..."
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                style={{ borderRadius: '8px', resize: 'none', lineHeight: '1.4' }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', height: '42px', borderRadius: '10px', marginTop: '8px' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Finalizing Profile...
                </>
              ) : (
                <>
                  Complete Workspace Setup
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
