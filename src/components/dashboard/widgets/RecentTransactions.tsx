import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatCurrency } from '../../../lib/utils';

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      type: 'payment',
      amount: 150000,
      date: new Date(),
      description: 'Paiement facture #INV-2024-001',
      status: 'success',
    },
    {
      id: 2,
      type: 'invoice',
      amount: 250000,
      date: new Date(),
      description: 'Nouvelle facture #INV-2024-002',
      status: 'pending',
    },
    {
      id: 3,
      type: 'quote',
      amount: 180000,
      date: new Date(),
      description: 'Devis accepté #QUOTE-2024-003',
      status: 'success',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {transaction.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(transaction.date, 'dd MMM yyyy HH:mm', { locale: fr })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {formatCurrency(transaction.amount)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
              {transaction.status === 'success' ? 'Succès' : 'En attente'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}