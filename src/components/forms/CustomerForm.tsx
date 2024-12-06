import React, { useState } from 'react';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Plus, Trash2 } from 'lucide-react';

interface CustomerFormProps {
  onClose: () => void;
  initialData?: any;
}

export function CustomerForm({ onClose, initialData }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    // Mentions obligatoires
    taxId: initialData?.taxId || '',
    registrationNumber: initialData?.registrationNumber || '', // RCCM
    taxRegime: initialData?.taxRegime || '',
    legalForm: initialData?.legalForm || '',
    capital: initialData?.capital || '',
    bankDetails: initialData?.bankDetails || '',
    contacts: initialData?.contacts || [],
  });

  const { addCustomer, updateCustomer } = useCustomerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customerData = {
      ...formData,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (initialData) {
      updateCustomer(initialData.id, customerData);
    } else {
      addCustomer({
        ...customerData,
        id: `CUST-${Date.now()}`,
      });
    }

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-6">
        {initialData ? 'Modifier le client' : 'Nouveau client'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Informations générales</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Raison sociale <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adresse complète <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Mentions obligatoires</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                  N° d'identification fiscale <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                  N° RCCM <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="taxRegime" className="block text-sm font-medium text-gray-700">
                  Régime fiscal <span className="text-red-500">*</span>
                </label>
                <select
                  id="taxRegime"
                  value={formData.taxRegime}
                  onChange={(e) => setFormData({ ...formData, taxRegime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner un régime</option>
                  <option value="TEE">TEE - Taxe d'Entreprise d'Exportation</option>
                  <option value="RNI">RNI - Régime Normal d'Imposition</option>
                  <option value="RSI">RSI - Régime Simplifié d'Imposition</option>
                  <option value="CGU">CGU - Contribution Globale Unique</option>
                </select>
              </div>

              <div>
                <label htmlFor="legalForm" className="block text-sm font-medium text-gray-700">
                  Forme juridique <span className="text-red-500">*</span>
                </label>
                <select
                  id="legalForm"
                  value={formData.legalForm}
                  onChange={(e) => setFormData({ ...formData, legalForm: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner une forme juridique</option>
                  <option value="SA">SA - Société Anonyme</option>
                  <option value="SARL">SARL - Société à Responsabilité Limitée</option>
                  <option value="SAS">SAS - Société par Actions Simplifiée</option>
                  <option value="SUARL">SUARL - Société Unipersonnelle à Responsabilité Limitée</option>
                  <option value="EI">EI - Entreprise Individuelle</option>
                  <option value="GIE">GIE - Groupement d'Intérêt Économique</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="capital" className="block text-sm font-medium text-gray-700">
                  Capital social
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="capital"
                    value={formData.capital}
                    onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                    className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">FCFA</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700">
                Coordonnées bancaires
              </label>
              <textarea
                id="bankDetails"
                value={formData.bankDetails}
                onChange={(e) => setFormData({ ...formData, bankDetails: e.target.value })}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="RIB, IBAN, etc."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Contacts</h3>
          <div className="space-y-3">
            {formData.contacts.map((contact: any, index: number) => (
              <div key={index} className="border rounded-md p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Nom"
                      value={contact.name}
                      onChange={(e) => {
                        const newContacts = [...formData.contacts];
                        newContacts[index].name = e.target.value;
                        setFormData({ ...formData, contacts: newContacts });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={contact.email}
                      onChange={(e) => {
                        const newContacts = [...formData.contacts];
                        newContacts[index].email = e.target.value;
                        setFormData({ ...formData, contacts: newContacts });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={contact.phone}
                      onChange={(e) => {
                        const newContacts = [...formData.contacts];
                        newContacts[index].phone = e.target.value;
                        setFormData({ ...formData, contacts: newContacts });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Fonction"
                      value={contact.role}
                      onChange={(e) => {
                        const newContacts = [...formData.contacts];
                        newContacts[index].role = e.target.value;
                        setFormData({ ...formData, contacts: newContacts });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const newContacts = formData.contacts.filter((_, i) => i !== index);
                        setFormData({ ...formData, contacts: newContacts });
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  contacts: [
                    ...formData.contacts,
                    { id: Date.now().toString(), name: '', email: '', phone: '', role: '' }
                  ]
                });
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un contact
            </button>
          </div>
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