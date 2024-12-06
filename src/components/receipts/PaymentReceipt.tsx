import React from 'react';
import { PaymentReceipt as PaymentReceiptType } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCustomerStore } from '../../store/useCustomerStore';

interface PaymentReceiptProps {
  receipt: PaymentReceiptType;
}

export function PaymentReceipt({ receipt }: PaymentReceiptProps) {
  const { customers } = useCustomerStore();
  const customer = customers.find((c) => c.id === receipt.customerId);

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash':
        return 'Espèces';
      case 'bank_transfer':
        return 'Virement bancaire';
      case 'check':
        return 'Chèque';
      case 'mobile_money':
        return 'Mobile Money';
      default:
        return method;
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
      <div className="border-b pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reçu de paiement</h1>
            <p className="text-sm text-gray-500">N° {receipt.number}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date du paiement</p>
            <p className="font-medium">
              {format(receipt.paymentDate, 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 border-b">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Client</h2>
            <div className="mt-2">
              <p className="text-lg font-medium text-gray-900">{customer?.name}</p>
              <p className="text-gray-500">{customer?.address}</p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Détails du paiement</h2>
            <div className="mt-2">
              <p className="text-lg font-medium text-gray-900">
                {formatCurrency(receipt.amount)}
              </p>
              <p className="text-gray-500">
                {getPaymentMethodLabel(receipt.paymentMethod)}
                {receipt.reference && ` - Réf: ${receipt.reference}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {receipt.notes && (
        <div className="py-8 border-b">
          <h2 className="text-sm font-medium text-gray-500">Notes</h2>
          <p className="mt-2 text-gray-600">{receipt.notes}</p>
        </div>
      )}

      <div className="pt-8">
        <div className="text-sm text-gray-500">
          <p>Ce reçu atteste du paiement effectué.</p>
          <p>Date d'émission : {format(receipt.createdAt, 'dd MMMM yyyy', { locale: fr })}</p>
        </div>
      </div>
    </div>
  );
}