import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { 
  Sparkles, ArrowLeft, ExternalLink, 
  Mail, Award, Database, Cpu, Compass, Flag 
} from 'lucide-react';

// Custom inline SVG icons for brand networks missing from local lucide package
const LinkedInIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Fallback seed team data to guarantee render even without database tables initialized
const fallbackTeam = [
  {
    id: 'karthik-founder',
    full_name: 'Karthik Nimmanagoti',
    role: 'Founder & Product Manager',
    bio: 'Karthik Nimmanagoti is the creator of Sutra, an AI-powered Business Copilot designed to help local businesses manage customer interactions from a single intelligent workspace. His vision is to reduce operational complexity by combining AI, automation, and modern product design into one seamless experience.',
    quote: 'Building AI products that make business simpler, smarter, and more human.',
    avatar_url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg',
    responsibilities: [
      'Product Strategy', 'Product Management', 'UI/UX Design', 
      'AI Experience Design', 'Frontend Development', 'Brand Identity', 'System Architecture'
    ],
    skills: [
      'Product Management', 'UI/UX Design', 'React', 
      'Supabase', 'AI Products', 'Branding', 'Marketing Strategy'
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/karthik-nimmanagoti-52a403324',
      github: 'https://github.com/NIMMANAGOTI777',
      instagram: 'https://www.instagram.com/nimmanagoti.karthik/',
      email: 'mailto:karthik@sutra.ai'
    },
    is_featured: true
  },
  {
    id: 'ahladini-rd',
    full_name: 'Y Ahladini Sindhu Sri',
    role: 'R&D Lead & AI Engineer',
    bio: 'Y Ahladini Sindhu Sri is an R&D Lead specializing in artificial intelligence, machine learning, and natural language processing. She drives research and development initiatives at Sutra, designing advanced algorithms and intelligent pipelines that empower local businesses with state-of-the-art automation.',
    quote: 'Driving innovation by translating cutting-edge AI research into real-world business value.',
    avatar_url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1783339293/WhatsApp_Image_2026-07-06_at_5.30.28_PM_zfsz9i.jpg',
    responsibilities: [
      'AI Research & Innovation', 'Algorithm Design & Tuning', 'NLP & Large Language Models', 
      'Data Pipeline Architecture', 'Predictive Modeling', 'Performance Optimization', 'System Integration'
    ],
    skills: [
      'Python', 'C', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Web Design', 
      'UI Development', 'Cross-Browser Compatibility', 'Computer Networks', 'VLAN Configuration', 
      'Static Routing', 'DHCP', 'Network Troubleshooting', 'Cisco Packet Tracer', 'Linux', 
      'Database Design', 'OOP', 'Debugging', 'Git/GitHub', 'ChatGPT', 'Claude AI', 'AI-Assisted Development'
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/ahladinisindhusriyenumula',
      email: 'mailto:ahladini@sutra.ai'
    },
    is_featured: false
  },
  {
    id: 'amrutha-rd',
    full_name: 'Dornala Amrutha Varshini',
    role: 'R&D Engineer & Full-Stack Developer',
    bio: 'Dornala Amrutha Varshini is an R&D Engineer specializing in full-stack web development, backend automation, and database design. She builds responsive frontend architectures and engineers robust workflow automation pipelines utilizing modern tools like Node.js, Python, and n8n.',
    quote: 'Building intelligent workflows and seamless user experiences to solve real-world challenges.',
    avatar_url: '/WhatsApp Image 2026-07-06 at 5.53.01 PM (1).jpeg',
    responsibilities: [
      'Frontend Development', 'Workflow Automation & n8n', 'Backend Service Integration', 
      'Database Schema & Query Tuning', 'System Testing & Optimization'
    ],
    skills: [
      'HTML & CSS', 'Tailwind CSS', 'React', 'Node.js', 
      'Python', 'MySQL', 'LLMs & Generative AI', 'n8n Workflows'
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/amruthadornala30',
      github: 'https://github.com/amruthadornala30',
      email: 'mailto:amruthadornala30@gmail.com'
    },
    is_featured: false
  }
];

