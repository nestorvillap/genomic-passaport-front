import { useState } from 'react';
import { Shield, Check, AlertCircle, Download, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { VariantTag } from './VariantTag';
import { CountdownToken } from './CountdownToken';
import type { Report, Variant, FamilyHistory } from '../lib/mockData';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';
import { mockFHIRData } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface ClinicianViewerProps {
  language: Language;
  token: string;
  reports: Report[];
  familyHistory: FamilyHistory[];
  issuer: string;
  issueDate: string;
}

export function ClinicianViewer({ 
  language, 
  token,
  reports, 
  familyHistory,
  issuer,
  issueDate
}: ClinicianViewerProps) {
  const t = translations[language].clinician;
  const [expired, setExpired] = useState(false);
  
  // Flatten all variants for summary view
  const allVariants: Variant[] = reports.flatMap(r => r.variants);
  const pgxVariants = allVariants.filter(v => 
    v.gene.includes('CYP') || v.classification.toLowerCase().includes('metabolizer')
  );
  
  const handleCopyFHIR = () => {
    navigator.clipboard.writeText(JSON.stringify(mockFHIRData, null, 2));
    toast.success(language === 'es' ? 'JSON copiado' : 'JSON copied');
  };
  
  const handleDownloadFHIR = () => {
    const blob = new Blob([JSON.stringify(mockFHIRData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genomic-data.json';
    a.click();
    toast.success(language === 'es' ? 'Descargando...' : 'Downloading...');
  };
  
  if (expired) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center space-y-4">
        <div 
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--danger-50)' }}
        >
          <AlertCircle className="w-8 h-8" style={{ color: 'var(--danger-600)' }} />
        </div>
        <h3 style={{ color: 'var(--neutral-900)' }}>
          {t.states.invalidToken}
        </h3>
        <p style={{ color: 'var(--neutral-600)' }}>
          {language === 'es' 
            ? 'El token de acceso ha expirado. Solicita al paciente un nuevo código.' 
            : 'The access token has expired. Request a new code from the patient.'}
        </p>
        <Button onClick={() => window.location.reload()}>
          {t.states.requestNew}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div 
        className="p-6 rounded-[var(--radius-lg)]"
        style={{ 
          backgroundColor: 'var(--primary-50)',
          border: '1px solid var(--primary-600)'
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <div className="caption" style={{ color: 'var(--primary-700)' }}>
              {t.summary.issuer}
            </div>
            <h3 style={{ color: 'var(--primary-700)' }}>{issuer}</h3>
            <p className="caption" style={{ color: 'var(--neutral-600)' }}>
              {t.summary.date}: {new Date(issueDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}
            </p>
          </div>
          
          <Badge 
            variant="outline"
            className="flex items-center gap-1"
            style={{ 
              borderColor: 'var(--success-600)',
              color: 'var(--success-600)',
              backgroundColor: 'white'
            }}
          >
            <Shield className="w-3 h-3" />
            {t.summary.validSignature}
            <Check className="w-3 h-3" />
          </Badge>
        </div>
        
        <CountdownToken 
          initialSeconds={900}
          onExpire={() => setExpired(true)}
        />
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t.summary.disclaimer}
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">{t.tabs.summary}</TabsTrigger>
          <TabsTrigger value="history">{t.tabs.history}</TabsTrigger>
          <TabsTrigger value="fhir">{t.tabs.fhir}</TabsTrigger>
          <TabsTrigger value="pdf">{t.tabs.pdf}</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t.summary.keyVariants}</CardDescription>
                <CardTitle>{allVariants.length}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t.summary.pharmacogenomics}</CardDescription>
                <CardTitle>{pgxVariants.length}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t.summary.familyHistory}</CardDescription>
                <CardTitle>{familyHistory.length}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t.summary.keyVariants}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-[var(--radius-md)] border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.summary.gene}</TableHead>
                      <TableHead>{t.summary.hgvs}</TableHead>
                      <TableHead>{t.summary.rsID}</TableHead>
                      <TableHead>{t.summary.classification}</TableHead>
                      <TableHead>{t.summary.report}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allVariants.slice(0, 10).map((variant) => {
                      const report = reports.find(r => r.id === variant.reportId);
                      return (
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
                          <TableCell className="caption" style={{ color: 'var(--neutral-600)' }}>
                            {report?.laboratory}<br/>
                            {report?.date}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {familyHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.summary.familyHistory}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyHistory.map((fh) => (
                    <div 
                      key={fh.id}
                      className="p-3 rounded-[var(--radius-md)]"
                      style={{ 
                        backgroundColor: 'var(--neutral-50)',
                        border: '1px solid var(--neutral-200)'
                      }}
                    >
                      <p style={{ color: 'var(--neutral-900)' }}>
                        {fh.relation} · {fh.condition} ({fh.icd10})
                      </p>
                      <p className="caption" style={{ color: 'var(--neutral-600)' }}>
                        {language === 'es' ? 'Inicio' : 'Onset'}: {fh.onsetAge} {language === 'es' ? 'años' : 'years'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.laboratory}</CardTitle>
                <CardDescription>
                  {new Date(report.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')} · 
                  {report.technology} · {report.model} · {report.pipeline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="caption" style={{ color: 'var(--neutral-600)' }}>
                  {report.variants.length} {language === 'es' ? 'variantes' : 'variants'}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* FHIR Tab */}
        <TabsContent value="fhir" className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyFHIR}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              {translations[language].common.copy}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadFHIR}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {translations[language].common.download}
            </Button>
          </div>
          
          <div 
            className="p-4 rounded-[var(--radius-md)] overflow-auto max-h-[600px]"
            style={{ backgroundColor: 'var(--neutral-900)' }}
          >
            <pre className="mono" style={{ color: '#E2E8F0', fontSize: '0.75rem' }}>
              {JSON.stringify(mockFHIRData, null, 2)}
            </pre>
          </div>
        </TabsContent>
        
        {/* PDF Tab */}
        <TabsContent value="pdf">
          <Card>
            <CardContent className="py-12 text-center">
              <p style={{ color: 'var(--neutral-600)' }}>
                {language === 'es' 
                  ? 'No hay PDF disponible para este informe' 
                  : 'No PDF available for this report'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
