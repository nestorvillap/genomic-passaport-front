import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

interface CountdownTokenProps {
  initialSeconds: number;
  onExpire?: () => void;
}

export function CountdownToken({ initialSeconds, onExpire }: CountdownTokenProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    if (seconds <= 0) {
      onExpire?.();
      return;
    }
    
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [seconds, onExpire]);
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const progress = (seconds / initialSeconds) * 100;
  
  const isLowTime = seconds < 60;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="caption" style={{ color: 'var(--neutral-600)' }}>
          Expira en
        </span>
        <span 
          className="mono"
          style={{ 
            color: isLowTime ? 'var(--danger-600)' : 'var(--neutral-900)',
          }}
        >
          {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
        style={{
          backgroundColor: 'var(--neutral-200)'
        }}
      />
    </div>
  );
}
