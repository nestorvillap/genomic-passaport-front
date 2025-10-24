export const translations = {
  es: {
    // Patient App
    patient: {
      onboarding: {
        title: "Tu Pasaporte Genómico, seguro y portátil",
        subtitle: "Accede a tu historial genómico desde cualquier lugar, de forma segura",
        start: "Comenzar",
        permissions: "Permisos requeridos",
        biometric: "Usaremos biometría o PIN para proteger tu información"
      },
      home: {
        greeting: "Hola",
        status: "Estado del pasaporte",
        lastUpdate: "Última actualización",
        showQR: "Mostrar QR",
        history: "Historial genómico",
        consents: "Consentimientos",
        share: "Compartir temporalmente",
        disclaimer: "Información técnica. No diagnóstico."
      },
      qr: {
        title: "Muestra este QR al profesional",
        subtitle: "Muestra este QR al profesional para ver tu historial.",
        tokenEphemeral: "Token efímero. Sin acceso a tus datos personales.",
        validSignature: "Firma válida",
        readOnly: "Solo lectura",
        expiresIn: "Expira en",
        regenerate: "Regenerar",
        hide: "Ocultar",
        offlineMode: "Modo sin conexión",
        offlineWarning: "Sin red. Mostrando payload mínimo (10 variantes clave)"
      },
      history: {
        title: "Historial de informes",
        filterByLab: "Filtrar por laboratorio",
        filterByDate: "Filtrar por fecha",
        empty: "No hay informes disponibles"
      },
      report: {
        laboratory: "Laboratorio",
        date: "Fecha",
        technology: "Tecnología",
        model: "Modelo",
        pipeline: "Pipeline",
        keyVariants: "Variantes clave",
        gene: "Gen",
        hgvs: "HGVS",
        rsID: "rsID",
        classification: "Clasificación",
        viewFHIR: "Ver JSON FHIR"
      },
      consents: {
        title: "Consentimientos activos",
        hospital: "Hospital",
        scope: "Alcance",
        expires: "Expira",
        revoke: "Revocar",
        shareNew: "Compartir temporalmente",
        scopeOptions: {
          pgxOnly: "Solo farmacogenómica",
          complete: "Completo"
        },
        duration: {
          "15m": "15 minutos",
          "24h": "24 horas",
          "7d": "7 días"
        },
        generate: "Generar QR"
      },
      settings: {
        title: "Ajustes",
        language: "Idioma",
        security: "Seguridad",
        biometric: "Usar biometría",
        pin: "Configurar PIN",
        export: "Exportar datos",
        downloadFHIR: "Descargar FHIR/JSON"
      }
    },
    // Clinician Viewer
    clinician: {
      scan: {
        title: "Escanear Pasaporte Genómico",
        pasteToken: "Pegar token de acceso",
        view: "Ver historial"
      },
      summary: {
        issuer: "Emisor",
        date: "Fecha",
        validSignature: "Firma válida",
        expiresIn: "Expira en",
        keyVariants: "Variantes clave",
        pharmacogenomics: "Farmacogenómica",
        familyHistory: "Antecedentes familiares",
        disclaimer: "Datos técnicos. No diagnóstico.",
        gene: "Gen",
        hgvs: "HGVS",
        rsID: "rsID",
        classification: "Clasificación",
        report: "Informe",
        actions: "Acciones",
        viewFHIR: "Ver FHIR",
        downloadPDF: "Descargar PDF"
      },
      tabs: {
        summary: "Resumen",
        history: "Histórico",
        fhir: "FHIR/JSON",
        pdf: "PDF"
      },
      states: {
        invalidToken: "Token inválido o expirado",
        noPermissions: "Sin permisos de acceso",
        noConnection: "Sin conexión. Por favor, intenta de nuevo.",
        retry: "Reintentar",
        requestNew: "Solicitar nuevo token"
      }
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      empty: "Sin datos",
      copy: "Copiar",
      download: "Descargar",
      close: "Cerrar",
      cancel: "Cancelar",
      confirm: "Confirmar"
    }
  },
  en: {
    // Patient App
    patient: {
      onboarding: {
        title: "Your Genomic Passport, secure and portable",
        subtitle: "Access your genomic history from anywhere, securely",
        start: "Get Started",
        permissions: "Required Permissions",
        biometric: "We'll use biometrics or PIN to protect your information"
      },
      home: {
        greeting: "Hello",
        status: "Passport status",
        lastUpdate: "Last update",
        showQR: "Show QR",
        history: "Genomic history",
        consents: "Consents",
        share: "Share temporarily",
        disclaimer: "Technical information. Not a diagnosis."
      },
      qr: {
        title: "Show this QR to the clinician",
        subtitle: "Show this QR to the clinician to view your history.",
        tokenEphemeral: "Ephemeral token. No access to your personal data.",
        validSignature: "Valid signature",
        readOnly: "Read-only",
        expiresIn: "Expires in",
        regenerate: "Regenerate",
        hide: "Hide",
        offlineMode: "Offline mode",
        offlineWarning: "No network. Showing minimal payload (10 key variants)"
      },
      history: {
        title: "Report history",
        filterByLab: "Filter by laboratory",
        filterByDate: "Filter by date",
        empty: "No reports available"
      },
      report: {
        laboratory: "Laboratory",
        date: "Date",
        technology: "Technology",
        model: "Model",
        pipeline: "Pipeline",
        keyVariants: "Key variants",
        gene: "Gene",
        hgvs: "HGVS",
        rsID: "rsID",
        classification: "Classification",
        viewFHIR: "View FHIR JSON"
      },
      consents: {
        title: "Active consents",
        hospital: "Hospital",
        scope: "Scope",
        expires: "Expires",
        revoke: "Revoke",
        shareNew: "Share temporarily",
        scopeOptions: {
          pgxOnly: "Pharmacogenomics only",
          complete: "Complete"
        },
        duration: {
          "15m": "15 minutes",
          "24h": "24 hours",
          "7d": "7 days"
        },
        generate: "Generate QR"
      },
      settings: {
        title: "Settings",
        language: "Language",
        security: "Security",
        biometric: "Use biometrics",
        pin: "Set up PIN",
        export: "Export data",
        downloadFHIR: "Download FHIR/JSON"
      }
    },
    // Clinician Viewer
    clinician: {
      scan: {
        title: "Scan Genomic Passport",
        pasteToken: "Paste access token",
        view: "View history"
      },
      summary: {
        issuer: "Issuer",
        date: "Date",
        validSignature: "Valid signature",
        expiresIn: "Expires in",
        keyVariants: "Key variants",
        pharmacogenomics: "Pharmacogenomics",
        familyHistory: "Family history",
        disclaimer: "Technical data. Not a diagnosis.",
        gene: "Gene",
        hgvs: "HGVS",
        rsID: "rsID",
        classification: "Classification",
        report: "Report",
        actions: "Actions",
        viewFHIR: "View FHIR",
        downloadPDF: "Download PDF"
      },
      tabs: {
        summary: "Summary",
        history: "History",
        fhir: "FHIR/JSON",
        pdf: "PDF"
      },
      states: {
        invalidToken: "Invalid or expired token",
        noPermissions: "No access permissions",
        noConnection: "No connection. Please try again.",
        retry: "Retry",
        requestNew: "Request new token"
      }
    },
    common: {
      loading: "Loading...",
      error: "Error",
      empty: "No data",
      copy: "Copy",
      download: "Download",
      close: "Close",
      cancel: "Cancel",
      confirm: "Confirm"
    }
  }
};

export type Language = 'es' | 'en';
