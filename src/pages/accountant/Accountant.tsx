import { AppLayout } from "@/layouts/AppLayout";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  FileText, 
  DollarSign, 
  CreditCard, 
  BarChart4, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Download,
  CheckCircle,
  XCircle,
  FileBarChart
} from "lucide-react";
import { toast } from "sonner";

const Accountant = () => {
  const { user, hasPermission } = useAuth();
  const [balance, setBalance] = useState<number>(5000);
  const [deferredIncome, setDeferredIncome] = useState<number>(0);
  const isAccountant = user?.role === "accountant";
  const isJuniorAccountant = user?.role === "user"; // Using 'user' as junior accountant for now
  const isManager = user?.role === "manager";
  
  const [statements, setStatements] = useState<
    { id: number; title: string; type: string; date: string; status: string }[]
  >([
    { id: 1, title: "Accounts Payable", type: "payables", date: "March 2024", status: "Ready" },
    { id: 2, title: "Accounts Receivable", type: "receivable", date: "March 2024", status: "Ready" },
    { id: 3, title: "Cash Flow Statement", type: "cash-flow", date: "Q1 2024", status: "Ready" },
    { id: 4, title: "Balance Sheet", type: "balance-sheet", date: "Q1 2024", status: "Ready" },
    { id: 5, title: "Tax Summary", type: "tax-summary", date: "Q1 2024", status: "Pending" },
    { id: 6, title: "Trial Balance", type: "trial-balance", date: "March 2024", status: "Ready" }
  ]);

  const [dashboardWidgets, setDashboardWidgets] = useState<
    { id: number; title: string; value: string }[]
  >([
    { id: 1, title: "Current Balance", value: `$${balance.toFixed(2)}` },
    { id: 2, title: "Outstanding Invoices", value: "12" },
    { id: 3, title: "Recent Transactions", value: "View Transactions" },
    { id: 4, title: "Deferred Income", value: `$${deferredIncome.toFixed(2)}`},
  ]);
  
  const [deletionRequests, setDeletionRequests] = useState<
    { id: number; item: string; requestedBy: string; date: string; reason: string; status: string }[]
  >([
    { id: 1, item: "Invoice #1042", requestedBy: "Junior Accountant", date: "2024-03-25", reason: "Duplicate entry", status: "pending" },
    { id: 2, item: "Customer: Stark Industries", requestedBy: "Junior Accountant", date: "2024-03-24", reason: "No longer a client", status: "pending" }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setDashboardWidgets([
      { id: 1, title: "Current Balance", value: `$${balance.toFixed(2)}` },
      { id: 2, title: "Outstanding Invoices", value: "12" },
      { id: 3, title: "Recent Transactions", value: "View Transactions" },
      { id: 4, title: "Deferred Income", value: `$${deferredIncome.toFixed(2)}`},
    ]);
  }, [balance, deferredIncome]);

  const handleStatementClick = (type: string) => {
    // In a real app, this would download or display the statement
    toast.success(`Opening ${type} statement`);
  };
  
  const handleApproveDelete = (id: number) => {
    setDeletionRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: 'approved' } : req
      )
    );
    toast.success("Deletion request approved");
  };
  
  const handleRejectDelete = (id: number) => {
    setDeletionRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: 'rejected' } : req
      )
    );
    toast.success("Deletion request rejected");
  };
  
  const handleDownloadStatement = (title: string) => {
    toast.success(`Downloading ${title}`);
  };

  const handleViewReports = () => {
    navigate("/accountant/reports");
  };

  const reports = [
    { id: 1, title: "Budget Overview", link: "/reports/budget" },
    { id: 2, title: "Profit & Loss", link: "/reports/profit-loss" },
    { id: 3, title: "Revenue Report", link: "/reports/revenue" },
    { id: 4, title: "Expense Analysis", link: "/reports/expenses" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accounting Dashboard</h1>
            <p className="text-gray-600">Manage financial statements and accounting tasks</p>
          </div>
          <div className="flex gap-2">
            {hasPermission(["manager"]) && (
              <Button onClick={() => navigate("/admin")}>
                Admin Panel
              </Button>
            )}
            <Button onClick={handleViewReports} variant="outline">
              <FileBarChart className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dashboardWidgets.map((widget) => (
            <Card key={widget.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">{widget.title}</h3>
              <p className="mt-2 text-2xl font-bold">{widget.value}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="statements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="statements">Statements</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {!isJuniorAccountant && (
              <TabsTrigger value="approvals">Deletion Approvals</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="statements">
            <Card>
              <CardHeader>
                <CardTitle>Financial Statements</CardTitle>
                <CardDescription>Access and download your financial statements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statements.map((statement) => (
                      <TableRow key={statement.id}>
                        <TableCell className="font-medium">{statement.title}</TableCell>
                        <TableCell>{statement.date}</TableCell>
                        <TableCell>
                          <Badge variant={statement.status === "Ready" ? "default" : "outline"}>
                            {statement.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatementClick(statement.type)}
                              disabled={statement.status !== "Ready"}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadStatement(statement.title)}
                              disabled={statement.status !== "Ready"}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Access and analyze your financial reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.map((report) => (
                    <Button
                      key={report.id}
                      variant="outline"
                      className="w-full text-left flex items-center gap-2"
                      onClick={() => handleViewReports()}
                    >
                      <FileBarChart className="h-4 w-4" />
                      {report.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {!isJuniorAccountant && (
            <TabsContent value="approvals">
              <Card>
                <CardHeader>
                  <CardTitle>Deletion Requests</CardTitle>
                  <CardDescription>Approve or reject deletion requests from junior accountants</CardDescription>
                </CardHeader>
                <CardContent>
                  {deletionRequests.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Requested By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deletionRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.item}</TableCell>
                            <TableCell>{request.requestedBy}</TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>{request.reason}</TableCell>
                            <TableCell>
                              {request.status === 'pending' ? (
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleApproveDelete(request.id)}
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleRejectDelete(request.id)}
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                                  {request.status === 'approved' ? 'Approved' : 'Rejected'}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10">
                      <p>No deletion requests pending</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Accountant;
