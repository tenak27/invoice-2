import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useInventoryStore } from '../../store/useInventoryStore';
import { formatCurrency } from '../../lib/utils';
import { InvoicePreview } from '../invoices/InvoicePreview';

interface InvoiceFormProps {
  onClose: () => void;
  initialData?: any;
}

export function InvoiceForm({ onClose, initialData }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || '',
    dueDate: initialData?.dueDate 
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: initialData?.notes || '',
    paymentTerms: initialData?.paymentTerms || '30',
    items: initialData?.items || [{ id: Date.now(), productId: '', quantity: 1, price: 0, description: '' }],
  });

  const { customers } = useCustomerStore();
  const { products } = useInventoryStore();
  const { addInvoice, updateInvoice } = useInvoiceStore();

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), productId: '', quantity: 1, price: 0, description: '' }],
    });
  };

  const handleRemoveItem = (id: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== id),
    });
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => {
        if (item.id === id) {
          if (field === 'productId') {
            const product = products.find(p => p.id === value);
            return {
              ...item,
              [field]: value,
              price: product?.price || 0,
              description: product?.description || '',
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.18; // 18% TVA
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    const invoiceData = {
      ...formData,
      items: formData.items.map(item => ({
        ...item,
        total: item.price * item.quantity,
      })),
      subtotal,
      tax,
      total,
      status: 'draft',
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialData) {
      updateInvoice(initialData.id, invoiceData);
    } else {
      addInvoice({
        ...invoiceData,
        id: `INV-${Date.now()}`,
        number: `FACT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      });
    }

    onClose();
  };

  return (
    <div className="flex h-[80vh]">
      {/* Form Section */}
      <div className="w-1/2 p-6 overflow-y-auto border-r">
        <h2 className="text-lg font-semibold mb-6">
          {initialData ? 'Modifier la facture' : 'Nouvelle facture'}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Date d'échéance
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">
                Conditions de paiement
              </label>
              <select
                id="paymentTerms"
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="0">Paiement immédiat</option>
                <option value="15">15 jours</option>
                <option value="30">30 jours</option>
                <option value="45">45 jours</option>
                <option value="60">60 jours</option>
              </select>
            </div>
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
              {formData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
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
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Description"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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

          <div className="flex justify-end space-x-3">
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

      {/* Preview Section */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
        <div className="sticky top-0">
          <h2 className="text-lg font-semibold mb-6">Aperçu</h2>
          <InvoicePreview
            data={{
              ...formData,
              subtotal: calculateSubtotal(),
              tax: calculateTax(calculateSubtotal()),
              total: calculateTotal(),
              customer: customers.find(c => c.id === formData.customerId),
              items: formData.items.map(item => ({
                ...item,
                product: products.find(p => p.id === item.productId),
                total: item.price * item.quantity,
              })),
            }}
          />
        </div>
      </div>
    </div>
  );
}