import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { InventoryList } from '../components/inventory/InventoryList';
import { InventoryFilters } from '../components/inventory/InventoryFilters';
import { ProductForm } from '../components/forms/ProductForm';
import { Modal } from '../components/ui/Modal';
import { useInventoryStore } from '../store/useInventoryStore';

export function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestion du Stock</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Produit
        </button>
      </div>
      
      <InventoryFilters />
      <InventoryList onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ProductForm onClose={handleClose} initialData={editingProduct} />
      </Modal>
    </div>
  );
}