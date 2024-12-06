import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DocumentPreviewProps {
  type: 'invoice' | 'quote';
  data: {
    number?: string;
    customer?: any;
    items: any[];
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
    validUntil?: Date;
    status?: string;
  };
}

export function DocumentPreview({ type, data }: DocumentPreviewProps) {
  const { settings } = useSettingsStore();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'sent': return 'Envoyé';
      case 'paid': return 'Payé';
      case 'overdue': return 'En retard';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      default: return status;
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b pb-8">
        <div className="flex justify-between items-start">
          <div>
            {settings.logo && (
              <img
                src={settings.logo}
                alt="Logo"
                className="h-16 object-contain mb-4"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{settings.companyName}</h1>
            <p className="text-sm text-gray-500">{settings.address}</p>
            <p className="text-sm text-gray-500">
              Tél: {settings.phone} | Email: {settings.email}
            </p>
            <p className="text-sm text-gray-500">N° TVA: {settings.taxId}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {type === 'invoice' ? 'FACTURE' : 'DEVIS'}
            </div>
            {data.number && (
              <p className="text-sm text-gray-500">N° {data.number}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">Date</p>
            <p className="font-medium">
              {format(new Date(), 'dd MMMM yyyy', { locale: fr })}
            </p>
            {data.validUntil && (
              <>
                <p className="text-sm text-gray-500 mt-2">Valable jusqu'au</p>
                <p className="font-medium">
                  {format(new Date(data.validUntil), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </>
            )}
            {data.status && (
              <div className="mt-4">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100">
                  {getStatusLabel(data.status)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client Information */}
      {data.customer && (
        <div className="py-8 border-b">
          <h2 className="text-sm font-medium text-gray-500">
            {type === 'invoice' ? 'Facturer à' : 'Client'}
          </h2>
          <div className="mt-2">
            <p className="text-lg font-medium text-gray-900">{data.customer.name}</p>
            <p className="text-gray-500">{data.customer.address}</p>
            <p className="text-gray-500">
              Tél: {data.customer.phone} | Email: {data.customer.email}
            </p>
            {data.customer.taxId && (
              <p className="text-gray-500">N° TVA: {data.customer.taxId}</p>
            )}
          </div>
        </div>
      )}

      {/* Items */}
      <div className="py-8 border-b">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="text-left font-medium py-2">Description</th>
              <th className="text-right font-medium py-2">Qté</th>
              <th className="text-right font-medium py-2">Prix unitaire</th>
              <th className="text-right font-medium py-2">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.items.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="py-4">
                  <div className="font-medium text-gray-900">
                    {item.product?.name || 'Produit non spécifié'}
                  </div>
                  <div className="text-gray-500">{item.description}</div>
                </td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">{formatCurrency(item.price)}</td>
                <td className="py-4 text-right">{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="py-8">
        <div className="flex justify-end">
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Sous-total</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatCurrency(data.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">TVA (18%)</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatCurrency(data.tax)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">
                {formatCurrency(data.total)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Notes */}
      {(data.notes || settings.invoiceNotes) && (
        <div className="border-t pt-8">
          <h2 className="text-sm font-medium text-gray-900 mb-2">Notes</h2>
          <div className="text-sm text-gray-600 whitespace-pre-line">
            {data.notes || settings.invoiceNotes}
          </div>
        </div>
      )}

      {/* Signature */}
      {settings.useSignature && settings.signature && (
        <div className="mt-8 flex justify-end">
          <div className="text-center">
            <img
              src={settings.signature}
              alt="Signature"
              className="h-16 object-contain mb-2"
            />
            <div className="text-sm text-gray-500">Signature autorisée</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-8 border-t text-sm text-gray-500 text-center">
        <p>{settings.companyName}</p>
        <p>{settings.address}</p>
        <p>Tél: {settings.phone} | Email: {settings.email}</p>
      </div>
    </div>
  );
}