
import React from 'react';
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, BarChart3, Download, FileText, Printer } from "lucide-react";
import { toast } from "sonner";

// Sample report data
const inventoryReports = [
  { id: 1, name: "Inventory Valuation", period: "Q1 2024", date: "2024-03-31", status: "Ready" },
  { id: 2, name: "Stock Movement", period: "March 2024", date: "2024-03-31", status: "Ready" },
  { id: 3, name: "Low Stock Items", period: "Current", date: "2024-04-05", status: "Ready" },
  { id: 4, name: "Product Performance", period: "Q1 2024", date: "2024-03-31", status: "Processing" }
];

const salesReports = [
  { id: 1, name: "Sales by Product", period: "Q1 2024", date: "2024-03-31", status: "Ready" },
  { id: 2, name: "Sales Trends", period: "Last 12 Months", date: "2024-03-31", status: "Ready" },
  { id: 3, name: "Customer Revenue", period: "Q1 2024", date: "2024-03-31", status: "Ready" }
];

const purchaseReports = [
  { id: 1, name: "Purchase by Supplier", period: "Q1 2024", date: "2024-03-31", status: "Ready" },
  { id: 2, name: "Procurement Spend", period: "Q1 2024", date: "2024-03-31", status: "Ready" },
  { id: 3, name: "Supplier Performance", period: "Last 12 Months", date: "2024-03-31", status: "Processing" }
];

const AccountantReports = () => {
  const handleDownloadReport = (name: string) => {
    toast.success(`Downloading ${name} report`);
  };

  const handlePrintReport = (name: string) => {
    toast.success(`Printing ${name} report`);
  };

  const handleViewReport = (name: string) => {
    toast.success(`Viewing ${name} report`);
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accounting Reports</h1>
            <p className="text-muted-foreground">View and download financial reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Create Custom Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="inventory">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="purchases">Purchase Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleViewReport(report.name)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleDownloadReport(report.name)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handlePrintReport(report.name)}
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Print
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

          <TabsContent value="sales" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleViewReport(report.name)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleDownloadReport(report.name)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handlePrintReport(report.name)}
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Print
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

          <TabsContent value="purchases" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleViewReport(report.name)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handleDownloadReport(report.name)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled={report.status !== "Ready"}
                              onClick={() => handlePrintReport(report.name)}
                            >
                              <Printer className="h-4 w-4 mr-1" />
                              Print
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
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AccountantReports;
