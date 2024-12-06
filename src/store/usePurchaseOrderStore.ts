import { create } from 'zustand';
import { PurchaseOrder, PurchaseOrderStatus } from '../types/purchaseOrder';

interface PurchaseOrderState {
  orders: PurchaseOrder[];
  addOrder: (order: PurchaseOrder) => void;
  updateOrder: (id: string, order: Partial<PurchaseOrder>) => void;
  deleteOrder: (id: string) => void;
  updateStatus: (id: string, status: PurchaseOrderStatus) => void;
}

export const usePurchaseOrderStore = create<PurchaseOrderState>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  updateOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder, updatedAt: new Date() } : order
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id !== id) return order;
        
        const updates: Partial<PurchaseOrder> = { status };
        
        switch (status) {
          case PurchaseOrderStatus.SENT:
            updates.sentAt = new Date();
            break;
          case PurchaseOrderStatus.CONFIRMED:
            updates.confirmedAt = new Date();
            break;
          case PurchaseOrderStatus.RECEIVED:
            updates.receivedAt = new Date();
            break;
        }
        
        return { ...order, ...updates, updatedAt: new Date() };
      }),
    })),
}));