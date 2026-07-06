import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import OnboardingScreen from './components/OnboardingScreen';
import SetupWizard from './components/SetupWizard';
import TeamView from './components/TeamView';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import InboxView from './components/InboxView';
import CopilotView from './components/CopilotView';
import CustomersView from './components/CustomersView';
import MarketingStudio from './components/MarketingStudio';
import AnalyticsView from './components/AnalyticsView';
import ReviewsCenter from './components/ReviewsCenter';
import AutomationsView from './components/AutomationsView';
import IntegrationsView from './components/IntegrationsView';
import SettingsView from './components/SettingsView';
import { RefreshCw } from 'lucide-react';

function AppContent() {
  const { isLandingPage, activeTab, user, profile, profileLoading, workspace } = useApp();

  if (isLandingPage) {
    return <LandingPage />;
  }

  // Standalone public Team page route (no login required)
  if (activeTab === 'team' && !user) {
    return <TeamView standalone={true} />;
  }

  // Protected route guard: Redirect to AuthScreen if unauthenticated
  if (!user) {
    return <AuthScreen />;
  }

  // Loading spinner while profile checks are fetched
  if (profileLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#030305',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontFamily: 'var(--font-sans)'
      }}>
        <RefreshCw size={24} className="animate-spin" color="var(--color-purple)" />
        <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Syncing secure workspace session...</span>
      </div>
    );
  }

  // First-time login: Redirect to onboarding registration
  if (profile && !profile.onboarded) {
    return <OnboardingScreen />;
  }

  // Setup Wizard guard: Force user to configure channels and AI knowledge
  if (workspace && !workspace.setup_completed) {
    return <SetupWizard />;
  }

  // Render view corresponding to selected tab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'inbox':
        return <InboxView />;
      case 'copilot':
        return <CopilotView />;
      case 'customers':
        return <CustomersView />;
      case 'marketing':
        return <MarketingStudio />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reviews':
        return <ReviewsCenter />;
      case 'automations':
        return <AutomationsView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'settings':
        return <SettingsView />;
      case 'team':
        return <TeamView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Inner View Scroll Area */}
        <div className="scrollable-view">
          <div className="dark-gradient-bg" />
          <div style={{ position: 'relative', zIndex: 10 }}>
            {renderActiveView()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
