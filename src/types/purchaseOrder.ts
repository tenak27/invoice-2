import { z } from 'zod';

export const PurchaseOrderStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  CONFIRMED: 'confirmed',
  RECEIVED: 'received',
  CANCELLED: 'cancelled',
} as const;

export type PurchaseOrderStatus = typeof PurchaseOrderStatus[keyof typeof PurchaseOrderStatus];

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  expectedDeliveryDate?: Date;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  status: PurchaseOrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  expectedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  confirmedAt?: Date;
  receivedAt?: Date;
}