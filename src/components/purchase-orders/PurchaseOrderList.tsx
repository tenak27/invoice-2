import React from 'react';
import { Edit, Trash2, Eye, Send, CheckCircle, Package } from 'lucide-react';
import { usePurchaseOrderStore } from '../../store/usePurchaseOrderStore';
import { useSupplierStore } from '../../store/useSupplierStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PurchaseOrderStatus } from '../../types/purchaseOrder';

interface PurchaseOrderListProps {
  onEdit: (order: any) => void;
  onView: (order: any) => void;
}

export function PurchaseOrderList({ onEdit, onView }: PurchaseOrderListProps) {
  const { orders, updateStatus, deleteOrder } = usePurchaseOrderStore();
  const { suppliers } = useSupplierStore();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case PurchaseOrderStatus.CONFIRMED:
        return 'bg-green-100 text-green-800';
      case PurchaseOrderStatus.SENT:
        return 'bg-blue-100 text-blue-800';
      case PurchaseOrderStatus.RECEIVED:
        return 'bg-purple-100 text-purple-800';
      case PurchaseOrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case PurchaseOrderStatus.DRAFT:
        return 'Brouillon';
      case PurchaseOrderStatus.SENT:
        return 'Envoyé';
      case PurchaseOrderStatus.CONFIRMED:
        return 'Confirmé';
      case PurchaseOrderStatus.RECEIVED:
        return 'Reçu';
      case PurchaseOrderStatus.CANCELLED:
        return 'Annulé';
      default:
        return status;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon de commande ?')) {
      deleteOrder(id);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numéro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fournisseur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de livraison
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              const supplier = suppliers.find(s => s.id === order.supplierId);
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.expectedDeliveryDate && 
                      format(order.expectedDeliveryDate, 'dd MMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => onView(order)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4 inline" />
                    </button>
                    
                    {order.status === PurchaseOrderStatus.DRAFT && (
                      <>
                        <button
                          onClick={() => updateStatus(order.id, PurchaseOrderStatus.SENT)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Envoyer"
                        >
                          <Send className="h-4 w-4 inline" />
                        </button>
                        <button
                          onClick={() => onEdit(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4 inline" />
                        </button>
                      </>
                    )}

                    {order.status === PurchaseOrderStatus.SENT && (
                      <button
                        onClick={() => updateStatus(order.id, PurchaseOrderStatus.CONFIRMED)}
                        className="text-green-600 hover:text-green-900"
                        title="Marquer comme confirmé"
                      >
                        <CheckCircle className="h-4 w-4 inline" />
                      </button>
                    )}

                    {order.status === PurchaseOrderStatus.CONFIRMED && (
                      <button
                        onClick={() => updateStatus(order.id, PurchaseOrderStatus.RECEIVED)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Marquer comme reçu"
                      >
                        <Package className="h-4 w-4 inline" />
                      </button>
                    )}

                    {order.status === PurchaseOrderStatus.DRAFT && (
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}