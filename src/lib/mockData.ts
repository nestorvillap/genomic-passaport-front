export interface Variant {
  id: string;
  gene: string;
  hgvs: string;
  rsID: string;
  classification: string;
  reportId: string;
}

export interface Report {
  id: string;
  laboratory: string;
  date: string;
  technology: string;
  model: string;
  pipeline: string;
  variants: Variant[];
}

export interface FamilyHistory {
  id: string;
  relation: string;
  condition: string;
  icd10: string;
  onsetAge: number;
}

export interface Consent {
  id: string;
  hospital: string;
  scope: string;
  expires: string;
  active: boolean;
}

export const mockReports: Report[] = [
  {
    id: "report-1",
    laboratory: "Demo Lab Madrid",
    date: "2025-09-10",
    technology: "WES",
    model: "NextSeq 550",
    pipeline: "Pipeline v1.4",
    variants: [
      {
        id: "var-1",
        gene: "BRCA2",
        hgvs: "NM_000059.4:c.5946delT",
        rsID: "rs80359550",
        classification: "Pathogenic (reported by lab)",
        reportId: "report-1"
      },
      {
        id: "var-2",
        gene: "CYP2D6",
        hgvs: "*1/*4",
        rsID: "-",
        classification: "Intermediate metabolizer",
        reportId: "report-1"
      },
      {
        id: "var-3",
        gene: "TP53",
        hgvs: "NM_000546.5:c.215C>G",
        rsID: "rs121912651",
        classification: "Likely pathogenic (reported by lab)",
        reportId: "report-1"
      },
      {
        id: "var-4",
        gene: "APOE",
        hgvs: "e3/e4",
        rsID: "rs429358",
        classification: "Risk allele (reported by lab)",
        reportId: "report-1"
      }
    ]
  },
  {
    id: "report-2",
    laboratory: "Demo Lab Lisboa",
    date: "2025-06-02",
    technology: "Panel Onco50",
    model: "MiSeq",
    pipeline: "Pipeline v1.1",
    variants: [
      {
        id: "var-5",
        gene: "BRCA1",
        hgvs: "NM_007294.3:c.68_69delAG",
        rsID: "rs80357906",
        classification: "Pathogenic (reported by lab)",
        reportId: "report-2"
      },
      {
        id: "var-6",
        gene: "MLH1",
        hgvs: "NM_000249.3:c.1897-1G>A",
        rsID: "rs63750447",
        classification: "Likely pathogenic (reported by lab)",
        reportId: "report-2"
      },
      {
        id: "var-7",
        gene: "CYP2C19",
        hgvs: "*1/*2",
        rsID: "rs4244285",
        classification: "Intermediate metabolizer",
        reportId: "report-2"
      }
    ]
  }
];

export const mockFamilyHistory: FamilyHistory[] = [
  {
    id: "fh-1",
    relation: "Madre",
    condition: "Cáncer de mama",
    icd10: "C50",
    onsetAge: 45
  },
  {
    id: "fh-2",
    relation: "Tío paterno",
    condition: "Cáncer de colon",
    icd10: "C18",
    onsetAge: 60
  }
];

export const mockConsents: Consent[] = [
  {
    id: "consent-1",
    hospital: "Hospital Universitario La Paz",
    scope: "Complete",
    expires: "2025-11-24T14:30:00",
    active: true
  },
  {
    id: "consent-2",
    hospital: "Clínica Universidad de Navarra",
    scope: "PGx Only",
    expires: "2025-10-30T10:00:00",
    active: true
  }
];

export const generateMockToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const mockFHIRData = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    {
      resource: {
        resourceType: "DiagnosticReport",
        id: "genomic-report-1",
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "81247-9",
              display: "Master HL7 genetic variant reporting panel"
            }
          ]
        },
        subject: {
          reference: "Patient/demo-patient"
        },
        effectiveDateTime: "2025-09-10",
        issued: "2025-09-10T10:00:00Z",
        performer: [
          {
            reference: "Organization/demo-lab-madrid"
          }
        ]
      }
    },
    {
      resource: {
        resourceType: "Observation",
        id: "variant-brca2",
        status: "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "69548-6",
              display: "Genetic variant assessment"
            }
          ]
        },
        valueCodeableConcept: {
          coding: [
            {
              system: "http://loinc.org",
              code: "LA6668-3",
              display: "Pathogenic"
            }
          ]
        },
        component: [
          {
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "48018-6",
                  display: "Gene studied ID"
                }
              ]
            },
            valueCodeableConcept: {
              coding: [
                {
                  system: "http://www.genenames.org",
                  code: "1101",
                  display: "BRCA2"
                }
              ]
            }
          },
          {
            code: {
              coding: [
                {
                  system: "http://loinc.org",
                  code: "48004-6",
                  display: "DNA change (c.HGVS)"
                }
              ]
            },
            valueCodeableConcept: {
              text: "NM_000059.4:c.5946delT"
            }
          }
        ]
      }
    }
  ]
};
