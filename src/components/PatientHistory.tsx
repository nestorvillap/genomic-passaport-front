import { Timeline } from './Timeline';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import type { Report } from '../lib/mockData';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';

interface PatientHistoryProps {
  language: Language;
  reports: Report[];
  onReportClick: (report: Report) => void;
}

export function PatientHistory({ language, reports, onReportClick }: PatientHistoryProps) {
  const t = translations[language].patient.history;
  
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div>
        <h2>{t.title}</h2>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {translations[language].patient.home.disclaimer}
        </AlertDescription>
      </Alert>
      
      {reports.length === 0 ? (
        <div 
          className="text-center py-12 rounded-[var(--radius-lg)]"
          style={{ 
            backgroundColor: 'var(--neutral-50)',
            border: '1px dashed var(--neutral-300)'
          }}
        >
          <p style={{ color: 'var(--neutral-600)' }}>
            {t.empty}
          </p>
        </div>
      ) : (
        <Timeline reports={reports} onReportClick={onReportClick} />
      )}
    </div>
  );
}
