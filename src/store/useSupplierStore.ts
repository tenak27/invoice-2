import { create } from 'zustand';
import { Supplier } from '../types';

interface SupplierState {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
}

export const useSupplierStore = create<SupplierState>((set) => ({
  suppliers: [
    {
      id: 'SUP-001',
      name: 'Fournisseur A',
      email: 'contact@fournisseura.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue des Fournisseurs, 75001 Paris',
      contacts: [
        {
          id: '1',
          name: 'Pierre Martin',
          email: 'pierre@fournisseura.com',
          phone: '+33 6 12 34 56 78',
          role: 'Commercial',
        },
      ],
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ],
  addSupplier: (supplier) =>
    set((state) => ({
      suppliers: [...state.suppliers, supplier],
    })),
  updateSupplier: (id, updatedSupplier) =>
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
      ),
    })),
  deleteSupplier: (id) =>
    set((state) => ({
      suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
    })),
}));