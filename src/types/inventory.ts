
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
  attributes?: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  date: string;
  status: 'draft' | 'sent' | 'received' | 'cancelled';
  items: PurchaseOrderItem[];
  total: number;
}

export interface PurchaseOrderItem {
  itemId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface StockLevel {
  itemId: string;
  name: string;
  sku: string;
  currentStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}
