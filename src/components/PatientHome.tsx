import { QrCode, History, FileCheck, Share2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';

interface PatientHomeProps {
  language: Language;
  patientName: string;
  lastUpdate: string;
  onShowQR: () => void;
  onViewHistory: () => void;
  onViewConsents: () => void;
}

export function PatientHome({ 
  language, 
  patientName,
  lastUpdate,
  onShowQR, 
  onViewHistory,
  onViewConsents
}: PatientHomeProps) {
  const t = translations[language].patient.home;
  
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h2>{t.greeting}, {patientName}</h2>
        <div className="caption" style={{ color: 'var(--neutral-600)' }}>
          {t.lastUpdate}: {new Date(lastUpdate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
        </div>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t.disclaimer}
        </AlertDescription>
      </Alert>
      
      <Button 
        className="w-full h-14"
        size="lg"
        onClick={onShowQR}
        style={{ backgroundColor: 'var(--primary-600)' }}
      >
        <QrCode className="w-5 h-5 mr-2" />
        {t.showQR}
      </Button>
      
      <div className="space-y-3">
        <Card 
          className="cursor-pointer transition-all hover:shadow-md"
          onClick={onViewHistory}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
              {t.history}
            </CardTitle>
            <CardDescription>
              {language === 'es' 
                ? 'Ver todos tus informes genómicos' 
                : 'View all your genomic reports'}
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card 
          className="cursor-pointer transition-all hover:shadow-md"
          onClick={onViewConsents}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
              {t.consents}
            </CardTitle>
            <CardDescription>
              {language === 'es' 
                ? 'Gestionar accesos activos' 
                : 'Manage active access'}
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card 
          className="cursor-pointer transition-all hover:shadow-md"
          onClick={onShowQR}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
              {t.share}
            </CardTitle>
            <CardDescription>
              {language === 'es' 
                ? 'Generar un acceso temporal' 
                : 'Generate temporary access'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
