import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SupplierList } from '../components/suppliers/SupplierList';
import { SupplierFilters } from '../components/suppliers/SupplierFilters';
import { SupplierForm } from '../components/forms/SupplierForm';
import { Modal } from '../components/ui/Modal';

export function Suppliers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Fournisseurs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Fournisseur
        </button>
      </div>
      
      <SupplierFilters />
      <SupplierList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SupplierForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}