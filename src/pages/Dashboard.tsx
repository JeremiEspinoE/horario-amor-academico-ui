
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Layers,
  LayoutGrid,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const stats = [
    { title: "Docentes", value: 45, icon: Users, color: "bg-faculty-600" },
    { title: "Asignaturas", value: 128, icon: BookOpen, color: "bg-course-600" },
    { title: "Aulas", value: 32, icon: LayoutGrid, color: "bg-room-600" },
    { title: "Horarios Activos", value: 8, icon: Calendar, color: "bg-schedule-600" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel Principal</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Periodo Académico</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Seleccionar Periodo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-medium">Primavera 2025</DropdownMenuItem>
            <DropdownMenuItem>Otoño 2024</DropdownMenuItem>
            <DropdownMenuItem>Verano 2024</DropdownMenuItem>
            <DropdownMenuItem>Primavera 2024</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="dashboard-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} rounded-lg p-2`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card lg:col-span-2">
          <div className="card-header">
            <BarChart3 className="h-5 w-5" />
            <span>Utilización de Aulas</span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Edificio de Ciencias</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Artes Liberales</span>
                <span>64%</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Centro de Ingeniería</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Facultad de Negocios</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <Clock className="h-5 w-5" />
            <span>Estado del Horario</span>
          </div>
          <div className="space-y-4 flex-1">
            <div className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900 rounded-md p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Horario Primavera 2025</p>
                <p className="text-sm mt-1">Publicado y listo</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900 rounded-md p-3 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Horario Otoño 2025</p>
                <p className="text-sm mt-1">10 conflictos por resolver</p>
              </div>
            </div>
            
            <div className="mt-auto text-center">
              <Button asChild className="w-full">
                <Link to="/schedule">Ver Horario</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <div className="card-header">
            <Users className="h-5 w-5" />
            <span>Estado de Docentes</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Carga Completa</span>
              <span className="font-medium">28 docentes</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Carga Parcial</span>
              <span className="font-medium">12 docentes</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>De Permiso</span>
              <span className="font-medium">5 docentes</span>
            </div>
            <div className="mt-auto text-center pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/faculty">Gestionar Docentes</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <Layers className="h-5 w-5" />
            <span>Distribución de Asignaturas</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Ciencias de la Computación</span>
              <span className="font-medium">32 asignaturas</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Administración de Empresas</span>
              <span className="font-medium">28 asignaturas</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Artes Liberales</span>
              <span className="font-medium">45 asignaturas</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Ingeniería</span>
              <span className="font-medium">23 asignaturas</span>
            </div>
            <div className="mt-auto text-center pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/courses">Gestionar Asignaturas</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
