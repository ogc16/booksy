import React, { useState } from 'react';
import { AppLayout } from "@/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { DollarSign, Receipt, Building, Settings as SettingsIcon, Wallet } from "lucide-react";

const Settings = () => {
  const [currency, setCurrency] = useLocalStorage("app-currency", "USD");
  const [currencySymbol, setCurrencySymbol] = useLocalStorage("app-currency-symbol", "$");
  const [vatRate, setVatRate] = useLocalStorage("app-vat-rate", "0");
  const [vatEnabled, setVatEnabled] = useLocalStorage("app-vat-enabled", false);
  const [companyName, setCompanyName] = useLocalStorage("app-company-name", "");
  const [companyAddress, setCompanyAddress] = useLocalStorage("app-company-address", "");
  const [companyPhone, setCompanyPhone] = useLocalStorage("app-company-phone", "");
  const [companyEmail, setCompanyEmail] = useLocalStorage("app-company-email", "");
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage("app-monthly-budget", "0");
  const [yearlyBudget, setYearlyBudget] = useLocalStorage("app-yearly-budget", "0");
  const [budgetStartMonth, setBudgetStartMonth] = useLocalStorage("app-budget-start-month", "1");

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "$", name: "Australian Dollar" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
  ];

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    const selectedCurrency = currencies.find(c => c.code === value);
    if (selectedCurrency) {
      setCurrencySymbol(selectedCurrency.symbol);
    }
    toast.success(`Currency updated to ${value}`);
  };

  const handleSaveTaxSettings = () => {
    toast.success("Tax settings saved successfully");
  };

  const handleSaveCompanyInfo = () => {
    toast.success("Company information saved successfully");
  };

  const handleSaveBudgetSettings = () => {
    toast.success("Budget settings saved successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">Configure your application settings</p>
          </div>
        </div>

        <Tabs defaultValue="currency" className="space-y-4">
          <TabsList>
            <TabsTrigger value="currency">
              <DollarSign className="h-4 w-4 mr-2" />
              Currency
            </TabsTrigger>
            <TabsTrigger value="taxes">
              <Receipt className="h-4 w-4 mr-2" />
              Taxes
            </TabsTrigger>
            <TabsTrigger value="budget">
              <Wallet className="h-4 w-4 mr-2" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="company">
              <Building className="h-4 w-4 mr-2" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="currency">
            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>Set your default currency for the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="currency">Select Currency</Label>
                  <Select value={currency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.symbol} - {curr.name} ({curr.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="currencySymbol">Currency Symbol</Label>
                  <Input
                    id="currencySymbol"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="taxes">
            <Card>
              <CardHeader>
                <CardTitle>Tax Settings</CardTitle>
                <CardDescription>Configure VAT and other tax settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vatEnabled"
                    checked={vatEnabled}
                    onChange={(e) => setVatEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="vatEnabled">Enable VAT</Label>
                </div>
                
                {vatEnabled && (
                  <div className="space-y-1">
                    <Label htmlFor="vatRate">VAT Rate (%)</Label>
                    <Input
                      id="vatRate"
                      type="number"
                      min="0"
                      max="100"
                      value={vatRate}
                      onChange={(e) => setVatRate(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveTaxSettings}>Save Tax Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget Settings</CardTitle>
                <CardDescription>Configure your budget preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="monthlyBudget">Monthly Budget Target</Label>
                  <Input
                    id="monthlyBudget"
                    type="number"
                    min="0"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="yearlyBudget">Yearly Budget Target</Label>
                  <Input
                    id="yearlyBudget"
                    type="number"
                    min="0"
                    value={yearlyBudget}
                    onChange={(e) => setYearlyBudget(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="budgetStartMonth">Fiscal Year Start Month</Label>
                  <Select
                    value={budgetStartMonth}
                    onValueChange={setBudgetStartMonth}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveBudgetSettings}>Save Budget Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details for invoices and documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Input
                    id="companyAddress"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="companyPhone">Phone Number</Label>
                  <Input
                    id="companyPhone"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="companyEmail">Email Address</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveCompanyInfo}>Save Company Info</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced application options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Advanced settings will be available in a future update.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
