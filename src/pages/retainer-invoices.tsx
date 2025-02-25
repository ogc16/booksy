import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState } from 'react';

interface RetainerInvoice {
  id: number;
  clientName: string;
  retainerPeriod: string;
  amount: number;
  issueDate: string;
  status: 'Draft' | 'Sent' | 'Paid';
}

const RetainerInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<RetainerInvoice[]>([
    {
      id: 1,
      clientName: "Acme Corporation",
      retainerPeriod: "January 2024",
      amount: 5000,
      issueDate: "2024-01-05",
      status: "Paid",
    },
    {
      id: 2,
      clientName: "Globex Industries",
      retainerPeriod: "February 2024",
      amount: 7500,
      issueDate: "2024-02-01",
      status: "Sent",
    },
    {
      id: 3,
      clientName: "Initech",
      retainerPeriod: "March 2024",
      amount: 6000,
      issueDate: "2024-03-03",
      status: "Draft",
    },
  ]);

  const [newInvoice, setNewInvoice] = useState<RetainerInvoice>({
    id: invoices.length + 1,
    clientName: '',
    retainerPeriod: '',
    amount: 0,
    issueDate: '',
    status: 'Draft',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInvoice = () => {
    setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
    setNewInvoice({
      id: invoices.length + 2,
      clientName: '',
      retainerPeriod: '',
      amount: 0,
      issueDate: '',
      status: 'Draft',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-3xl font-bold">Retainer Invoices</h1>
        <p className="text-gray-600">Manage your retainer invoices</p>

        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add New Invoice</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={newInvoice.clientName}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="retainerPeriod"
              placeholder="Retainer Period"
              value={newInvoice.retainerPeriod}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newInvoice.amount}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="issueDate"
              value={newInvoice.issueDate}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <button onClick={handleAddInvoice} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Add Invoice
          </button>
        </div>

        <div className="border p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Invoice List</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Client</th>
                <th className="text-left">Period</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Issue Date</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="py-2">{invoice.clientName}</td>
                  <td className="py-2">{invoice.retainerPeriod}</td>
                  <td className="py-2">${invoice.amount}</td>
                  <td className="py-2">{invoice.issueDate}</td>
                  <td className="py-2">{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default RetainerInvoices;