export default function TeamView({ standalone = false }) {
  const { setIsLandingPage, setActiveTab } = useApp();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMemberId, setActiveMemberId] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setTeam(data);
          const featured = data.find(m => m.is_featured) || data[0];
          setActiveMemberId(featured.id);
        } else {
          setTeam(fallbackTeam);
          setActiveMemberId(fallbackTeam[0].id);
        }
      } catch (err) {
        console.warn('Failed to load team_members from Supabase, using local fallback:', err);
        setTeam(fallbackTeam);
        setActiveMemberId(fallbackTeam[0].id);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  const handleBack = () => {
    if (standalone) {
      setIsLandingPage(true);
    } else {
      setActiveTab('dashboard');
    }
  };

  const activeMember = team.find(m => m.id === activeMemberId) || team.find(m => m.is_featured) || team[0] || fallbackTeam[0];
  const founder = team.find(m => m.is_featured) || fallbackTeam[0];

  return (
    <div style={{
      minHeight: standalone ? '100vh' : 'auto',
      backgroundColor: standalone ? '#030305' : 'transparent',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans)',
      padding: standalone ? '3rem 2rem' : '0',
      position: 'relative'
    }}>
      {/* Background radial glows for standalone page */}
      {standalone && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(108, 76, 241, 0.12), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}

      {/* Standalone Navigation Bar */}
      {standalone && (
        <header style={{
          maxWidth: '1000px',
          margin: '0 auto 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div className="sutra-logo" style={{ cursor: 'pointer' }} onClick={() => setIsLandingPage(true)}>
            <Sparkles size={24} color="var(--color-purple)" />
            <span>Sutra</span>
          </div>
          <button 
            onClick={handleBack}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}
          >
            <ArrowLeft size={14} /> Back to Landing Page
          </button>
        </header>
      )}

      {/* Main Content Layout */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem'
      }}>
        
        {/* View Header */}
        {!standalone && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Meet the Team</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>The builders and product strategy minds behind Sutra AI Command Center.</p>
            </div>
            <button 
              onClick={handleBack}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8125rem' }}
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Syncing team cards...</span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
            
            {/* COLUMN 1: Active Member details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Premium Profile Card */}
              <div className="glass-card pulse-glow-purple" style={{
                position: 'relative',
                padding: '2.5rem',
                backgroundColor: 'rgba(9, 9, 11, 0.7)',
                borderColor: activeMember.is_featured ? 'rgba(108, 76, 241, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                gap: '2rem',
                alignItems: 'center'
              }}>
                {/* Visual Glow overlay */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: activeMember.is_featured 
                    ? 'radial-gradient(circle, rgba(108, 76, 241, 0.15), transparent 70%)'
                    : 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)',
                  pointerEvents: 'none'
                }} />

                {/* Profile Image with Gradient Border */}
                <div style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  padding: '3px',
                  background: activeMember.is_featured
                    ? 'linear-gradient(135deg, var(--color-purple), #a78bfa, #60a5fa)'
                    : 'linear-gradient(135deg, var(--color-emerald), #34d399, #60a5fa)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'transform 0.3s ease'
                }} className="hover-scale">
                  <img 
                    src={activeMember.avatar_url} 
                    alt={activeMember.full_name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '13px',
                      objectFit: 'cover',
                      backgroundColor: '#09090b'
                    }}
                  />
                </div>

                {/* Info Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0, flex: 1 }}>
                  {/* Badge */}
                  <div style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: activeMember.is_featured ? 'rgba(108, 76, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    border: activeMember.is_featured ? '1px solid rgba(108, 76, 241, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                    color: activeMember.is_featured ? '#C084FC' : '#34D399',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <Award size={10} /> {activeMember.is_featured ? 'Featured Founder' : 'Core R&D'}
                  </div>

                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
                    {activeMember.full_name}
                  </h2>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {activeMember.role}
                  </span>

                  {/* Quote */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#cbd5e1',
                    fontStyle: 'italic',
                    borderLeft: activeMember.is_featured ? '2.5px solid var(--color-purple)' : '2.5px solid var(--color-emerald)',
                    paddingLeft: '12px',
                    margin: '6px 0 0',
                    lineHeight: '1.4'
                  }}>
                    "{activeMember.quote}"
                  </p>
                </div>
              </div>

              {/* Bio & Details Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                    About {activeMember.full_name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {activeMember.bio}
                  </p>
                </div>

                {/* Responsibilities Tags */}
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Responsibilities
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeMember.responsibilities?.map((item) => (
                      <span key={item} style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        color: 'var(--text-primary)'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Tags */}
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeMember.skills?.map((item) => (
                      <span key={item} style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: activeMember.is_featured ? 'rgba(108, 76, 241, 0.03)' : 'rgba(16, 185, 129, 0.03)',
                        border: activeMember.is_featured ? '1px solid rgba(108, 76, 241, 0.12)' : '1px solid rgba(16, 185, 129, 0.12)',
                        fontSize: '0.75rem',
                        color: activeMember.is_featured ? '#A78BFA' : '#34D399'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Channels */}
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Connect & Socials
                  </h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {activeMember.socials?.linkedin && (
                      <a href={activeMember.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', borderRadius: '8px', padding: '6px 12px' }}>
                        <LinkedInIcon size={12} /> LinkedIn
                      </a>
                    )}
                    {activeMember.socials?.instagram && (
                      <a href={activeMember.socials.instagram} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', borderRadius: '8px', padding: '6px 12px' }}>
                        <InstagramIcon size={12} /> Instagram
                      </a>
                    )}
                    {activeMember.socials?.github && (
                      <a href={activeMember.socials.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', borderRadius: '8px', padding: '6px 12px' }}>
                        <GitHubIcon size={12} /> GitHub
                      </a>
                    )}
                    {activeMember.socials?.portfolio && (
                      <a href={activeMember.socials.portfolio} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', borderRadius: '8px', padding: '6px 12px' }}>
                        <ExternalLink size={12} /> Portfolio
                      </a>
                    )}
                    {activeMember.socials?.email && (
                      <a href={activeMember.socials.email} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', borderRadius: '8px', padding: '6px 12px' }}>
                        <Mail size={12} /> Email
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* COLUMN 2: Directory & Team Statistics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Team Directory Card */}
              <div className="glass-card" style={{
                backgroundColor: 'rgba(9, 9, 11, 0.4)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Team Directory
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {team.map((member) => {
                    const isActive = member.id === activeMember.id;
                    const isHovered = hoveredMemberId === member.id;
                    return (
                      <div 
                        key={member.id}
                        onClick={() => setActiveMemberId(member.id)}
                        onMouseEnter={() => setHoveredMemberId(member.id)}
                        onMouseLeave={() => setHoveredMemberId(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px',
                          borderRadius: '10px',
                          backgroundColor: isActive 
                            ? 'rgba(108, 76, 241, 0.08)' 
                            : (isHovered ? 'rgba(255, 255, 255, 0.03)' : 'transparent'),
                          border: isActive 
                            ? '1px solid rgba(108, 76, 241, 0.3)' 
                            : '1px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isActive 
                            ? '2px solid var(--color-purple)' 
                            : '1px solid var(--border-color)',
                          flexShrink: 0
                        }}>
                          <img 
                            src={member.avatar_url} 
                            alt={member.full_name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span style={{ 
                            fontSize: '0.8125rem', 
                            fontWeight: 600, 
                            color: isActive ? 'white' : 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {member.full_name}
                          </span>
                          <span style={{ 
                            fontSize: '0.72rem', 
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {member.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Statistics Card */}
              <div className="glass-card" style={{
                backgroundColor: 'rgba(9, 9, 11, 0.4)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Team Statistics
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  
                  {[
                    { label: 'Founder', val: founder.full_name, icon: Award },
                    { label: 'Product', val: 'Sutra Command Center', icon: Compass },
                    { label: 'Version', val: 'v1.0.0', icon: Database },
                    { label: 'Core Stack', val: 'React + Supabase', icon: Cpu },
                    { label: 'Origin', val: 'Made in India 🇮🇳', icon: Flag }
                  ].map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                        paddingBottom: '8px',
                        borderBottom: idx < 4 ? '1px solid rgba(255,255,255,0.03)' : 'none'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                          <StatIcon size={12} color="var(--color-purple)" />
                          <span>{stat.label}</span>
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stat.val}</span>
                      </div>
                    );
                  })}

                </div>

                <div style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(108,76,241,0.04)',
                  fontSize: '0.6875rem',
                  color: '#C084FC',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  ✨ AI-Powered Business Workspace Active
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
