import { Calendar } from 'lucide-react';
import type { Report } from '../lib/mockData';

interface TimelineProps {
  reports: Report[];
  onReportClick: (report: Report) => void;
}

export function Timeline({ reports, onReportClick }: TimelineProps) {
  const sortedReports = [...reports].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedReports.map((report, index) => (
        <div key={report.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--primary-600)',
                color: 'white'
              }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            {index < sortedReports.length - 1 && (
              <div 
                className="w-0.5 flex-1 mt-2"
                style={{ 
                  backgroundColor: 'var(--neutral-300)',
                  minHeight: '40px'
                }}
              />
            )}
          </div>
          
          <button
            onClick={() => onReportClick(report)}
            className="flex-1 text-left p-4 rounded-[var(--radius-md)] transition-all"
            style={{
              backgroundColor: 'white',
              border: '1px solid var(--neutral-200)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary-600)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(37, 99, 235, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--neutral-200)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="space-y-2">
              <p style={{ color: 'var(--neutral-900)' }}>
                {report.laboratory}
              </p>
              <div className="caption" style={{ color: 'var(--neutral-600)' }}>
                {new Date(report.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="caption" style={{ color: 'var(--neutral-500)' }}>
                {report.technology} · {report.model}
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
