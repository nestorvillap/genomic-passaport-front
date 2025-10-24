import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { VariantTag } from './VariantTag';
import { ArrowLeft, FileJson } from 'lucide-react';
import type { Report } from '../lib/mockData';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';

interface PatientReportDetailProps {
  language: Language;
  report: Report;
  onBack: () => void;
  onViewFHIR?: () => void;
}

export function PatientReportDetail({ language, report, onBack, onViewFHIR }: PatientReportDetailProps) {
  const t = translations[language].patient.report;
  
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'es' ? 'Volver' : 'Back'}
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{report.laboratory}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="caption" style={{ color: 'var(--neutral-600)' }}>
                {t.date}
              </div>
              <p>{new Date(report.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</p>
            </div>
            <div>
              <div className="caption" style={{ color: 'var(--neutral-600)' }}>
                {t.technology}
              </div>
              <p>{report.technology}</p>
            </div>
            <div>
              <div className="caption" style={{ color: 'var(--neutral-600)' }}>
                {t.model}
              </div>
              <p>{report.model}</p>
            </div>
            <div>
              <div className="caption" style={{ color: 'var(--neutral-600)' }}>
                {t.pipeline}
              </div>
              <p>{report.pipeline}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.keyVariants}</CardTitle>
            {onViewFHIR && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onViewFHIR}
                className="gap-2"
              >
                <FileJson className="w-4 h-4" />
                {t.viewFHIR}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-[var(--radius-md)] border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.gene}</TableHead>
                  <TableHead>{t.hgvs}</TableHead>
                  <TableHead>{t.rsID}</TableHead>
                  <TableHead>{t.classification}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.variants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <VariantTag type="gene" value={variant.gene} />
                    </TableCell>
                    <TableCell>
                      <VariantTag type="hgvs" value={variant.hgvs} />
                    </TableCell>
                    <TableCell className="caption" style={{ color: 'var(--neutral-600)' }}>
                      {variant.rsID}
                    </TableCell>
                    <TableCell>
                      <VariantTag 
                        type="classification" 
                        value={variant.classification}
                        classification={variant.classification}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
