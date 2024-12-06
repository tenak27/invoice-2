import { create } from 'zustand';
import { User, UserRole } from '../types/user';

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: 'USR-001',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...userData,
          id: `USR-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  updateUser: (id, userData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id
          ? { ...user, ...userData, updatedAt: new Date() }
          : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  toggleUserStatus: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id
          ? { ...user, isActive: !user.isActive, updatedAt: new Date() }
          : user
      ),
    })),
}));