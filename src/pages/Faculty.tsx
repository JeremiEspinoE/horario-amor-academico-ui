
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
      department: "Ciencias de la Computación", 
      phone: "(555) 123-4567", 
      status: "active",
      maxHours: 18 
    },
    { 
      id: "2", 
      name: "Prof. Michael Johnson", 
      email: "michael.johnson@school.edu", 
      department: "Negocios", 
      phone: "(555) 234-5678", 
      status: "active",
      maxHours: 15 
    },
    { 
      id: "3", 
      name: "Dr. Sarah Williams", 
      email: "sarah.williams@school.edu", 
      department: "Matemáticas", 
      phone: "(555) 345-6789", 
      status: "active",
      maxHours: 18 
    },
    { 
      id: "4", 
      name: "Prof. Robert Brown", 
      email: "robert.brown@school.edu", 
      department: "Ingeniería", 
      phone: "(555) 456-7890", 
      status: "on-leave",
      maxHours: 0 
    },
    { 
      id: "5", 
      name: "Dr. Emily Davis", 
      email: "emily.davis@school.edu", 
      department: "Inglés", 
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
    department: "Ciencias de la Computación",
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
        title: "Información Faltante",
        description: "Por favor proporcione nombre y correo electrónico",
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
      department: "Ciencias de la Computación",
      phone: "",
      status: "active",
      maxHours: 18
    });
    
    toast({
      title: "Éxito",
      description: "Docente añadido correctamente"
    });
  };
  
  const handleDeleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Docente Eliminado",
      description: "El docente ha sido eliminado",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Docentes</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Docente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Docente</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo docente.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
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
                  Correo
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
                  Departamento
                </Label>
                <Select 
                  value={newFaculty.department} 
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departamentos</SelectLabel>
                      <SelectItem value="Ciencias de la Computación">Ciencias de la Computación</SelectItem>
                      <SelectItem value="Negocios">Negocios</SelectItem>
                      <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                      <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                      <SelectItem value="Inglés">Inglés</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Teléfono
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
                  Estado
                </Label>
                <Select 
                  value={newFaculty.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="on-leave">De Permiso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newFaculty.status === "active" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxHours" className="text-right">
                    Horas Máx.
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
                Cancelar
              </Button>
              <Button onClick={handleAddFaculty}>
                Añadir Docente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar docentes..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Departamentos</SelectItem>
            <SelectItem value="computer-science">Ciencias de la Computación</SelectItem>
            <SelectItem value="business">Negocios</SelectItem>
            <SelectItem value="mathematics">Matemáticas</SelectItem>
            <SelectItem value="engineering">Ingeniería</SelectItem>
            <SelectItem value="english">Inglés</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead className="hidden md:table-cell">Correo</TableHead>
              <TableHead className="hidden md:table-cell">Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Horas Máx.</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
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
                          <span>Activo</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-2 bg-amber-500 rounded-full mr-2" />
                          <span>De Permiso</span>
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
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Edit2 className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Ver Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <MailIcon className="mr-2 h-4 w-4" />
                          <span>Enviar Correo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center text-destructive focus:text-destructive"
                          onClick={() => handleDeleteFaculty(f.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No se encontraron docentes que coincidan con su criterio de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
