import { useAuthStore } from '../store/useAuthStore';
import { RolePermissions, UserPermission } from '../types/user';

export function usePermissions() {
  const { user } = useAuthStore();
  
  const hasPermission = (permission: UserPermission): boolean => {
    if (!user) return false;
    return RolePermissions[user.role].includes(permission);
  };

  const hasAnyPermission = (permissions: UserPermission[]): boolean => {
    if (!user) return false;
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: UserPermission[]): boolean => {
    if (!user) return false;
    return permissions.every((permission) => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}