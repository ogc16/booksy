
import { AppLayout } from "@/layouts/AppLayout";
import { Card } from "@/components/ui/card";
import { Receipt, Plus, Tag, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Expense {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: string;
}

interface ExpenseType {
  id: number;
  name: string;
  description: string;
}

const ExpensesList = ({ expenses, expenseTypes }: { expenses: Expense[], expenseTypes: ExpenseType[] }) => {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card key={expense.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Receipt className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-medium">{expense.description}</h3>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-red-600">
                -${expense.amount.toFixed(2)}
              </span>
              <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                {expense.category}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Office Supplies", date: "2024-03-15", amount: 250, category: "Supplies" },
    { id: 2, description: "Software Subscription", date: "2024-03-18", amount: 99, category: "Software" },
    { id: 3, description: "Team Lunch", date: "2024-03-20", amount: 175, category: "Meals" },
  ]);

  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([
    { id: 1, name: "Supplies", description: "Office supplies and materials" },
    { id: 2, name: "Software", description: "Software subscriptions and licenses" },
    { id: 3, name: "Meals", description: "Business meals and catering" },
    { id: 4, name: "Travel", description: "Business travel expenses" },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
  });

  const [newExpenseType, setNewExpenseType] = useState({
    name: "",
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleAddExpense = () => {
    const expense: Expense = {
      id: expenses.length + 1,
      description: newExpense.description,
      date: newExpense.date,
      amount: parseFloat(newExpense.amount) || 0,
      category: newExpense.category,
    };
    
    setExpenses([...expenses, expense]);
    setNewExpense({
      description: "",
      date: "",
      amount: "",
      category: "",
    });
  };

  const handleAddExpenseType = () => {
    const expenseType: ExpenseType = {
      id: expenseTypes.length + 1,
      name: newExpenseType.name,
      description: newExpenseType.description,
    };
    
    setExpenseTypes([...expenseTypes, expenseType]);
    setNewExpenseType({
      name: "",
      description: "",
    });
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType ? expense.category === filterType : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Expenses</h1>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new expense.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select 
                      value={newExpense.category} 
                      onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseTypes.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddExpense}>Add Expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Tag className="w-4 h-4 mr-2" />
                  Expense Types
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Manage Expense Types</DialogTitle>
                  <DialogDescription>
                    View and add expense categories.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 my-4">
                  <h3 className="font-medium">Current Expense Types</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {expenseTypes.map((type) => (
                      <div key={type.id} className="flex justify-between items-center border p-2 rounded">
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-sm text-gray-500">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-medium pt-4">Add New Expense Type</h3>
                  <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="typeName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="typeName"
                        value={newExpenseType.name}
                        onChange={(e) => setNewExpenseType({...newExpenseType, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="typeDescription" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="typeDescription"
                        value={newExpenseType.description}
                        onChange={(e) => setNewExpenseType({...newExpenseType, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" onClick={handleAddExpenseType}>Add Type</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search expenses..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select 
            value={filterType || ""} 
            onValueChange={(value) => setFilterType(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {expenseTypes.map((type) => (
                <SelectItem key={type.id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <ExpensesList expenses={filteredExpenses} expenseTypes={expenseTypes} />
      </div>
    </AppLayout>
  );
};

export default Expenses;
