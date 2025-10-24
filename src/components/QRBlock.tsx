import { Shield, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CountdownToken } from './CountdownToken';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

interface QRBlockProps {
  token: string;
  name: string;
  initialSeconds: number;
  onRegenerate: () => void;
  onHide: () => void;
  onExpire?: () => void;
  language: 'es' | 'en';
}

export function QRBlock({ 
  token, 
  name, 
  initialSeconds, 
  onRegenerate, 
  onHide,
  onExpire,
  language 
}: QRBlockProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  
  useEffect(() => {
    QRCode.toDataURL(token, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    }).then(setQrDataUrl);
  }, [token]);
  
  const t = {
    validSignature: language === 'es' ? 'Firma válida' : 'Valid signature',
    readOnly: language === 'es' ? 'Solo lectura' : 'Read-only',
    regenerate: language === 'es' ? 'Regenerar' : 'Regenerate',
    hide: language === 'es' ? 'Ocultar' : 'Hide'
  };
  
  return (
    <div 
      className="rounded-[var(--radius-lg)] p-6 space-y-4"
      style={{ 
        backgroundColor: 'white',
        border: '2px solid var(--neutral-200)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="text-center space-y-2">
        <p style={{ color: 'var(--neutral-900)' }}>{name}</p>
        <div className="caption" style={{ color: 'var(--neutral-600)' }}>
          Token: {token.substring(0, 12)}...
        </div>
      </div>
      
      <div className="flex justify-center">
        {qrDataUrl && (
          <div 
            className="p-4 rounded-[var(--radius-md)]"
            style={{ backgroundColor: 'white' }}
          >
            <img 
              src={qrDataUrl} 
              alt="QR Code" 
              className="w-[280px] h-[280px]"
            />
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge 
          variant="outline"
          className="flex items-center gap-1"
          style={{ 
            borderColor: 'var(--success-600)',
            color: 'var(--success-600)'
          }}
        >
          <Shield className="w-3 h-3" />
          {t.validSignature}
          <Check className="w-3 h-3" />
        </Badge>
        <Badge variant="outline">
          {t.readOnly}
        </Badge>
      </div>
      
      <CountdownToken 
        initialSeconds={initialSeconds} 
        onExpire={onExpire}
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onRegenerate}
        >
          {t.regenerate}
        </Button>
        <Button 
          variant="secondary" 
          className="flex-1"
          onClick={onHide}
        >
          {t.hide}
        </Button>
      </div>
    </div>
  );
}
