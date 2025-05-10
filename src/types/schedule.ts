
// Define types for the schedule and courses
export interface Course {
  id?: string;
  code: string;
  name: string;
  room: string;
  faculty: string;
  section?: string;
  colorClass: string;
  hasConflict?: boolean;
}

export interface TimeSlot {
  courses: Course[];
}

export interface ScheduleType {
  [key: string]: TimeSlot[];
}
