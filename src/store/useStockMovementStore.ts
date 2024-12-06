import { create } from 'zustand';
import { StockMovement } from '../types';

interface StockMovementState {
  movements: StockMovement[];
  addMovement: (movement: StockMovement) => void;
  getMovementsByProduct: (productId: string) => StockMovement[];
  getMovementsByLocation: (location: string) => StockMovement[];
}

export const useStockMovementStore = create<StockMovementState>((set, get) => ({
  movements: [],
  addMovement: (movement) =>
    set((state) => ({
      movements: [...state.movements, movement],
    })),
  getMovementsByProduct: (productId) =>
    get().movements.filter((movement) => movement.productId === productId),
  getMovementsByLocation: (location) =>
    get().movements.filter((movement) => movement.location === location),
}));