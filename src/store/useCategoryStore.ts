import { create } from 'zustand';
import { Category } from '../types';

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [
    {
      id: 'CAT-001',
      name: 'Électronique',
      description: 'Produits électroniques et accessoires',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 'CAT-002',
      name: 'Bureautique',
      description: 'Fournitures et équipements de bureau',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
  ],
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));