import { z } from 'zod';

// ... (previous interfaces remain the same)

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  // Added mandatory mentions
  taxId: string;
  registrationNumber: string;
  taxRegime: string;
  legalForm: string;
  capital?: string;
  bankDetails?: string;
  contacts: Contact[];
  createdAt: Date;
  updatedAt: Date;
}

// ... (rest of the file remains the same)