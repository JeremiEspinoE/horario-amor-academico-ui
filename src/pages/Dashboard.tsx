
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
    { title: "Faculty Members", value: 45, icon: Users, color: "bg-faculty-600" },
    { title: "Courses", value: 128, icon: BookOpen, color: "bg-course-600" },
    { title: "Classrooms", value: 32, icon: LayoutGrid, color: "bg-room-600" },
    { title: "Active Schedules", value: 8, icon: Calendar, color: "bg-schedule-600" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Academic Period</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-medium">2025 Spring</DropdownMenuItem>
            <DropdownMenuItem>2024 Fall</DropdownMenuItem>
            <DropdownMenuItem>2024 Summer</DropdownMenuItem>
            <DropdownMenuItem>2024 Spring</DropdownMenuItem>
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
            <span>Room Utilization</span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Science Building</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Liberal Arts</span>
                <span>64%</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engineering Center</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Business School</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <Clock className="h-5 w-5" />
            <span>Schedule Status</span>
          </div>
          <div className="space-y-4 flex-1">
            <div className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900 rounded-md p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">2025 Spring Schedule</p>
                <p className="text-sm mt-1">Published and ready</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900 rounded-md p-3 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">2025 Fall Schedule</p>
                <p className="text-sm mt-1">10 conflicts need resolution</p>
              </div>
            </div>
            
            <div className="mt-auto text-center">
              <Button asChild className="w-full">
                <Link to="/schedule">View Schedule</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <div className="card-header">
            <Users className="h-5 w-5" />
            <span>Faculty Status</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Full Course Load</span>
              <span className="font-medium">28 faculty</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Partial Load</span>
              <span className="font-medium">12 faculty</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>On Leave</span>
              <span className="font-medium">5 faculty</span>
            </div>
            <div className="mt-auto text-center pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/faculty">Manage Faculty</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="dashboard-card">
          <div className="card-header">
            <Layers className="h-5 w-5" />
            <span>Course Distribution</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Computer Science</span>
              <span className="font-medium">32 courses</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Business Administration</span>
              <span className="font-medium">28 courses</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Liberal Arts</span>
              <span className="font-medium">45 courses</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Engineering</span>
              <span className="font-medium">23 courses</span>
            </div>
            <div className="mt-auto text-center pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/courses">Manage Courses</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
