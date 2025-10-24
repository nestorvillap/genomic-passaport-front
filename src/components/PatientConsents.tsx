import { useState } from 'react';
import { FileCheck, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import type { Consent } from '../lib/mockData';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';
import { toast } from 'sonner@2.0.3';

interface PatientConsentsProps {
  language: Language;
  consents: Consent[];
  onRevoke: (id: string) => void;
  onGenerateNew: (scope: string, duration: string) => void;
}

export function PatientConsents({ 
  language, 
  consents,
  onRevoke,
  onGenerateNew
}: PatientConsentsProps) {
  const t = translations[language].patient.consents;
  const [isOpen, setIsOpen] = useState(false);
  const [scope, setScope] = useState('complete');
  const [duration, setDuration] = useState('15m');
  
  const handleGenerate = () => {
    onGenerateNew(scope, duration);
    setIsOpen(false);
    toast.success(language === 'es' ? 'QR generado' : 'QR generated');
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2>{t.title}</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t.shareNew}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.shareNew}</DialogTitle>
              <DialogDescription>
                {language === 'es' 
                  ? 'Configura el alcance y duración del acceso temporal' 
                  : 'Configure the scope and duration of temporary access'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t.scope}</Label>
                <Select value={scope} onValueChange={setScope}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pgxOnly">{t.scopeOptions.pgxOnly}</SelectItem>
                    <SelectItem value="complete">{t.scopeOptions.complete}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>
                  {language === 'es' ? 'Duración' : 'Duration'}
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15m">{t.duration['15m']}</SelectItem>
                    <SelectItem value="24h">{t.duration['24h']}</SelectItem>
                    <SelectItem value="7d">{t.duration['7d']}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {translations[language].common.cancel}
              </Button>
              <Button onClick={handleGenerate}>
                {t.generate}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-3">
        {consents.length === 0 ? (
          <div 
            className="text-center py-12 rounded-[var(--radius-lg)]"
            style={{ 
              backgroundColor: 'var(--neutral-50)',
              border: '1px dashed var(--neutral-300)'
            }}
          >
            <FileCheck 
              className="w-12 h-12 mx-auto mb-3" 
              style={{ color: 'var(--neutral-400)' }}
            />
            <p style={{ color: 'var(--neutral-600)' }}>
              {language === 'es' 
                ? 'No hay consentimientos activos' 
                : 'No active consents'}
            </p>
          </div>
        ) : (
          consents.map((consent) => (
            <Card key={consent.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4>{consent.hospital}</h4>
                      <Badge 
                        variant="outline"
                        style={{
                          backgroundColor: 'var(--success-50)',
                          color: 'var(--success-600)',
                          borderColor: 'var(--success-600)'
                        }}
                      >
                        {consent.scope}
                      </Badge>
                    </div>
                    
                    <p className="caption" style={{ color: 'var(--neutral-600)' }}>
                      {t.expires}: {new Date(consent.expires).toLocaleString(
                        language === 'es' ? 'es-ES' : 'en-US'
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={consent.active}
                      onCheckedChange={() => {
                        onRevoke(consent.id);
                        toast.success(language === 'es' ? 'Acceso revocado' : 'Access revoked');
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRevoke(consent.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
