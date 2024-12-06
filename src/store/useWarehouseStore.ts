import { create } from 'zustand';
import { Warehouse } from '../types';

interface WarehouseState {
  warehouses: Warehouse[];
  addWarehouse: (warehouse: Warehouse) => void;
  updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;
}

export const useWarehouseStore = create<WarehouseState>((set) => ({
  warehouses: [
    {
      id: 'WH-001',
      name: 'Entrepôt Principal',
      address: '123 Rue Principale, Dakar',
      contact: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+221 77 123 4567',
        role: 'Responsable Entrepôt',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  addWarehouse: (warehouse) =>
    set((state) => ({
      warehouses: [...state.warehouses, warehouse],
    })),
  updateWarehouse: (id, updatedWarehouse) =>
    set((state) => ({
      warehouses: state.warehouses.map((warehouse) =>
        warehouse.id === id ? { ...warehouse, ...updatedWarehouse } : warehouse
      ),
    })),
  deleteWarehouse: (id) =>
    set((state) => ({
      warehouses: state.warehouses.filter((warehouse) => warehouse.id !== id),
    })),
}));