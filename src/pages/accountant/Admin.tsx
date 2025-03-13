
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  XCircle, 
  UserCheck,
  ClipboardList,
  AlertTriangle,
  MoreHorizontal,
  UserPlus,
  Users,
  ShieldAlert,
  Clock,
  Lock,
  Network
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

  const [users, setUsers] = useState([
    { id: 1, name: "John Smith", email: "jsmith@example.com", role: "manager", status: "active", lastLogin: "2024-03-28 09:22:33" },
    { id: 2, name: "Jane Doe", email: "jdoe@example.com", role: "accountant", status: "active", lastLogin: "2024-03-28 10:45:12" },
    { id: 3, name: "Bob Johnson", email: "bjohnson@example.com", role: "user", status: "inactive", lastLogin: "2024-03-25 14:08:45" },
    { id: 4, name: "Sarah Williams", email: "swilliams@example.com", role: "user", status: "active", lastLogin: "2024-03-27 16:33:21" },
    { id: 5, name: "Mike Davis", email: "mdavis@example.com", role: "inventory", status: "active", lastLogin: "2024-03-28 08:15:39" }
  ]);
  
  const [accessLogs, setAccessLogs] = useState([
    { id: 1, user: "John Smith", action: "Login", timestamp: "2024-03-28 09:22:33", ipAddress: "192.168.1.45", success: true },
    { id: 2, user: "Jane Doe", action: "Login", timestamp: "2024-03-28 10:45:12", ipAddress: "192.168.1.72", success: true },
    { id: 3, user: "Unknown", action: "Login", timestamp: "2024-03-28 07:12:08", ipAddress: "45.33.102.67", success: false },
    { id: 4, user: "Mike Davis", action: "Access Customer Data", timestamp: "2024-03-28 08:22:17", ipAddress: "192.168.1.38", success: true },
    { id: 5, user: "Sarah Williams", action: "Edit Invoice", timestamp: "2024-03-27 16:40:55", ipAddress: "192.168.1.91", success: true }
  ]);
  
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: "Multiple Failed Logins", source: "45.33.102.67", timestamp: "2024-03-28 07:12:08", severity: "high", status: "open" },
    { id: 2, type: "Unusual Access Pattern", source: "192.168.1.91", timestamp: "2024-03-27 16:40:55", severity: "medium", status: "investigating" },
    { id: 3, type: "After Hours Access", source: "192.168.1.45", timestamp: "2024-03-26 22:15:22", severity: "low", status: "resolved" }
  ]);
  
  const [tickets, setTickets] = useState([
    { id: 1, requester: "Jane Doe", subject: "Need permission for financial reports", status: "open", created: "2024-03-27 14:22:33" },
    { id: 2, requester: "Bob Johnson", subject: "Account reactivation request", status: "open", created: "2024-03-28 09:10:15" }
  ]);
  
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  
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
  
  const handleUpdateUserRole = (id: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast.success(`User role updated to ${newRole}`);
  };
  
  const handleToggleUserStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    toast.success(`User status changed to ${newStatus}`);
  };
  
  const handleCreateUser = () => {
    if (!newUserData.name || !newUserData.email) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      status: "active",
      lastLogin: "Never"
    };
    
    setUsers([...users, newUser]);
    setNewUserData({ name: "", email: "", role: "user" });
    toast.success(`User ${newUser.name} created successfully`);
  };
  
  const handleResolveAlert = (id: number) => {
    setSecurityAlerts(alerts => 
      alerts.map(alert => 
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
    toast.success("Security alert marked as resolved");
  };
  
  const handleApproveTicket = (id: number) => {
    setTickets(currentTickets => 
      currentTickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: "approved" } : ticket
      )
    );
    toast.success("Access request approved");
  };
  
  const handleRejectTicket = (id: number) => {
    setTickets(currentTickets => 
      currentTickets.map(ticket => 
        ticket.id === id ? { ...ticket, status: "rejected" } : ticket
      )
    );
    toast.success("Access request rejected");
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">Manage users, security, approvals, and system settings</p>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="security">Security Monitoring</TabsTrigger>
            <TabsTrigger value="approvals">Sales Approvals</TabsTrigger>
            <TabsTrigger value="tasks">Task Management</TabsTrigger>
            <TabsTrigger value="deletions">Deletion Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="pt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>System Users</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                        <DialogDescription>
                          Add a new user to the system. They'll receive an email to set their password.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={newUserData.name} 
                            onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={newUserData.email} 
                            onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select 
                            value={newUserData.role} 
                            onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Junior Accountant</SelectItem>
                              <SelectItem value="accountant">Accountant</SelectItem>
                              <SelectItem value="inventory">Inventory Manager</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleCreateUser}>Create User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={user.role}
                            onValueChange={(value) => handleUpdateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Junior Accountant</SelectItem>
                              <SelectItem value="accountant">Accountant</SelectItem>
                              <SelectItem value="inventory">Inventory Manager</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleUserStatus(user.id, user.status)}
                            >
                              {user.status === "active" ? "Disable" : "Enable"}
                            </Button>
                            <Button variant="outline" size="sm">Reset Password</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Access Request Tickets</CardTitle>
                <CardDescription>User requests waiting for your approval</CardDescription>
              </CardHeader>
              <CardContent>
                {tickets.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Requester</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.requester}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{ticket.created}</TableCell>
                          <TableCell>
                            <Badge variant={ticket.status === "open" ? "outline" : 
                              ticket.status === "approved" ? "default" : "destructive"}>
                              {ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {ticket.status === "open" && (
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleApproveTicket(ticket.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRejectTicket(ticket.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-10">
                    <p>No access requests pending</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity Logs</CardTitle>
                <CardDescription>Recent user activity in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          <Badge variant={log.success ? "default" : "destructive"}>
                            {log.success ? "Success" : "Failed"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">View All Logs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="pt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Intrusion Detection System</CardTitle>
                <CardDescription>Security alerts and suspicious activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-2 bg-red-100 rounded-full">
                        <ShieldAlert className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                        <h3 className="text-2xl font-bold">{securityAlerts.filter(a => a.status !== "resolved").length}</h3>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Failed Logins (24h)</p>
                        <h3 className="text-2xl font-bold">3</h3>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Lock className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">System Status</p>
                        <h3 className="text-2xl font-bold">Secure</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.type}</TableCell>
                        <TableCell>{alert.source}</TableCell>
                        <TableCell>{alert.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant={
                            alert.severity === "high" ? "destructive" : 
                            alert.severity === "medium" ? "default" : 
                            "outline"
                          }>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            alert.status === "open" ? "destructive" : 
                            alert.status === "investigating" ? "default" : 
                            "secondary"
                          }>
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {alert.status !== "resolved" && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveAlert(alert.id)}
                              >
                                Resolve
                              </Button>
                              <Button size="sm" variant="outline">
                                Investigate
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Network className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Network monitoring active
                  </span>
                </div>
                <Button>Run Security Scan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
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
