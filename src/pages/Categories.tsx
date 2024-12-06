import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryFilters } from '../components/categories/CategoryFilters';
import { CategoryForm } from '../components/forms/CategoryForm';
import { Modal } from '../components/ui/Modal';

export function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Catégories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Catégorie
        </button>
      </div>
      
      <CategoryFilters />
      <CategoryList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}