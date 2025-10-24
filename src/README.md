# Genomic Passport

Una aplicación web completa para compartir historial genómico de forma segura mediante códigos QR efímeros.

## Características principales

### Aplicación del Paciente (PWA/Móvil)
- **Onboarding**: Introducción al producto con permisos de seguridad
- **Home**: Dashboard con acceso rápido a funcionalidades
- **Mostrar QR**: Generación de código QR temporal (15 min) con firma válida
- **Historial**: Vista temporal de informes genómicos con filtros
- **Detalle de informe**: Visualización detallada de variantes genéticas
- **Consentimientos**: Gestión de accesos activos y generación de nuevos permisos

### Visor del Clínico (Web)
- **Resumen ejecutivo**: Vista rápida (<10s) con métricas clave
- **Tabs organizados**: Resumen, Histórico, FHIR/JSON, PDF
- **Tabla de variantes**: Gen, HGVS, rsID, clasificación
- **Antecedentes familiares**: Historial familiar estructurado
- **Farmacogenómica**: Variantes PGx identificadas
- **Exportación**: Copiar/descargar datos en formato FHIR

## Sistema de diseño implementado

### Colores (Variables CSS)
- **Primary**: `--primary-600 #2563EB`, `--primary-700 #1D4ED8`
- **Success**: `--success-600 #10B981`
- **Warning**: `--warning-600 #F59E0B`
- **Danger**: `--danger-600 #EF4444`
- **Neutral**: Escala completa de grises

### Tipografía
- **Fuente**: Inter (sistema)
- **Escalas**: Display, H1-H4, Body, Caption, Mono

### Espaciado
- **8pt grid**: 4, 8, 12, 16, 24, 32, 48px

### Componentes personalizados
- `CountdownToken`: Contador con barra de progreso
- `QRBlock`: Tarjeta con QR, badges de estado y acciones
- `VariantTag`: Tags coloreados por tipo (gen, clasificación, HGVS)
- `Timeline`: Vista temporal de informes
- `LanguageSwitcher`: Selector ES/EN

## Características técnicas

### Accesibilidad (WCAG AA)
- Contraste de color cumple AA
- Tamaños mínimos de toque: 44px
- Soporte de teclado en componentes interactivos
- Textos alternativos

### Multilingüe
- Español (ES) e Inglés (EN)
- Sistema de traducciones centralizado
- Cambio en tiempo real

### Privacidad y seguridad
- Badges de "Firma válida", "Solo lectura", "Token efímero"
- Disclaimer persistente: "Información técnica. No diagnóstico"
- Tokens con expiración (15 minutos por defecto)
- Estado de "token expirado" claro

### Datos de ejemplo
- 2 informes genómicos (Demo Lab Madrid, Demo Lab Lisboa)
- 7 variantes totales (BRCA1, BRCA2, TP53, CYP2D6, CYP2C19, etc.)
- 2 antecedentes familiares
- Datos FHIR mock estructurados

## Flujos principales

1. **Paciente → Mostrar QR**: Home → Mostrar QR → Regenerar/Ocultar
2. **Clínico → Ver historial**: Escanear → Resumen → Tabs (Histórico/FHIR/PDF)
3. **Gestión de consentimientos**: Paciente → Consentimientos → Compartir → Configurar alcance/duración

## Tecnologías

- React con TypeScript
- Tailwind CSS v4.0
- Shadcn/ui components
- QRCode generation
- Motion animations
- Responsive design (mobile-first)

## Modo de demostración

La aplicación incluye un botón para alternar entre vista de paciente y vista de clínico, facilitando la exploración de ambas interfaces.
