import { create } from 'zustand';
import { User } from '../types/user';
import * as api from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifySession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await api.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Erreur de connexion' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  verifySession: async () => {
    try {
      set({ isLoading: true });
      const user = await api.verifySession();
      set({ user, isAuthenticated: !!user });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));