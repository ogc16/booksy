
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  total: number;
  status: string;
  paymentStatus: string;
  amount?: number; // For backward compatibility
  attachments?: File[];
}
