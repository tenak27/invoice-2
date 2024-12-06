import { create } from 'zustand';

interface Settings {
  // Company Information
  companyName: string;
  logo: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;

  // Invoice Settings
  selectedTemplate: string;
  taxRate: number;
  quotePrefix: string;
  invoicePrefix: string;
  quoteValidity: number;
  paymentTerms: number;
  invoiceNotes: string;

  // Email Settings
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  senderEmail: string;
  emailTemplates: {
    invoice: {
      subject: string;
      body: string;
    };
    quote: {
      subject: string;
      body: string;
    };
    reminder: {
      subject: string;
      body: string;
    };
  };
  reminderSettings: {
    enabled: boolean;
    firstReminder: number;
    secondReminder: number;
    thirdReminder: number;
  };

  // Signature Settings
  signature: string;
  useSignature: boolean;
  requireSignature: boolean;
  signaturePosition: 'bottom-left' | 'bottom-right' | 'custom';

  // Stock Settings
  lowStockThreshold: number;
  stockMethod: 'FIFO' | 'LIFO' | 'AVERAGE';
  autoUpdateStock: boolean;
  enableStockAlerts: boolean;

  // User Settings
  twoFactorAuth: boolean;
  sessionTimeout: number;
  language: string;

  // Backup Settings
  enableAutoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  retentionPeriod: number;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    // Company Information
    companyName: 'InvoiceFlow',
    logo: '',
    taxId: '',
    address: '',
    phone: '',
    email: '',

    // Invoice Settings
    selectedTemplate: 'modern',
    taxRate: 18,
    quotePrefix: 'DEV',
    invoicePrefix: 'FACT',
    quoteValidity: 30,
    paymentTerms: 30,
    invoiceNotes: 'Merci de votre confiance.',

    // Email Settings
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    senderEmail: '',
    emailTemplates: {
      invoice: {
        subject: 'Nouvelle facture {invoice_number}',
        body: 'Cher/Chère {client_name},\n\nVeuillez trouver ci-joint votre facture...',
      },
      quote: {
        subject: 'Nouveau devis {quote_number}',
        body: 'Cher/Chère {client_name},\n\nVeuillez trouver ci-joint notre devis...',
      },
      reminder: {
        subject: 'Rappel : Facture {invoice_number} en attente',
        body: 'Cher/Chère {client_name},\n\nNous nous permettons de vous rappeler...',
      },
    },
    reminderSettings: {
      enabled: true,
      firstReminder: 3,
      secondReminder: 7,
      thirdReminder: 15,
    },

    // Signature Settings
    signature: '',
    useSignature: true,
    requireSignature: false,
    signaturePosition: 'bottom-right',

    // Stock Settings
    lowStockThreshold: 10,
    stockMethod: 'FIFO',
    autoUpdateStock: true,
    enableStockAlerts: true,

    // User Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    language: 'fr',

    // Backup Settings
    enableAutoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),
}));