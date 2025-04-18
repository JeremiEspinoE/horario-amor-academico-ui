
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Course = {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  semester: number;
  program: string;
};

type Program = {
  id: string;
  name: string;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Introducción a la Programación",
      department: "Ciencias de la Computación",
      credits: 3,
      semester: 1,
      program: "Ciencias de la Computación",
    },
    {
      id: "2",
      code: "CS201",
      name: "Estructuras de Datos",
      department: "Ciencias de la Computación",
      credits: 4,
      semester: 2,
      program: "Ciencias de la Computación",
    },
    {
      id: "3",
      code: "BUS101",
      name: "Introducción a los Negocios",
      department: "Negocios",
      credits: 3,
      semester: 1,
      program: "Administración de Empresas",
    },
    {
      id: "4",
      code: "MATH201",
      name: "Cálculo I",
      department: "Matemáticas",
      credits: 4,
      semester: 1,
      program: "Matemáticas",
    },
    {
      id: "5",
      code: "MATH202",
      name: "Cálculo II",
      department: "Matemáticas",
      credits: 4,
      semester: 2,
      program: "Matemáticas",
    },
    {
      id: "6",
      code: "CS301",
      name: "Algoritmos",
      department: "Ciencias de la Computación",
      credits: 4,
      semester: 3,
      program: "Ciencias de la Computación",
    },
    {
      id: "7",
      code: "CS401",
      name: "Sistemas Operativos",
      department: "Ciencias de la Computación",
      credits: 3,
      semester: 4,
      program: "Ciencias de la Computación",
    },
    {
      id: "8",
      code: "BUS201",
      name: "Fundamentos de Marketing",
      department: "Negocios",
      credits: 3,
      semester: 2,
      program: "Administración de Empresas",
    },
  ]);

  const [programs, setPrograms] = useState<Program[]>([
    { id: "1", name: "Ciencias de la Computación" },
    { id: "2", name: "Administración de Empresas" },
    { id: "3", name: "Matemáticas" },
  ]);

  const [selectedView, setSelectedView] = useState<"list" | "program">("program");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    code: "",
    name: "",
    department: "Ciencias de la Computación",
    credits: 3,
    semester: 1,
    program: "Ciencias de la Computación",
  });

  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState("");

  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group courses by program and semester
  const coursesByProgram = filteredCourses.reduce((acc, course) => {
    if (!acc[course.program]) {
      acc[course.program] = {};
    }
    if (!acc[course.program][course.semester]) {
      acc[course.program][course.semester] = [];
    }
    acc[course.program][course.semester].push(course);
    return acc;
  }, {} as Record<string, Record<number, Course[]>>);

  const handleCourseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: name === "credits" || name === "semester" ? Number(value) : value,
    }));
  };

  const handleDepartmentChange = (value: string) => {
    setNewCourse((prev) => ({
      ...prev,
      department: value,
    }));
  };

  const handleProgramChange = (value: string) => {
    setNewCourse((prev) => ({
      ...prev,
      program: value,
    }));
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) {
      toast({
        title: "Información Faltante",
        description: "Por favor proporcione código y nombre de la asignatura",
        variant: "destructive",
      });
      return;
    }

    const newId = (Math.max(...courses.map((c) => Number(c.id))) + 1).toString();

    setCourses((prev) => [...prev, { id: newId, ...newCourse }]);
    setIsAddCourseDialogOpen(false);
    setNewCourse({
      code: "",
      name: "",
      department: "Ciencias de la Computación",
      credits: 3,
      semester: 1,
      program: "Ciencias de la Computación",
    });

    toast({
      title: "Éxito",
      description: "Asignatura añadida correctamente",
    });
  };

  const handleAddProgram = () => {
    if (!newProgram) {
      toast({
        title: "Información Faltante",
        description: "Por favor proporcione el nombre del programa",
        variant: "destructive",
      });
      return;
    }

    const newId = (Math.max(...programs.map((p) => Number(p.id))) + 1).toString();
    setPrograms((prev) => [...prev, { id: newId, name: newProgram }]);
    setIsAddProgramDialogOpen(false);
    setNewProgram("");

    toast({
      title: "Éxito",
      description: "Programa añadido correctamente",
    });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Asignatura Eliminada",
      description: "La asignatura ha sido eliminada",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Asignaturas y Programas</h1>
        <div className="flex gap-2">
          <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Programa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Programa</DialogTitle>
                <DialogDescription>Ingrese el nombre para el nuevo programa académico.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="program-name"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProgramDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProgram}>Añadir Programa</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCourseDialogOpen} onOpenChange={setIsAddCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Añadir Asignatura
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Añadir Nueva Asignatura</DialogTitle>
                <DialogDescription>Ingrese los detalles para la nueva asignatura.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Código
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={newCourse.code}
                    onChange={handleCourseInputChange}
                    className="col-span-3"
                    placeholder="ej. CS101"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCourse.name}
                    onChange={handleCourseInputChange}
                    className="col-span-3"
                    placeholder="ej. Introducción a la Programación"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Departamento
                  </Label>
                  <Select value={newCourse.department} onValueChange={handleDepartmentChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Ciencias de la Computación">Ciencias de la Computación</SelectItem>
                        <SelectItem value="Negocios">Negocios</SelectItem>
                        <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                        <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                        <SelectItem value="Inglés">Inglés</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program" className="text-right">
                    Programa
                  </Label>
                  <Select value={newCourse.program} onValueChange={handleProgramChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.name}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credits" className="text-right">
                    Créditos
                  </Label>
                  <Input
                    id="credits"
                    name="credits"
                    type="number"
                    value={newCourse.credits}
                    onChange={handleCourseInputChange}
                    className="col-span-3"
                    min={1}
                    max={6}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">
                    Semestre
                  </Label>
                  <Input
                    id="semester"
                    name="semester"
                    type="number"
                    value={newCourse.semester}
                    onChange={handleCourseInputChange}
                    className="col-span-3"
                    min={1}
                    max={8}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCourseDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCourse}>Añadir Asignatura</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar asignaturas..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all-departments">
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">Todos los Departamentos</SelectItem>
              <SelectItem value="computer-science">Ciencias de la Computación</SelectItem>
              <SelectItem value="business">Negocios</SelectItem>
              <SelectItem value="mathematics">Matemáticas</SelectItem>
              <SelectItem value="engineering">Ingeniería</SelectItem>
              <SelectItem value="english">Inglés</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button
              variant={selectedView === "program" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("program")}
              className="rounded-r-none"
            >
              Vista Programa
            </Button>
            <Button
              variant={selectedView === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("list")}
              className="rounded-l-none"
            >
              Vista Lista
            </Button>
          </div>
        </div>
      </div>

      {selectedView === "program" ? (
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(coursesByProgram).map(([program, semesters]) => (
            <Card key={program} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {program}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(semesters)
                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                    .map(([semester, semesterCourses]) => (
                      <AccordionItem key={`${program}-${semester}`} value={`${program}-${semester}`}>
                        <AccordionTrigger className="px-6 py-3 hover:bg-muted/30">
                          <div className="flex items-center">
                            <span className="font-semibold">
                              Semestre {semester} ({semesterCourses.length} asignaturas)
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-2">
                          <div className="space-y-2">
                            {semesterCourses.map((course) => (
                              <div
                                key={course.id}
                                className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/30"
                              >
                                <div className="flex items-center">
                                  <div className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded mr-3">
                                    {course.code}
                                  </div>
                                  <div>
                                    <div className="font-medium">{course.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {course.department} • {course.credits} créditos
                                    </div>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      className="flex items-center text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteCourse(course.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Eliminar</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4">Código</th>
                <th className="text-left py-3 px-4">Nombre</th>
                <th className="text-left py-3 px-4">Programa</th>
                <th className="text-left py-3 px-4">Semestre</th>
                <th className="text-left py-3 px-4">Créditos</th>
                <th className="text-right py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-medium">{course.code}</td>
                  <td className="py-3 px-4">{course.name}</td>
                  <td className="py-3 px-4">{course.program}</td>
                  <td className="py-3 px-4">{course.semester}</td>
                  <td className="py-3 px-4">{course.credits}</td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center text-destructive focus:text-destructive"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
