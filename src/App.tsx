import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { PatientHome } from './components/PatientHome';
import { PatientQRView } from './components/PatientQRView';
import { PatientHistory } from './components/PatientHistory';
import { PatientReportDetail } from './components/PatientReportDetail';
import { PatientConsents } from './components/PatientConsents';
import { ClinicianViewer } from './components/ClinicianViewer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { ArrowLeft, User } from 'lucide-react';
import { 
  mockReports, 
  mockFamilyHistory, 
  mockConsents,
  generateMockToken,
  type Report,
  type Consent
} from './lib/mockData';
import type { Language } from './lib/translations';

type View = 
  | 'onboarding'
  | 'patient-home'
  | 'patient-qr'
  | 'patient-history'
  | 'patient-report-detail'
  | 'patient-consents'
  | 'clinician-viewer';

export default function App() {
  const [view, setView] = useState<View>('onboarding');
  const [language, setLanguage] = useState<Language>('es');
  const [currentToken, setCurrentToken] = useState(generateMockToken());
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [consents, setConsents] = useState<Consent[]>(mockConsents);
  const [viewMode, setViewMode] = useState<'patient' | 'clinician'>('patient');
  
  const patientName = "María García";
  
  const handleRegenerateToken = () => {
    setCurrentToken(generateMockToken());
  };
  
  const handleRevokeConsent = (id: string) => {
    setConsents(prev => prev.map(c => 
      c.id === id ? { ...c, active: false } : c
    ));
  };
  
  const handleGenerateConsent = (scope: string, duration: string) => {
    // In a real app, this would create a new consent
    setView('patient-qr');
  };
  
  const renderHeader = () => {
    if (view === 'onboarding') return null;
    
    const isPatientView = viewMode === 'patient';
    const showBackButton = view !== 'patient-home' && view !== 'clinician-viewer';
    
    return (
      <header 
        className="sticky top-0 z-50 p-4"
        style={{ 
          backgroundColor: 'white',
          borderBottom: '1px solid var(--neutral-200)'
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && isPatientView && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setView('patient-home')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            
            <h4 style={{ color: 'var(--primary-700)' }}>
              Genomic Passport
            </h4>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (viewMode === 'patient') {
                  setViewMode('clinician');
                  setView('clinician-viewer');
                } else {
                  setViewMode('patient');
                  setView('patient-home');
                }
              }}
            >
              <User className="w-4 h-4 mr-2" />
              {viewMode === 'patient' 
                ? (language === 'es' ? 'Ver como clínico' : 'View as clinician')
                : (language === 'es' ? 'Ver como paciente' : 'View as patient')
              }
            </Button>
            
            <LanguageSwitcher 
              current={language} 
              onChange={setLanguage}
            />
          </div>
        </div>
      </header>
    );
  };
  
  const renderView = () => {
    switch (view) {
      case 'onboarding':
        return (
          <Onboarding 
            language={language}
            onComplete={() => setView('patient-home')}
          />
        );
      
      case 'patient-home':
        return (
          <PatientHome
            language={language}
            patientName={patientName}
            lastUpdate="2025-09-10"
            onShowQR={() => setView('patient-qr')}
            onViewHistory={() => setView('patient-history')}
            onViewConsents={() => setView('patient-consents')}
          />
        );
      
      case 'patient-qr':
        return (
          <PatientQRView
            language={language}
            token={currentToken}
            patientName={patientName}
            onRegenerate={handleRegenerateToken}
            onHide={() => setView('patient-home')}
            isOffline={false}
          />
        );
      
      case 'patient-history':
        return (
          <PatientHistory
            language={language}
            reports={mockReports}
            onReportClick={(report) => {
              setSelectedReport(report);
              setView('patient-report-detail');
            }}
          />
        );
      
      case 'patient-report-detail':
        return selectedReport ? (
          <PatientReportDetail
            language={language}
            report={selectedReport}
            onBack={() => setView('patient-history')}
          />
        ) : null;
      
      case 'patient-consents':
        return (
          <PatientConsents
            language={language}
            consents={consents.filter(c => c.active)}
            onRevoke={handleRevokeConsent}
            onGenerateNew={handleGenerateConsent}
          />
        );
      
      case 'clinician-viewer':
        return (
          <ClinicianViewer
            language={language}
            token={currentToken}
            reports={mockReports}
            familyHistory={mockFamilyHistory}
            issuer={patientName}
            issueDate="2025-10-24"
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-50)' }}>
      {renderHeader()}
      <main className="pb-8">
        {renderView()}
      </main>
      <Toaster />
    </div>
  );
}
