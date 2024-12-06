import { create } from 'zustand';
import { Quote } from '../types';

interface QuoteState {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  updateQuote: (id: string, quote: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  convertToInvoice: (id: string) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  quotes: [
    {
      id: '1',
      number: 'DEV-2024-001',
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
      validUntil: new Date(2024, 3, 15),
      createdAt: new Date(2024, 2, 15),
      updatedAt: new Date(2024, 2, 15),
    },
  ],
  addQuote: (quote) =>
    set((state) => ({
      quotes: [...state.quotes, quote],
    })),
  updateQuote: (id, updatedQuote) =>
    set((state) => ({
      quotes: state.quotes.map((quote) =>
        quote.id === id ? { ...quote, ...updatedQuote } : quote
      ),
    })),
  deleteQuote: (id) =>
    set((state) => ({
      quotes: state.quotes.filter((quote) => quote.id !== id),
    })),
  convertToInvoice: (id) =>
    set((state) => ({
      quotes: state.quotes.map((quote) =>
        quote.id === id ? { ...quote, status: 'converted' } : quote
      ),
    })),
}));