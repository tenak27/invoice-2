import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { InvoiceList } from '../components/invoices/InvoiceList';
import { InvoiceFilters } from '../components/invoices/InvoiceFilters';
import { InvoiceForm } from '../components/forms/InvoiceForm';
import { Modal } from '../components/ui/Modal';
import { useInvoiceStore } from '../store/useInvoiceStore';

export function Invoices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);

  const handleEdit = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingInvoice(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Factures</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Facture
        </button>
      </div>
      
      <InvoiceFilters />
      <InvoiceList onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <InvoiceForm onClose={handleClose} initialData={editingInvoice} />
      </Modal>
    </div>
  );
}