import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PurchaseOrderList } from '../components/purchase-orders/PurchaseOrderList';
import { PurchaseOrderForm } from '../components/purchase-orders/PurchaseOrderForm';
import { Modal } from '../components/ui/Modal';

export function PurchaseOrders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [viewingOrder, setViewingOrder] = useState<any>(null);

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleView = (order: any) => {
    setViewingOrder(order);
  };

  const handleClose = () => {
    setEditingOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bons de commande</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau bon de commande
        </button>
      </div>

      <PurchaseOrderList onEdit={handleEdit} onView={handleView} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <PurchaseOrderForm onClose={handleClose} initialData={editingOrder} />
      </Modal>
    </div>
  );
}