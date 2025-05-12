
import { ScheduleType, TimeSlot } from "@/types/schedule";

// Create empty schedule (no sample data)
export const createInitialSchedule = (): ScheduleType => {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const scheduleObj: ScheduleType = {};

  daysOfWeek.forEach(day => {
    // 14 time slots (8 AM to 9 PM)
    scheduleObj[day] = Array(14).fill(null).map(() => ({ courses: [] }));
  });

  return scheduleObj;
};

// Estas listas vacías reemplazan los datos de muestra que teníamos anteriormente
export const careers = [];
export const subjects = [];

// Returns empty schedule instead of sample data
export const getSampleScheduleData = (): ScheduleType => {
  return createInitialSchedule();
};
