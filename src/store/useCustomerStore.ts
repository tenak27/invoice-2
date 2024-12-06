import { create } from 'zustand';
import { Customer } from '../types';

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [
    {
      id: 'CUST-001',
      name: 'Entreprise A',
      email: 'contact@entreprisea.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue de Paris, 75001 Paris',
      contacts: [
        {
          id: '1',
          name: 'Jean Dupont',
          email: 'jean@entreprisea.com',
          phone: '+33 6 12 34 56 78',
          role: 'Directeur Commercial',
        },
      ],
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'CUST-002',
      name: 'Entreprise B',
      email: 'contact@entrepriseb.com',
      phone: '+33 1 98 76 54 32',
      address: '456 Avenue des Champs-Élysées, 75008 Paris',
      contacts: [
        {
          id: '2',
          name: 'Marie Martin',
          email: 'marie@entrepriseb.com',
          phone: '+33 6 98 76 54 32',
          role: 'Responsable Achats',
        },
      ],
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
    },
  ],
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  updateCustomer: (id, updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      ),
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));