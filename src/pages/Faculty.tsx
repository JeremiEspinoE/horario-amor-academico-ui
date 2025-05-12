import React, { useEffect, useState } from "react";
import { docenteService, DocenteRequest, Docente } from "@/services/docenteService";
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
  X,
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

// Define la estructura de la respuesta de la API (opcional, pero ayuda con la claridad)
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Docente[];
}

export default function Faculty() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | "all">("all");

  const [newDocente, setNewDocente] = useState<Omit<DocenteRequest, "id">>({
    nombre: "",
    apellido: "",
    especialidades: [],
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse = await docenteService.getAll();
      if (response && Array.isArray(response.results)) {
        setDocentes(response.results);
      } else {
        console.error("Error: La API no devolvió un array de docentes en 'results'", response);
        toast({
          title: "Error al cargar docentes",
          description: "La respuesta de la API tiene un formato incorrecto.",
          variant: "destructive",
        });
        setDocentes([]);
      }
    } catch (error) {
      console.error("Error al cargar docentes:", error);
      toast({
        title: "Error al cargar docentes",
        variant: "destructive",
      });
      setDocentes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDocente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDocente = async () => {
    if (!newDocente.nombre || !newDocente.apellido) {
      toast({
        title: "Información Faltante",
        description: "Por favor proporcione nombre y apellido",
        variant: "destructive",
      });
      return;
    }

    try {
      await docenteService.create(newDocente);
      fetchDocentes();
      setIsAddDialogOpen(false);
      setNewDocente({ nombre: "", apellido: "", especialidades: [] });
      toast({ title: "Docente añadido correctamente" });
    } catch (error) {
      console.error("Error al crear docente:", error);
      toast({
        title: "Error al crear docente",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDocente = async (id: number) => {
    try {
      await docenteService.delete(id);
      setDocentes((prev) => prev.filter((d) => d.id !== id));
      toast({ title: "Docente eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar docente:", error);
      toast({
        title: "Error al eliminar docente",
        variant: "destructive",
      });
    }
  };

  const filteredDocentes = docentes.filter((d) => {
    const searchMatch =
      d.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.apellido?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.especialidades?.join(", ").toLowerCase().includes(searchQuery.toLowerCase());
    const departmentMatch =
      departmentFilter === "all" || d.departamento?.toLowerCase() === departmentFilter.toLowerCase();
    return searchMatch && departmentMatch;
  });

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
              <DialogDescription>Ingrese los detalles del nuevo docente.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={newDocente.nombre}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apellido" className="text-right">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={newDocente.apellido}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="especialidades" className="text-right">
                  Especialidades (coma separadas)
                </Label>
                <Input
                  id="especialidades"
                  name="especialidades"
                  value={newDocente.especialidades.join(", ")}
                  onChange={(e) =>
                    setNewDocente({
                      ...newDocente,
                      especialidades: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddDocente} disabled={isLoading}>
                {isLoading ? "Guardando..." : "Añadir Docente"}
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
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Departamentos</SelectItem>
            {Array.from(new Set(docentes.map((d) => d.departamento))).map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Especialidades</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  Cargando docentes...
                </TableCell>
              </TableRow>
            ) : filteredDocentes.length > 0 ? (
              filteredDocentes.map((docente) => (
                <TableRow key={docente.id}>
                  <TableCell className="font-medium">{docente.nombre}</TableCell>
                  <TableCell>{docente.apellido}</TableCell>
                  <TableCell>{docente.especialidades?.join(", ") || ""}</TableCell>
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
                          onClick={() => handleDeleteDocente(docente.id)}
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
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
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