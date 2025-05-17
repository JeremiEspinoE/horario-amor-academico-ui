
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PeriodoAcademico {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  activo: boolean;
}

export default function PeriodoAcademico() {
  const [periodos, setPeriodos] = useState<PeriodoAcademico[]>([]);
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar fecha
    if (fechaFin < fechaInicio) {
      alert("La fecha de fin debe ser posterior a la fecha de inicio");
      return;
    }
    
    // Crear nuevo periodo
    const nuevoPeriodo = {
      id: periodos.length + 1,
      nombre,
      fechaInicio,
      fechaFin,
      activo: false
    };
    
    // Agregar a la lista
    setPeriodos([...periodos, nuevoPeriodo]);
    
    // Limpiar formulario
    setNombre("");
    setFechaInicio(new Date());
    setFechaFin(new Date());
    
    // Cerrar dialog
    setIsDialogOpen(false);
  };

  function handleDelete(id: number) {
    setPeriodos(periodos.filter(periodo => periodo.id !== id));
  }

  function toggleActivo(id: number) {
    setPeriodos(periodos.map(periodo => {
      if (periodo.id === id) {
        return { ...periodo, activo: !periodo.activo };
      }
      return periodo;
    }));
  }

  useEffect(() => {
    // Datos de ejemplo
    const ejemplos: PeriodoAcademico[] = [
      {
        id: 1,
        nombre: "2023-1",
        fechaInicio: new Date("2023-01-15"),
        fechaFin: new Date("2023-06-30"),
        activo: true
      },
      {
        id: 2,
        nombre: "2023-2",
        fechaInicio: new Date("2023-07-15"),
        fechaFin: new Date("2023-12-15"),
        activo: false
      }
    ];
    
    setPeriodos(ejemplos);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Periodos Académicos</h1>
          <p className="text-muted-foreground">
            Administre los periodos académicos de la institución
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 md:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Periodo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Nuevo Periodo Académico</DialogTitle>
                <DialogDescription>
                  Complete la información del nuevo periodo académico
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="col-span-3"
                    placeholder="2023-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Fechas</Label>
                  <div className="col-span-3">
                    <DatePickerWithRange 
                      from={fechaInicio} 
                      to={fechaFin}
                      onFromChange={setFechaInicio}
                      onToChange={setFechaFin}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="cards">Tarjetas</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de periodos académicos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Fecha Fin</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {periodos.map((periodo) => (
                  <TableRow key={periodo.id}>
                    <TableCell>{periodo.id}</TableCell>
                    <TableCell>{periodo.nombre}</TableCell>
                    <TableCell>{periodo.fechaInicio.toLocaleDateString()}</TableCell>
                    <TableCell>{periodo.fechaFin.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={periodo.activo} 
                          onCheckedChange={() => toggleActivo(periodo.id)} 
                        />
                        <span>{periodo.activo ? "Activo" : "Inactivo"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(periodo.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {periodos.map((periodo) => (
              <Card key={periodo.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {periodo.nombre}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(periodo.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {periodo.activo ? "Periodo activo" : "Periodo inactivo"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Inicio: {periodo.fechaInicio.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Fin: {periodo.fechaFin.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={periodo.activo} 
                      onCheckedChange={() => toggleActivo(periodo.id)} 
                    />
                    <span>{periodo.activo ? "Activo" : "Inactivo"}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
