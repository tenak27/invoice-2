import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CustomerList } from '../components/customers/CustomerList';
import { CustomerFilters } from '../components/customers/CustomerFilters';
import { CustomerForm } from '../components/forms/CustomerForm';
import { Modal } from '../components/ui/Modal';
import { useCustomerStore } from '../store/useCustomerStore';

export function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Client
        </button>
      </div>
      
      <CustomerFilters />
      <CustomerList onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <CustomerForm onClose={handleClose} initialData={editingCustomer} />
      </Modal>
    </div>
  );
}