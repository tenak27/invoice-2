import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { QuoteList } from '../components/quotes/QuoteList';
import { QuoteFilters } from '../components/quotes/QuoteFilters';
import { QuoteForm } from '../components/forms/QuoteForm';
import { Modal } from '../components/ui/Modal';
import { useQuoteStore } from '../store/useQuoteStore';

export function Quotes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<any>(null);

  const handleEdit = (quote: any) => {
    setEditingQuote(quote);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingQuote(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Devis</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Devis
        </button>
      </div>
      
      <QuoteFilters />
      <QuoteList onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <QuoteForm onClose={handleClose} initialData={editingQuote} />
      </Modal>
    </div>
  );
}