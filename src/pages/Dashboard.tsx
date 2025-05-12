import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { academicServices, UnidadAcademica, Carrera, Materia } from "../services/academicServices";;
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil } from "lucide-react";

export default function AcademicManager() {
  const { toast } = useToast();

  const [unidades, setUnidades] = useState<UnidadAcademica[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);

  const [selectedUnidad, setSelectedUnidad] = useState<number | null>(null);
  const [selectedCarrera, setSelectedCarrera] = useState<number | null>(null);

  const [dialogCarreraOpen, setDialogCarreraOpen] = useState(false);
  const [dialogMateriaOpen, setDialogMateriaOpen] = useState(false);

  const [formCarrera, setFormCarrera] = useState({ id: null, nombre_carrera: "" });
  const [formMateria, setFormMateria] = useState({ id: null, nombre: "", codigo: "" });

  useEffect(() => {
    academicServices.getUnidadesAcademicas().then(setUnidades);
    academicServices.getCarreras().then(setCarreras);
    academicServices.getMaterias().then(setMaterias);
  }, []);

  const handleUnidadChange = (id: number) => {
    setSelectedUnidad(id);
    setSelectedCarrera(null); // Resetear la carrera seleccionada
  };

  const handleCarreraChange = (id: number) => {
    setSelectedCarrera(id);
    // Ya no filtramos las materias aquí
  };

  const handleSaveCarrera = async () => {
    try {
      if (formCarrera.id) {
        await academicServices.updateCarrera(formCarrera.id, formCarrera.nombre_carrera, selectedUnidad!);
        toast({ title: "Carrera actualizada" });
      } else {
        await academicServices.createCarrera(formCarrera.nombre_carrera, selectedUnidad!);
        toast({ title: "Carrera creada" });
      }
      setFormCarrera({ id: null, nombre_carrera: "" });
      academicServices.getCarreras().then(setCarreras);
      setDialogCarreraOpen(false);
    } catch {
      toast({ title: "Error al guardar carrera", variant: "destructive" });
    }
  };

  const handleDeleteCarrera = async (id: number) => {
    await academicServices.deleteCarrera(id);
    toast({ title: "Carrera eliminada" });
    academicServices.getCarreras().then(setCarreras);
  };

  const handleOpenEditMateriaDialog = (materia: Materia) => {
    setFormMateria({ id: materia.id, nombre: materia.nombre_materia, codigo: materia.codigo_materia });
    setDialogMateriaOpen(true);
  };

  const handleSaveMateria = async () => {
    try {
      if (formMateria.id) {
        await academicServices.updateMateria(formMateria.id, formMateria.nombre, formMateria.codigo);
        toast({ title: "Materia actualizada" });
      } else {
        await academicServices.createMateria(formMateria.nombre, formMateria.codigo);
        toast({ title: "Materia creada" });
      }
      setFormMateria({ id: null, nombre: "", codigo: "" });
      academicServices.getMaterias().then(setMaterias);
      setDialogMateriaOpen(false);
    } catch (error) {
      console.error("Error al guardar materia:", error);
      toast({ title: "Error al guardar materia", variant: "destructive" });
    }
  };

  const handleDeleteMateria = async (id: number) => {
    await academicServices.deleteMateria(id);
    toast({ title: "Materia eliminada" });
    academicServices.getMaterias().then(setMaterias);
  };

  const carrerasFiltradas = carreras.filter(c => c.unidad === selectedUnidad);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión Académica</h2>

      <Select onValueChange={(v) => handleUnidadChange(Number(v))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione una Unidad Académica" />
        </SelectTrigger>
        <SelectContent>
          {unidades.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.nombre}</SelectItem>)}
        </SelectContent>
      </Select>

      {selectedUnidad && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Carreras</h3>
            <Button onClick={() => setDialogCarreraOpen(true)}>+ Nueva Carrera</Button>
          </div>
          {carrerasFiltradas.map(c => (
            <Card key={c.id} onClick={() => handleCarreraChange(c.id)} className="cursor-pointer">
              <CardHeader className="flex justify-between">
                <CardTitle>{c.nombre_carrera}</CardTitle>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); setFormCarrera({ id: c.id, nombre_carrera: c.nombre_carrera }); setDialogCarreraOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteCarrera(c.id); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
            </Card>
          ))}

          {/* Sección de Materias - Siempre visible cuando una unidad está seleccionada */}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">Materias</h3>
            <Button onClick={() => setDialogMateriaOpen(true)}>+ Nueva Materia</Button>
          </div>
          {materias.map(m => (
            <Card key={m.id} className="mb-2">
              <CardHeader className="flex justify-between">
                <CardTitle>{m.nombre_materia} ({m.codigo_materia})</CardTitle>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleOpenEditMateriaDialog(m)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteMateria(m.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </>
      )}

      {/* Dialogo de Carrera */}
      <Dialog open={dialogCarreraOpen} onOpenChange={setDialogCarreraOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formCarrera.id ? "Editar Carrera" : "Nueva Carrera"}</DialogTitle>
            <DialogDescription>Complete el nombre de la carrera</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Nombre de la carrera"
            value={formCarrera.nombre_carrera}
            onChange={(e) => setFormCarrera({ ...formCarrera, nombre_carrera: e.target.value })}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogCarreraOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveCarrera}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo de Materia */}
      <Dialog open={dialogMateriaOpen} onOpenChange={setDialogMateriaOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMateria.id ? "Editar Materia" : "Nueva Materia"}</DialogTitle>
          <DialogDescription>Ingrese los datos de la materia</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Nombre"
            value={formMateria.nombre}
            onChange={(e) => setFormMateria({ ...formMateria, nombre: e.target.value })}
          />
          <Input
            placeholder="Código"
            value={formMateria.codigo}
            onChange={(e) => setFormMateria({ ...formMateria, codigo: e.target.value })}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogMateriaOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveMateria}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}