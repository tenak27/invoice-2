import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const activities = [
  {
    id: 1,
    type: 'invoice',
    description: 'Facture #INV-2024-001 créée pour Client A',
    timestamp: new Date(2024, 2, 15, 14, 30),
  },
  {
    id: 2,
    type: 'stock',
    description: 'Stock mis à jour : +50 Produit X',
    timestamp: new Date(2024, 2, 15, 12, 15),
  },
  {
    id: 3,
    type: 'payment',
    description: 'Paiement reçu de Client B (2,500 €)',
    timestamp: new Date(2024, 2, 15, 10, 45),
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Activité récente</h2>
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-600" />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {format(activity.timestamp, 'PPp', { locale: fr })}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}