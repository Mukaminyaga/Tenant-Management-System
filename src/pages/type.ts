export type Document = {
    id: string;
    icon: string;
    title: string;
    type: DocumentType;
  };
  
  export enum DocumentType {
    GOVERNMENT_ID = 'GOVERNMENT_ID',
    LEASE = 'LEASE',
    INSURANCE = 'INSURANCE',
    PROPERTY = 'PROPERTY',
    OTHER = 'OTHER'
  }
  