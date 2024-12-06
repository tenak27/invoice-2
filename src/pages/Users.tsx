import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserList } from '../components/users/UserList';
import { UserForm } from '../components/users/UserForm';
import { Modal } from '../components/ui/Modal';
import { usePermissions } from '../hooks/usePermissions';
import { UserPermissions } from '../types/user';

export function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const { hasPermission } = usePermissions();

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  if (!hasPermission(UserPermissions.VIEW_USERS)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Utilisateurs</h1>
        {hasPermission(UserPermissions.MANAGE_USERS) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouvel Utilisateur
          </button>
        )}
      </div>

      <UserList onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <UserForm onClose={handleClose} initialData={editingUser} />
      </Modal>
    </div>
  );
}