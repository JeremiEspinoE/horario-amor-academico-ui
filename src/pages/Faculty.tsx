
import { useState } from "react";
import { 
  Check, 
  Edit2, 
  Filter, 
  MailIcon,
  MoreHorizontal, 
  PhoneIcon, 
  Plus, 
  Search, 
  Trash2, 
  User,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Faculty = {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string;
  status: "active" | "on-leave";
  maxHours: number;
};

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([
    { 
      id: "1", 
      name: "Dr. Jane Smith", 
      email: "jane.smith@school.edu", 
      department: "Computer Science", 
      phone: "(555) 123-4567", 
      status: "active",
      maxHours: 18 
    },
    { 
      id: "2", 
      name: "Prof. Michael Johnson", 
      email: "michael.johnson@school.edu", 
      department: "Business", 
      phone: "(555) 234-5678", 
      status: "active",
      maxHours: 15 
    },
    { 
      id: "3", 
      name: "Dr. Sarah Williams", 
      email: "sarah.williams@school.edu", 
      department: "Mathematics", 
      phone: "(555) 345-6789", 
      status: "active",
      maxHours: 18 
    },
    { 
      id: "4", 
      name: "Prof. Robert Brown", 
      email: "robert.brown@school.edu", 
      department: "Engineering", 
      phone: "(555) 456-7890", 
      status: "on-leave",
      maxHours: 0 
    },
    { 
      id: "5", 
      name: "Dr. Emily Davis", 
      email: "emily.davis@school.edu", 
      department: "English", 
      phone: "(555) 567-8901", 
      status: "active",
      maxHours: 12 
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState<Omit<Faculty, "id">>({
    name: "",
    email: "",
    department: "Computer Science",
    phone: "",
    status: "active",
    maxHours: 18
  });
  
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFaculty(prev => ({
      ...prev,
      [name]: name === "maxHours" ? Number(value) : value
    }));
  };
  
  const handleStatusChange = (value: string) => {
    setNewFaculty(prev => ({
      ...prev,
      status: value as "active" | "on-leave",
      maxHours: value === "on-leave" ? 0 : prev.maxHours
    }));
  };
  
  const handleDepartmentChange = (value: string) => {
    setNewFaculty(prev => ({
      ...prev,
      department: value
    }));
  };
  
  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.email) {
      toast({
        title: "Missing Information",
        description: "Please provide name and email",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (Math.max(...faculty.map(f => Number(f.id))) + 1).toString();
    
    setFaculty(prev => [...prev, { id: newId, ...newFaculty }]);
    setIsAddDialogOpen(false);
    setNewFaculty({
      name: "",
      email: "",
      department: "Computer Science",
      phone: "",
      status: "active",
      maxHours: 18
    });
    
    toast({
      title: "Success",
      description: "Faculty member added successfully"
    });
  };
  
  const handleDeleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Faculty Removed",
      description: "Faculty member has been removed",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Faculty Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
              <DialogDescription>
                Enter the details for the new faculty member.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newFaculty.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newFaculty.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select 
                  value={newFaculty.department} 
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newFaculty.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={newFaculty.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newFaculty.status === "active" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxHours" className="text-right">
                    Max Hours
                  </Label>
                  <Input
                    id="maxHours"
                    name="maxHours"
                    type="number"
                    value={newFaculty.maxHours}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>
                Add Faculty
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="computer-science">Computer Science</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Max Hours</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell>{f.department}</TableCell>
                  <TableCell className="hidden md:table-cell">{f.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{f.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {f.status === "active" ? (
                        <>
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-2 bg-amber-500 rounded-full mr-2" />
                          <span>On Leave</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{f.maxHours}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Edit2 className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <MailIcon className="mr-2 h-4 w-4" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center text-destructive focus:text-destructive"
                          onClick={() => handleDeleteFaculty(f.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No faculty found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
