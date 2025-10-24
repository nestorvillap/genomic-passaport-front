import { useState } from 'react';
import { Shield, Fingerprint, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { Language } from '../lib/translations';
import { translations } from '../lib/translations';

interface OnboardingProps {
  language: Language;
  onComplete: () => void;
}

export function Onboarding({ language, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const t = translations[language].patient.onboarding;
  
  if (step === 0) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-8 min-h-screen flex flex-col justify-center">
        <div className="text-center space-y-4">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary-50)' }}
          >
            <Shield 
              className="w-12 h-12" 
              style={{ color: 'var(--primary-600)' }}
            />
          </div>
          
          <h1 className="text-center">
            {t.title}
          </h1>
          
          <p 
            className="text-center"
            style={{ color: 'var(--neutral-600)' }}
          >
            {t.subtitle}
          </p>
        </div>
        
        <div className="space-y-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--primary-50)' }}
                >
                  <Shield className="w-6 h-6" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div>
                  <h4>
                    {language === 'es' ? 'Seguro y privado' : 'Secure and private'}
                  </h4>
                  <p className="caption" style={{ color: 'var(--neutral-600)' }}>
                    {language === 'es' 
                      ? 'Tus datos están protegidos con cifrado de extremo a extremo' 
                      : 'Your data is protected with end-to-end encryption'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--success-50)' }}
                >
                  <ArrowRight className="w-6 h-6" style={{ color: 'var(--success-600)' }} />
                </div>
                <div>
                  <h4>
                    {language === 'es' ? 'Acceso rápido' : 'Quick access'}
                  </h4>
                  <p className="caption" style={{ color: 'var(--neutral-600)' }}>
                    {language === 'es' 
                      ? 'Comparte tu historial en segundos con un código QR' 
                      : 'Share your history in seconds with a QR code'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => setStep(1)}
        >
          {t.start}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 space-y-8 min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-4">
        <div 
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary-50)' }}
        >
          <Fingerprint 
            className="w-12 h-12" 
            style={{ color: 'var(--primary-600)' }}
          />
        </div>
        
        <h2 className="text-center">
          {t.permissions}
        </h2>
        
        <p 
          className="text-center"
          style={{ color: 'var(--neutral-600)' }}
        >
          {t.biometric}
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="w-full"
        onClick={onComplete}
      >
        {language === 'es' ? 'Continuar' : 'Continue'}
      </Button>
    </div>
  );
}
