import React, { useState } from 'react';
import { usePaymentStore } from '../../store/usePaymentStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PaymentFormProps {
  invoiceId: string;
  customerId: string;
  amount: number;
  onClose: () => void;
}

export function PaymentForm({ invoiceId, customerId, amount, onClose }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    amount: amount,
    paymentMethod: 'cash',
    reference: '',
    paymentDate: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
  });

  const { addPayment, addReceipt } = usePaymentStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payment = {
      id: `PAY-${Date.now()}`,
      invoiceId,
      amount: formData.amount,
      paymentMethod: formData.paymentMethod as 'cash' | 'bank_transfer' | 'check' | 'mobile_money',
      reference: formData.reference,
      paymentDate: new Date(formData.paymentDate),
      notes: formData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const receipt = {
      id: `REC-${Date.now()}`,
      number: `RECU-${Date.now()}`,
      paymentId: payment.id,
      customerId,
      amount: formData.amount,
      paymentMethod: payment.paymentMethod,
      reference: formData.reference,
      paymentDate: new Date(formData.paymentDate),
      notes: formData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addPayment(payment);
    addReceipt(receipt);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">Enregistrer un paiement</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Montant
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              max={amount}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">FCFA</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Mode de paiement
          </label>
          <select
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="cash">Espèces</option>
            <option value="bank_transfer">Virement bancaire</option>
            <option value="check">Chèque</option>
            <option value="mobile_money">Mobile Money</option>
          </select>
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Référence
          </label>
          <input
            type="text"
            id="reference"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Numéro de chèque, référence de virement..."
          />
        </div>

        <div>
          <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
            Date du paiement
          </label>
          <input
            type="date"
            id="paymentDate"
            value={formData.paymentDate}
            onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enregistrer et imprimer le reçu
          </button>
        </div>
      </form>
    </div>
  );
}