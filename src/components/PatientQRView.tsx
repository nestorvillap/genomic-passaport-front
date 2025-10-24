import { AlertCircle, WifiOff } from 'lucide-react';
import { QRBlock } from './QRBlock';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';

interface PatientQRViewProps {
  language: Language;
  token: string;
  patientName: string;
  onRegenerate: () => void;
  onHide: () => void;
  isOffline?: boolean;
}

export function PatientQRView({ 
  language, 
  token, 
  patientName,
  onRegenerate,
  onHide,
  isOffline = false
}: PatientQRViewProps) {
  const t = translations[language].patient.qr;
  
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-2 text-center">
        <h3>{t.title}</h3>
        <p className="caption" style={{ color: 'var(--neutral-600)' }}>
          {t.subtitle}
        </p>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t.tokenEphemeral}
        </AlertDescription>
      </Alert>
      
      {isOffline && (
        <Alert style={{ borderColor: 'var(--warning-600)' }}>
          <WifiOff className="h-4 w-4" style={{ color: 'var(--warning-600)' }} />
          <AlertTitle style={{ color: 'var(--warning-600)' }}>
            {t.offlineMode}
          </AlertTitle>
          <AlertDescription>
            {t.offlineWarning}
          </AlertDescription>
        </Alert>
      )}
      
      <QRBlock
        token={token}
        name={patientName}
        initialSeconds={900} // 15 minutes
        onRegenerate={onRegenerate}
        onHide={onHide}
        language={language}
      />
    </div>
  );
}
