import { z } from 'zod';

export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant',
  INVENTORY_MANAGER: 'inventory_manager',
  SALES_AGENT: 'sales_agent',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'manager', 'accountant', 'inventory_manager', 'sales_agent']),
  isActive: z.boolean(),
  lastLogin: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const UserPermissions = {
  // Inventory permissions
  VIEW_INVENTORY: 'view_inventory',
  MANAGE_INVENTORY: 'manage_inventory',
  
  // Invoice permissions
  VIEW_INVOICES: 'view_invoices',
  CREATE_INVOICES: 'create_invoices',
  MANAGE_INVOICES: 'manage_invoices',
  
  // Quote permissions
  VIEW_QUOTES: 'view_quotes',
  CREATE_QUOTES: 'create_quotes',
  MANAGE_QUOTES: 'manage_quotes',
  
  // Customer permissions
  VIEW_CUSTOMERS: 'view_customers',
  MANAGE_CUSTOMERS: 'manage_customers',
  
  // Supplier permissions
  VIEW_SUPPLIERS: 'view_suppliers',
  MANAGE_SUPPLIERS: 'manage_suppliers',
  
  // Settings permissions
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
  
  // User management permissions
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
} as const;

export type UserPermission = typeof UserPermissions[keyof typeof UserPermissions];

export const RolePermissions: Record<UserRole, UserPermission[]> = {
  admin: Object.values(UserPermissions),
  manager: [
    UserPermissions.VIEW_INVENTORY,
    UserPermissions.MANAGE_INVENTORY,
    UserPermissions.VIEW_INVOICES,
    UserPermissions.CREATE_INVOICES,
    UserPermissions.MANAGE_INVOICES,
    UserPermissions.VIEW_QUOTES,
    UserPermissions.CREATE_QUOTES,
    UserPermissions.MANAGE_QUOTES,
    UserPermissions.VIEW_CUSTOMERS,
    UserPermissions.MANAGE_CUSTOMERS,
    UserPermissions.VIEW_SUPPLIERS,
    UserPermissions.MANAGE_SUPPLIERS,
    UserPermissions.VIEW_SETTINGS,
  ],
  accountant: [
    UserPermissions.VIEW_INVENTORY,
    UserPermissions.VIEW_INVOICES,
    UserPermissions.CREATE_INVOICES,
    UserPermissions.MANAGE_INVOICES,
    UserPermissions.VIEW_QUOTES,
    UserPermissions.VIEW_CUSTOMERS,
  ],
  inventory_manager: [
    UserPermissions.VIEW_INVENTORY,
    UserPermissions.MANAGE_INVENTORY,
    UserPermissions.VIEW_SUPPLIERS,
    UserPermissions.MANAGE_SUPPLIERS,
  ],
  sales_agent: [
    UserPermissions.VIEW_INVENTORY,
    UserPermissions.VIEW_INVOICES,
    UserPermissions.CREATE_INVOICES,
    UserPermissions.VIEW_QUOTES,
    UserPermissions.CREATE_QUOTES,
    UserPermissions.VIEW_CUSTOMERS,
    UserPermissions.MANAGE_CUSTOMERS,
  ],
};