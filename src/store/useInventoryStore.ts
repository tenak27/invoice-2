import { create } from 'zustand';
import { Product } from '../types';

interface InventoryState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Produit A',
      sku: 'SKU-001',
      description: 'Description du produit A',
      price: 99.99,
      quantity: 50,
      minQuantity: 10,
      location: 'Entrepôt Principal',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Produit B',
      sku: 'SKU-002',
      description: 'Description du produit B',
      price: 149.99,
      quantity: 25,
      minQuantity: 15,
      location: 'Entrepôt Sud',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));