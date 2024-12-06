import { create } from 'zustand';
import { Payment, PaymentReceipt } from '../types';

interface PaymentState {
  payments: Payment[];
  receipts: PaymentReceipt[];
  addPayment: (payment: Payment) => void;
  addReceipt: (receipt: PaymentReceipt) => void;
  getPaymentsByInvoice: (invoiceId: string) => Payment[];
  getReceiptsByCustomer: (customerId: string) => PaymentReceipt[];
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  payments: [],
  receipts: [],
  addPayment: (payment) =>
    set((state) => ({
      payments: [...state.payments, payment],
    })),
  addReceipt: (receipt) =>
    set((state) => ({
      receipts: [...state.receipts, receipt],
    })),
  getPaymentsByInvoice: (invoiceId) =>
    get().payments.filter((payment) => payment.invoiceId === invoiceId),
  getReceiptsByCustomer: (customerId) =>
    get().receipts.filter((receipt) => receipt.customerId === customerId),
}));