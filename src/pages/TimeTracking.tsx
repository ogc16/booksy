
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, Bell, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TimeTracking = () => {
  const [date, setDate] = useState<Date>();
  const [reminderDate, setReminderDate] = useState<Date>();
  
  const [reminders, setReminders] = useState([
    { id: 1, title: "Complete project proposal", date: new Date(2023, 5, 25, 10, 0), description: "Final review of the Q3 marketing plan" },
    { id: 2, title: "Client follow-up", date: new Date(2023, 5, 27, 14, 30), description: "Send email to ABC Corp about pending invoice" }
  ]);
  
  const [meetings, setMeetings] = useState([
    { id: 1, title: "Team weekly sync", date: new Date(2023, 5, 26, 9, 0), attendees: "Product team", location: "Main conference room" },
    { id: 2, title: "Client presentation", date: new Date(2023, 5, 28, 13, 0), attendees: "Sales team, XYZ Inc", location: "Virtual - Zoom" }
  ]);
  
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, project: "Website Redesign", task: "Homepage mockup", date: new Date(2023, 5, 24), duration: "3.5", notes: "Completed initial draft" },
    { id: 2, project: "App Development", task: "API integration", date: new Date(2023, 5, 24), duration: "5", notes: "Connected user authentication" }
  ]);
  
  const handleAddTimeEntry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Time entry added!");
    // In a real app, would add the entry to the list
  };
  
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reminder set!");
    // In a real app, would add the reminder to the list
  };
  
  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Meeting scheduled!");
    // In a real app, would add the meeting to the list
  };
  
  return (
    <AppLayout>
      <Tabs defaultValue="time-entries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="time-entries">Time Entries</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="time-entries" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Time Tracking</h1>
              <p className="text-gray-600">Track time spent on tasks and projects</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Time Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Time Entry</DialogTitle>
                  <DialogDescription>
                    Record time spent on a task or project
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddTimeEntry} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Input id="project" placeholder="Project name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="task">Task</Label>
                    <Input id="task" placeholder="Specific task" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input id="duration" type="number" step="0.25" min="0.25" placeholder="Hours" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Optional notes about the work" />
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Save Entry</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timeEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{entry.project}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Task:</span>
                      <span className="text-sm">{entry.task}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date:</span>
                      <span className="text-sm">{format(entry.date, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Time:</span>
                      <span className="text-sm">{entry.duration} hours</span>
                    </div>
                    {entry.notes && (
                      <div className="pt-2">
                        <span className="text-sm font-medium">Notes:</span>
                        <p className="text-sm mt-1">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reminders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Reminders</h1>
              <p className="text-gray-600">Set reminders for important tasks</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Bell className="mr-2 h-4 w-4" /> Set Reminder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set a Reminder</DialogTitle>
                  <DialogDescription>
                    Create a reminder for an important task or deadline
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddReminder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Reminder title" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !reminderDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {reminderDate ? format(reminderDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={reminderDate}
                          onSelect={setReminderDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hour">Hour</Label>
                      <Input id="hour" type="number" min="0" max="23" placeholder="HH" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minute">Minute</Label>
                      <Input id="minute" type="number" min="0" max="59" placeholder="MM" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Additional details" />
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Set Reminder</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{reminder.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{format(reminder.date, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{format(reminder.date, "h:mm a")}</span>
                    </div>
                    {reminder.description && (
                      <p className="text-sm mt-2">{reminder.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="meetings" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Meetings</h1>
              <p className="text-gray-600">Schedule and manage meetings</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Users className="mr-2 h-4 w-4" /> Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a Meeting</DialogTitle>
                  <DialogDescription>
                    Plan a meeting with team members or clients
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddMeeting} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meetingTitle">Title</Label>
                    <Input id="meetingTitle" placeholder="Meeting title" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meetingHour">Hour</Label>
                      <Input id="meetingHour" type="number" min="0" max="23" placeholder="HH" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meetingMinute">Minute</Label>
                      <Input id="meetingMinute" type="number" min="0" max="59" placeholder="MM" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attendees">Attendees</Label>
                    <Input id="attendees" placeholder="Who will attend" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Meeting location or link" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meetingNotes">Notes</Label>
                    <Textarea id="meetingNotes" placeholder="Agenda or additional information" />
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Schedule Meeting</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{meeting.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{format(meeting.date, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{format(meeting.date, "h:mm a")}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-sm font-medium">Attendees:</span>
                      <span className="text-sm">{meeting.attendees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Location:</span>
                      <span className="text-sm">{meeting.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default TimeTracking;
