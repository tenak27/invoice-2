import React from 'react';
import { Edit, Trash2, Phone, Mail } from 'lucide-react';
import { useSupplierStore } from '../../store/useSupplierStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function SupplierList() {
  const { suppliers } = useSupplierStore();

  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fournisseur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adresse
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'ajout
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                  <div className="text-sm text-gray-500">{supplier.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <a href={`mailto:${supplier.email}`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {supplier.email}
                    </a>
                    <a href={`tel:${supplier.phone}`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {supplier.phone}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(supplier.createdAt, 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="h-4 w-4 inline" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
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