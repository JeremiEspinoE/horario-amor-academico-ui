
// Define types for the schedule and courses
export interface Course {
  id?: string;
  code: string;
  name: string;
  room: string;
  faculty: string;
  section?: string;
  semester?: string;
  colorClass: string;
  hasConflict?: boolean;
  startHour?: number;
  endHour?: number;
}

export interface TimeSlot {
  courses: Course[];
}

export interface ScheduleType {
  [key: string]: TimeSlot[];
}

export interface ClassroomType {
  id: string;
  name: string;
  count: number;
}

export interface Classroom {
  id: string;
  code: string;
  typeId: string;
}

export interface Semester {
  id: string;
  name: string;
  careerId: string;
}
