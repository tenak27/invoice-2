import { create } from 'zustand';
import { Invoice } from '../types';

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [
    {
      id: '1',
      number: 'INV-2024-001',
      customerId: 'CUST-001',
      items: [
        {
          id: '1',
          productId: '1',
          quantity: 2,
          price: 99.99,
          total: 199.98,
        },
      ],
      subtotal: 199.98,
      tax: 39.99,
      total: 239.97,
      status: 'sent',
      dueDate: new Date(2024, 3, 15),
      createdAt: new Date(2024, 2, 15),
      updatedAt: new Date(2024, 2, 15),
    },
    {
      id: '2',
      number: 'INV-2024-002',
      customerId: 'CUST-002',
      items: [
        {
          id: '2',
          productId: '2',
          quantity: 1,
          price: 149.99,
          total: 149.99,
        },
      ],
      subtotal: 149.99,
      tax: 30.00,
      total: 179.99,
      status: 'paid',
      dueDate: new Date(2024, 3, 20),
      createdAt: new Date(2024, 2, 16),
      updatedAt: new Date(2024, 2, 16),
    },
  ],
  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),
  updateInvoice: (id, updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
      ),
    })),
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
}));