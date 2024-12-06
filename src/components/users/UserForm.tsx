import React, { useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { UserRole } from '../../types/user';

interface UserFormProps {
  onClose: () => void;
  initialData?: any;
}

export function UserForm({ onClose, initialData }: UserFormProps) {
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    name: initialData?.name || '',
    role: initialData?.role || 'sales_agent',
    isActive: initialData?.isActive ?? true,
  });

  const { addUser, updateUser } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      updateUser(initialData.id, formData);
    } else {
      addUser({
        ...formData,
        lastLogin: null,
      });
    }

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">
        {initialData ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom complet
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

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value={UserRole.ADMIN}>Administrateur</option>
            <option value={UserRole.MANAGER}>Gestionnaire</option>
            <option value={UserRole.ACCOUNTANT}>Comptable</option>
            <option value={UserRole.INVENTORY_MANAGER}>Gestionnaire de stock</option>
            <option value={UserRole.SALES_AGENT}>Commercial</option>
          </select>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="isActive" className="font-medium text-gray-700">
              Utilisateur actif
            </label>
            <p className="text-gray-500">
              Les utilisateurs inactifs ne peuvent pas se connecter au système
            </p>
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