
import { useState } from "react";
import {
  Check,
  LogOut,
  Save,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("academic-periods");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
      action: (
        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      ),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="academic-periods">Academic Periods</TabsTrigger>
          <TabsTrigger value="room-types">Room Types</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic-periods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Periods</CardTitle>
              <CardDescription>
                Manage academic terms and scheduling periods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Current Period</h3>
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-period-name">Period Name</Label>
                    <Input
                      id="current-period-name"
                      placeholder="Period name"
                      defaultValue="2025 Spring"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="current-period-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-start">Start Date</Label>
                    <Input
                      id="current-period-start"
                      type="date"
                      defaultValue="2025-01-15"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-end">End Date</Label>
                    <Input
                      id="current-period-end"
                      type="date"
                      defaultValue="2025-05-15"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Upcoming Periods</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4">
                    <div>
                      <Label className="mb-1 block">Period Name</Label>
                      <Input defaultValue="2025 Fall" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-1 block">Start Date</Label>
                        <Input type="date" defaultValue="2025-09-01" />
                      </div>
                      <div>
                        <Label className="mb-1 block">End Date</Label>
                        <Input type="date" defaultValue="2025-12-15" />
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <Button className="w-full" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4">
                    <div>
                      <Label className="mb-1 block">Period Name</Label>
                      <Input defaultValue="2026 Spring" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-1 block">Start Date</Label>
                        <Input type="date" defaultValue="2026-01-15" />
                      </div>
                      <div>
                        <Label className="mb-1 block">End Date</Label>
                        <Input type="date" defaultValue="2026-05-15" />
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <Button className="w-full" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Add New Period
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="room-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Types & Facilities</CardTitle>
              <CardDescription>
                Configure room types and their capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 border-b">Room Type</th>
                      <th className="text-left p-3 border-b">Capacity</th>
                      <th className="text-left p-3 border-b">Facilities</th>
                      <th className="text-left p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Lecture Hall" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="120" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Projector, Audio System, Computer" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Laboratory" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="30" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Computers, Specialized Equipment" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Classroom" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="40" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Whiteboard, Projector" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <Input placeholder="Add new type..." />
                      </td>
                      <td className="p-3">
                        <Input type="number" placeholder="Capacity" />
                      </td>
                      <td className="p-3">
                        <Input placeholder="Facilities (comma separated)" />
                      </td>
                      <td className="p-3">
                        <Button size="sm">Add</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institution-name">Institution Name</Label>
                  <Input
                    id="institution-name"
                    placeholder="Institution name"
                    defaultValue="Academic University"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-slots">Default Time Slot Duration (minutes)</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="schedule-slots">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-start">Default Schedule Start Time</Label>
                  <Select defaultValue="8">
                    <SelectTrigger id="schedule-start">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7:00 AM</SelectItem>
                      <SelectItem value="8">8:00 AM</SelectItem>
                      <SelectItem value="9">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-end">Default Schedule End Time</Label>
                  <Select defaultValue="21">
                    <SelectTrigger id="schedule-end">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="17">5:00 PM</SelectItem>
                      <SelectItem value="18">6:00 PM</SelectItem>
                      <SelectItem value="19">7:00 PM</SelectItem>
                      <SelectItem value="20">8:00 PM</SelectItem>
                      <SelectItem value="21">9:00 PM</SelectItem>
                      <SelectItem value="22">10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="week-days">Working Days</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="bg-primary/20">Monday</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Tuesday</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Wednesday</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Thursday</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Friday</Button>
                    <Button size="sm" variant="outline">Saturday</Button>
                    <Button size="sm" variant="outline">Sunday</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Admin User</h3>
                    <p className="text-sm text-muted-foreground">admin@school.edu</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Change Photo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      placeholder="Your name"
                      defaultValue="Admin User"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      defaultValue="admin@school.edu"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Password</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Current password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="New password"
                    />
                  </div>
                </div>
                
                <Button size="sm">Change Password</Button>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Interface Preferences</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign Out Confirmation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out of the system?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
