
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  UserCheck,
  ClipboardList,
  AlertTriangle,
  MoreHorizontal 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

const Admin = () => {
  const [salesApprovals, setSalesApprovals] = useState([
    { id: 1, customer: "Acme Inc", amount: "$5,230.00", date: "2023-05-28", status: "pending", type: "Invoice" },
    { id: 2, customer: "Globex Corp", amount: "$12,790.00", date: "2023-05-27", status: "pending", type: "Sales Order" },
    { id: 3, customer: "Wayne Enterprises", amount: "$8,450.00", date: "2023-05-26", status: "approved", type: "Estimate" }
  ]);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review Q2 financial report", assignee: "Unassigned", priority: "high", dueDate: "2023-06-10" },
    { id: 2, title: "Prepare tax documents", assignee: "Jane Smith", priority: "medium", dueDate: "2023-06-15" },
    { id: 3, title: "Reconcile bank accounts", assignee: "Unassigned", priority: "low", dueDate: "2023-06-05" }
  ]);
  
  const [deletionRequests, setDeletionRequests] = useState([
    { id: 1, item: "Invoice #1042", requestedBy: "John Doe", date: "2023-05-25", reason: "Duplicate entry" },
    { id: 2, item: "Customer: Stark Industries", requestedBy: "Sarah Johnson", date: "2023-05-24", reason: "No longer a client" }
  ]);
  
  const handleApprove = (id: number, type: string) => {
    // In a real app, would make an API call to approve
    toast.success(`${type} #${id} approved`);
  };
  
  const handleReject = (id: number, type: string) => {
    // In a real app, would make an API call to reject
    toast.success(`${type} #${id} rejected`);
  };
  
  const handleAssignTask = (id: number, name: string) => {
    // In a real app, would update the task with the new assignee
    toast.success(`Task assigned to ${name}`);
  };
  
  const handleConfirmDeletion = (id: number, item: string) => {
    // In a real app, would make an API call to confirm deletion
    toast.success(`Deletion of ${item} confirmed`);
  };
  
  const handleDenyDeletion = (id: number, item: string) => {
    // In a real app, would make an API call to deny deletion
    toast.success(`Deletion of ${item} denied`);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">Manage approvals, tasks, and deletion requests</p>
        </div>
        
        <Tabs defaultValue="approvals">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="approvals">Sales Approvals</TabsTrigger>
            <TabsTrigger value="tasks">Task Management</TabsTrigger>
            <TabsTrigger value="deletions">Deletion Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approvals" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Approvals</CardTitle>
                <CardDescription>Review and approve sales documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesApprovals.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "pending" ? "outline" : "default"}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1"
                                onClick={() => handleApprove(item.id, item.type)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1"
                                onClick={() => handleReject(item.id, item.type)}
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Already processed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Assign tasks to team members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>
                          {task.assignee === "Unassigned" ? (
                            <Badge variant="outline">Unassigned</Badge>
                          ) : (
                            task.assignee
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              task.priority === "high" ? "destructive" : 
                              task.priority === "medium" ? "default" : 
                              "outline"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAssignTask(task.id, "John Doe")}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Assign to John</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignTask(task.id, "Jane Smith")}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Assign to Jane</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignTask(task.id, "Alex Johnson")}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Assign to Alex</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Create New Task</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="deletions" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Deletion Requests</CardTitle>
                <CardDescription>Confirm or deny requests to delete data</CardDescription>
              </CardHeader>
              <CardContent>
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
                    {deletionRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.item}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center gap-1"
                              onClick={() => handleConfirmDeletion(request.id, request.item)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Confirm</span>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center gap-1"
                              onClick={() => handleDenyDeletion(request.id, request.item)}
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Deny</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Deletion actions cannot be undone.
                  </span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
