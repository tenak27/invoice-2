import React from 'react';
import { Edit, Trash2, Eye, Send, FileText, Truck } from 'lucide-react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface QuoteListProps {
  onEdit: (quote: any) => void;
}

export function QuoteList({ onEdit }: QuoteListProps) {
  const { quotes, deleteQuote, convertToInvoice } = useQuoteStore();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyé';
      case 'converted':
        return 'Converti';
      default:
        return status;
    }
  };

  const handleConvertToInvoice = (id: string) => {
    if (window.confirm('Voulez-vous convertir ce devis en facture ?')) {
      convertToInvoice(id);
      // Here you would typically create a new invoice based on the quote
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
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de validité
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
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {quote.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Client {quote.customerId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(quote.validUntil, 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(quote.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(quote.status)}`}>
                    {getStatusLabel(quote.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Eye className="h-4 w-4 inline" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Send className="h-4 w-4 inline" />
                  </button>
                  {quote.status !== 'converted' && (
                    <>
                      <button 
                        onClick={() => handleConvertToInvoice(quote.id)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Convertir en facture"
                      >
                        <FileText className="h-4 w-4 inline" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        title="Créer un bon de livraison"
                      >
                        <Truck className="h-4 w-4 inline" />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => onEdit(quote)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4 inline" />
                  </button>
                  <button 
                    onClick={() => deleteQuote(quote.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}