import { create } from 'zustand';
import { StockAlert } from '../types';

interface StockAlertState {
  alerts: StockAlert[];
  addAlert: (alert: StockAlert) => void;
  resolveAlert: (id: string) => void;
  getActiveAlerts: () => StockAlert[];
}

export const useStockAlertStore = create<StockAlertState>((set, get) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),
  resolveAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'resolved' } : alert
      ),
    })),
  getActiveAlerts: () => get().alerts.filter((alert) => alert.status === 'active'),
}));