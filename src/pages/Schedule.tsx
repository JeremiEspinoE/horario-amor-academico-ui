
import React, { useState } from "react";
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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

type Course = {
  code: string;
  name: string;
  room: string;
  faculty: string;
  colorClass: string;
  hasConflict?: boolean;
};

type TimeSlot = {
  courses: Course[];
};

type ScheduleType = Record<string, TimeSlot[]>;

export default function Schedule() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM

  const formatTimeSlot = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
  };

  // Sample schedule data with some conflicts
  const initialSchedule: ScheduleType = {
    Monday: Array.from({ length: 14 }, () => ({ courses: [] })),
    Tuesday: Array.from({ length: 14 }, () => ({ courses: [] })),
    Wednesday: Array.from({ length: 14 }, () => ({ courses: [] })),
    Thursday: Array.from({ length: 14 }, () => ({ courses: [] })),
    Friday: Array.from({ length: 14 }, () => ({ courses: [] })),
  };

  // Add some sample courses
  initialSchedule.Monday[1].courses.push({
    code: "CS101",
    name: "Intro to Programming",
    room: "SCI-101",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Monday[2].courses.push({
    code: "CS101",
    name: "Intro to Programming",
    room: "SCI-101",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Wednesday[1].courses.push({
    code: "CS101",
    name: "Intro to Programming",
    room: "SCI-101",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Wednesday[2].courses.push({
    code: "CS101",
    name: "Intro to Programming",
    room: "SCI-101",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Tuesday[3].courses.push({
    code: "MATH201",
    name: "Calculus I",
    room: "SCI-203",
    faculty: "Dr. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Tuesday[4].courses.push({
    code: "MATH201",
    name: "Calculus I",
    room: "SCI-203",
    faculty: "Dr. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Thursday[3].courses.push({
    code: "MATH201",
    name: "Calculus I",
    room: "SCI-203",
    faculty: "Dr. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Thursday[4].courses.push({
    code: "MATH201",
    name: "Calculus I",
    room: "SCI-203",
    faculty: "Dr. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Tuesday[6].courses.push({
    code: "BUS101",
    name: "Intro to Business",
    room: "BUS-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Tuesday[7].courses.push({
    code: "BUS101",
    name: "Intro to Business",
    room: "BUS-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Thursday[6].courses.push({
    code: "BUS101",
    name: "Intro to Business",
    room: "BUS-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Thursday[7].courses.push({
    code: "BUS101",
    name: "Intro to Business",
    room: "BUS-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  // Add a conflict
  initialSchedule.Monday[5].courses.push({
    code: "CS201",
    name: "Data Structures",
    room: "SCI-102",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Monday[5].courses.push({
    code: "PHYS101",
    name: "Physics I",
    room: "SCI-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  initialSchedule.Monday[6].courses.push({
    code: "CS201",
    name: "Data Structures",
    room: "SCI-102",
    faculty: "Dr. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Monday[6].courses.push({
    code: "PHYS101",
    name: "Physics I",
    room: "SCI-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  const [schedule, setSchedule] = useState<ScheduleType>(initialSchedule);
  const [currentPeriod, setCurrentPeriod] = useState("2025 Spring");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter schedule based on search query
  const filteredSchedule = () => {
    if (!searchQuery) return schedule;

    const filteredSch = JSON.parse(JSON.stringify(schedule)) as ScheduleType;

    for (const day in filteredSch) {
      for (let i = 0; i < filteredSch[day].length; i++) {
        filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
          (course) =>
            course.code.toLowerCase().includes(searchQuery) ||
            course.name.toLowerCase().includes(searchQuery) ||
            course.room.toLowerCase().includes(searchQuery) ||
            course.faculty.toLowerCase().includes(searchQuery)
        );
      }
    }

    return filteredSch;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 font-medium">{currentPeriod}</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Publish Schedule
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish Schedule</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to publish the {currentPeriod} schedule? This will make it
                  visible to all faculty and students.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Publish</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search schedule..." className="pl-10" onChange={handleSearch} />
        </div>
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Department</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="comp-sci" />
                    <label
                      htmlFor="comp-sci"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Computer Science
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business" />
                    <label
                      htmlFor="business"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Business
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="math" />
                    <label
                      htmlFor="math"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mathematics
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Display Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-conflicts" defaultChecked />
                    <label
                      htmlFor="show-conflicts"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Highlight conflicts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-empty" />
                    <label
                      htmlFor="show-empty"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Hide empty slots
                    </label>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="border rounded-md overflow-auto">
        <div className="grid grid-cols-[auto_repeat(5,1fr)] min-w-[800px]">
          <div className="bg-muted/50 border-b border-r p-3 font-medium">Time</div>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="bg-muted/50 border-b last:border-r-0 border-r p-3 text-center font-medium"
            >
              {day}
            </div>
          ))}

          {timeSlots.map((hour, timeIndex) => (
            <React.Fragment key={hour}>
              <div className="border-b last:border-b-0 border-r bg-muted/25 p-3 whitespace-nowrap">
                {formatTimeSlot(hour)}
              </div>

              {daysOfWeek.map((day) => {
                const slot = filteredSchedule()[day][timeIndex];
                const hasConflict = slot.courses.length > 1;

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={cn(
                      "border-b last:border-b-0 border-r last:border-r-0 p-2",
                      "schedule-cell",
                      hasConflict && "bg-destructive/10"
                    )}
                  >
                    {slot.courses.map((course, idx) => (
                      <div
                        key={`${course.code}-${idx}`}
                        className={cn(
                          "schedule-item",
                          course.colorClass,
                          course.hasConflict && "border-2 border-destructive"
                        )}
                      >
                        <div className="font-semibold">{course.code}</div>
                        <div className="text-[10px] md:text-xs truncate">{course.name}</div>
                        <div className="text-[10px] md:text-xs opacity-90">
                          {course.room} • {course.faculty}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-academic-600"></div>
          <span className="text-sm">Computer Science</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-faculty-600"></div>
          <span className="text-sm">Mathematics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-course-600"></div>
          <span className="text-sm">Business</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-room-600"></div>
          <span className="text-sm">Physics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-destructive"></div>
          <span className="text-sm">Conflicts</span>
        </div>
      </div>
    </div>
  );
}
