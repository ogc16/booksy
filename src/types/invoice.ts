
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: string;
  client: string;
  items: InvoiceItem[];
  attachments?: File[];
}
