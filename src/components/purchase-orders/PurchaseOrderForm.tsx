import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { usePurchaseOrderStore } from '../../store/usePurchaseOrderStore';
import { useSupplierStore } from '../../store/useSupplierStore';
import { useInventoryStore } from '../../store/useInventoryStore';
import { formatCurrency } from '../../lib/utils';
import { PurchaseOrderStatus } from '../../types/purchaseOrder';

interface PurchaseOrderFormProps {
  onClose: () => void;
  initialData?: any;
}

export function PurchaseOrderForm({ onClose, initialData }: PurchaseOrderFormProps) {
  const [formData, setFormData] = useState({
    supplierId: initialData?.supplierId || '',
    expectedDeliveryDate: initialData?.expectedDeliveryDate 
      ? new Date(initialData.expectedDeliveryDate).toISOString().split('T')[0]
      : '',
    notes: initialData?.notes || '',
    items: initialData?.items || [{ id: Date.now(), productId: '', quantity: 1, unitPrice: 0 }],
  });

  const { suppliers } = useSupplierStore();
  const { products } = useInventoryStore();
  const { addOrder, updateOrder } = usePurchaseOrderStore();

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), productId: '', quantity: 1, unitPrice: 0 }],
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
              unitPrice: product?.price || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.18; // 18% TVA
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    const orderData = {
      ...formData,
      items: formData.items.map(item => ({
        ...item,
        total: item.unitPrice * item.quantity,
      })),
      subtotal,
      tax,
      total,
      status: PurchaseOrderStatus.DRAFT,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialData) {
      updateOrder(initialData.id, orderData);
    } else {
      addOrder({
        ...orderData,
        id: `PO-${Date.now()}`,
        number: `BC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      });
    }

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">
        {initialData ? 'Modifier le bon de commande' : 'Nouveau bon de commande'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700">
            Fournisseur
          </label>
          <select
            id="supplierId"
            value={formData.supplierId}
            onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Sélectionner un fournisseur</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">
            Date de livraison souhaitée
          </label>
          <input
            type="date"
            id="expectedDeliveryDate"
            value={formData.expectedDeliveryDate}
            onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
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
            {formData.items.map((item) => (
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
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="w-32 text-right font-medium">
                  {formatCurrency(item.unitPrice * item.quantity)}
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