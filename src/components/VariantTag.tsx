import { Badge } from './ui/badge';

interface VariantTagProps {
  type: 'gene' | 'rsID' | 'hgvs' | 'classification';
  value: string;
  classification?: string;
}

export function VariantTag({ type, value, classification }: VariantTagProps) {
  const getClassificationStyle = (cls?: string) => {
    if (!cls) return {};
    
    const lower = cls.toLowerCase();
    
    if (lower.includes('pathogenic') && !lower.includes('likely')) {
      return {
        backgroundColor: 'var(--danger-50)',
        color: 'var(--danger-600)',
        borderColor: 'var(--danger-600)'
      };
    }
    
    if (lower.includes('likely pathogenic')) {
      return {
        backgroundColor: 'var(--warning-50)',
        color: 'var(--warning-600)',
        borderColor: 'var(--warning-600)'
      };
    }
    
    if (lower.includes('intermediate') || lower.includes('risk')) {
      return {
        backgroundColor: 'var(--warning-50)',
        color: 'var(--warning-600)',
        borderColor: 'var(--warning-600)'
      };
    }
    
    return {
      backgroundColor: 'var(--neutral-100)',
      color: 'var(--neutral-700)',
      borderColor: 'var(--neutral-300)'
    };
  };
  
  if (type === 'classification') {
    return (
      <Badge 
        variant="outline"
        style={getClassificationStyle(value)}
      >
        {value}
      </Badge>
    );
  }
  
  if (type === 'gene') {
    return (
      <Badge 
        variant="outline"
        style={{
          backgroundColor: 'var(--primary-50)',
          color: 'var(--primary-700)',
          borderColor: 'var(--primary-700)'
        }}
      >
        {value}
      </Badge>
    );
  }
  
  if (type === 'hgvs') {
    return (
      <code 
        className="mono px-2 py-1 rounded"
        style={{
          backgroundColor: 'var(--neutral-100)',
          color: 'var(--neutral-800)',
          fontSize: '0.75rem'
        }}
      >
        {value}
      </code>
    );
  }
  
  return (
    <Badge variant="secondary">
      {value}
    </Badge>
  );
}
