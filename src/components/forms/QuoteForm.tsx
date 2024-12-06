import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useInventoryStore } from '../../store/useInventoryStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';

interface QuoteFormProps {
  onClose: () => void;
  initialData?: any;
}

export function QuoteForm({ onClose, initialData }: QuoteFormProps) {
  const [items, setItems] = useState<any[]>(
    initialData?.items || [{ id: Date.now(), productId: '', quantity: 1, price: 0 }]
  );
  
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || '',
    validUntil: initialData?.validUntil 
      ? format(new Date(initialData.validUntil), 'yyyy-MM-dd')
      : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'), // 30 days from now
    notes: initialData?.notes || '',
  });

  const { customers } = useCustomerStore();
  const { products } = useInventoryStore();
  const { addQuote, updateQuote } = useQuoteStore();

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), productId: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'productId') {
          const product = products.find(p => p.id === value);
          return {
            ...item,
            [field]: value,
            price: product?.price || 0,
          };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.18; // 18% TVA
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    const quoteData = {
      ...formData,
      items: items.map(item => ({
        ...item,
        total: item.price * item.quantity,
      })),
      subtotal,
      tax,
      total,
      status: 'draft',
      validUntil: new Date(formData.validUntil),
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialData) {
      updateQuote(initialData.id, quoteData);
    } else {
      addQuote({
        ...quoteData,
        id: `QUOTE-${Date.now()}`,
        number: `DEV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      });
    }

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">
        {initialData ? 'Modifier le devis' : 'Nouveau devis'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            id="customerId"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Sélectionner un client</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
            Date de validité
          </label>
          <input
            type="date"
            id="validUntil"
            value={formData.validUntil}
            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Articles</h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un article
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <select
                    value={item.productId}
                    onChange={(e) => handleItemChange(item.id, 'productId', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Sélectionner un produit</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatCurrency(product.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    min="1"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="w-32 text-right font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-end">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Sous-total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(calculateSubtotal())}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">TVA (18%)</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(calculateTax(calculateSubtotal()))}
                  </dd>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {formatCurrency(calculateSubtotal() + calculateTax(calculateSubtotal()))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            {initialData ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
}