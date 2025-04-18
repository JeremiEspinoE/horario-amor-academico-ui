
import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  Filter,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type FacultyAvailability = {
  id: string;
  name: string;
  department: string;
  schedule: Record<string, boolean[]>;
};

export default function Availability() {
  const diasDeSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM
  
  const formatTimeSlot = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  };

  // Initial faculty data with availability
  const initialFacultyData: FacultyAvailability[] = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      department: "Ciencias de la Computación",
      schedule: {
        "Lunes": Array(14).fill(false).map((_, i) => [1, 2, 5, 6, 7].includes(i)),
        "Martes": Array(14).fill(false).map((_, i) => [3, 4, 8, 9].includes(i)),
        "Miércoles": Array(14).fill(false).map((_, i) => [1, 2, 5, 6, 7].includes(i)),
        "Jueves": Array(14).fill(false).map((_, i) => [3, 4, 8, 9].includes(i)),
        "Viernes": Array(14).fill(false).map((_, i) => [10, 11].includes(i)),
      }
    },
    {
      id: "2",
      name: "Prof. Michael Johnson",
      department: "Negocios",
      schedule: {
        "Lunes": Array(14).fill(false).map((_, i) => [3, 4, 5].includes(i)),
        "Martes": Array(14).fill(false).map((_, i) => [3, 4, 5, 10, 11].includes(i)),
        "Miércoles": Array(14).fill(false).map((_, i) => [3, 4, 5].includes(i)),
        "Jueves": Array(14).fill(false).map((_, i) => [3, 4, 5, 10, 11].includes(i)),
        "Viernes": Array(14).fill(false).map((_, i) => [8, 9].includes(i)),
      }
    },
    {
      id: "3",
      name: "Dr. Sarah Williams",
      department: "Matemáticas",
      schedule: {
        "Lunes": Array(14).fill(false).map((_, i) => [6, 7, 8].includes(i)),
        "Martes": Array(14).fill(false).map((_, i) => [1, 2, 3, 8, 9].includes(i)),
        "Miércoles": Array(14).fill(false).map((_, i) => [6, 7, 8].includes(i)),
        "Jueves": Array(14).fill(false).map((_, i) => [1, 2, 3, 8, 9].includes(i)),
        "Viernes": Array(14).fill(false).map((_, i) => [4, 5, 6].includes(i)),
      }
    }
  ];

  const [facultyData, setFacultyData] = useState<FacultyAvailability[]>(initialFacultyData);
  const [selectedFaculty, setSelectedFaculty] = useState<string>(initialFacultyData[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredFaculty = facultyData.filter(faculty =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentFaculty = facultyData.find(faculty => faculty.id === selectedFaculty);

  const toggleAvailability = (day: string, timeIndex: number) => {
    if (!currentFaculty) return;

    setFacultyData(prevData => {
      return prevData.map(faculty => {
        if (faculty.id === selectedFaculty) {
          const updatedSchedule = { ...faculty.schedule };
          updatedSchedule[day] = [...updatedSchedule[day]];
          updatedSchedule[day][timeIndex] = !updatedSchedule[day][timeIndex];
          
          return {
            ...faculty,
            schedule: updatedSchedule
          };
        }
        return faculty;
      });
    });
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Disponibilidad Guardada",
      description: `La disponibilidad de ${currentFaculty?.name} ha sido actualizada.`,
    });
  };

  const handleBulkToggle = (isAdding: boolean) => {
    if (!currentFaculty) return;
    
    setFacultyData(prevData => {
      return prevData.map(faculty => {
        if (faculty.id === selectedFaculty) {
          const updatedSchedule: Record<string, boolean[]> = {};
          
          Object.keys(faculty.schedule).forEach(day => {
            updatedSchedule[day] = Array(faculty.schedule[day].length).fill(isAdding);
          });
          
          return {
            ...faculty,
            schedule: updatedSchedule
          };
        }
        return faculty;
      });
    });
    
    toast({
      title: isAdding ? "Todos los Horarios Seleccionados" : "Todos los Horarios Desmarcados",
      description: `La disponibilidad de ${currentFaculty?.name} ha sido actualizada.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Disponibilidad de Docentes</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
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
          <SelectTrigger className="w-full md:w-[200px]">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lista de Docentes</CardTitle>
            <CardDescription>
              Seleccione un docente para gestionar su disponibilidad
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredFaculty.map((faculty) => (
                <Button
                  key={faculty.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4 py-2 h-auto text-left",
                    selectedFaculty === faculty.id && "bg-muted"
                  )}
                  onClick={() => setSelectedFaculty(faculty.id)}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-base font-medium">{faculty.name}</span>
                    <span className="text-xs text-muted-foreground">{faculty.department}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>{currentFaculty?.name}</CardTitle>
                <CardDescription>
                  {currentFaculty?.department} • Gestionar horario de disponibilidad
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkToggle(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Borrar Todo
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkToggle(true)}>
                  <Check className="h-4 w-4 mr-2" />
                  Seleccionar Todo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentFaculty ? (
              <div className="border rounded-md overflow-auto">
                <div className="grid grid-cols-[auto_repeat(5,1fr)]">
                  <div className="bg-muted/50 border-b border-r p-3 font-medium">
                    Hora
                  </div>
                  {diasDeSemana.map((day) => (
                    <div key={day} className="bg-muted/50 border-b last:border-r-0 border-r p-3 text-center font-medium">
                      {day}
                    </div>
                  ))}
                  
                  {timeSlots.map((hour, timeIndex) => (
                    <React.Fragment key={hour}>
                      <div className="border-b last:border-b-0 border-r bg-muted/25 p-3 whitespace-nowrap">
                        {formatTimeSlot(hour)}
                      </div>
                      
                      {diasDeSemana.map((day) => (
                        <div
                          key={`${day}-${hour}`}
                          className={cn(
                            "border-b last:border-b-0 border-r last:border-r-0 p-0",
                            "flex items-center justify-center cursor-pointer transition-colors",
                            currentFaculty.schedule[day][timeIndex] 
                              ? "bg-primary/20 hover:bg-primary/30" 
                              : "hover:bg-muted/30"
                          )}
                          onClick={() => toggleAvailability(day, timeIndex)}
                        >
                          <div className="availability-cell">
                            {currentFaculty.schedule[day][timeIndex] && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Seleccione un docente de la lista
              </div>
            )}
          </CardContent>
          {currentFaculty && (
            <div className="px-6 py-4 border-t">
              <Button onClick={handleSaveAvailability}>Guardar Disponibilidad</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
