import { create } from 'zustand';
import { ReturnMaterial } from '../types';

interface ReturnMaterialState {
  returns: ReturnMaterial[];
  addReturn: (returnMaterial: ReturnMaterial) => void;
  updateReturn: (id: string, returnMaterial: Partial<ReturnMaterial>) => void;
  deleteReturn: (id: string) => void;
}

export const useReturnMaterialStore = create<ReturnMaterialState>((set) => ({
  returns: [],
  addReturn: (returnMaterial) =>
    set((state) => ({
      returns: [...state.returns, returnMaterial],
    })),
  updateReturn: (id, updatedReturn) =>
    set((state) => ({
      returns: state.returns.map((returnMaterial) =>
        returnMaterial.id === id
          ? { ...returnMaterial, ...updatedReturn }
          : returnMaterial
      ),
    })),
  deleteReturn: (id) =>
    set((state) => ({
      returns: state.returns.filter((returnMaterial) => returnMaterial.id !== id),
    })),
}));