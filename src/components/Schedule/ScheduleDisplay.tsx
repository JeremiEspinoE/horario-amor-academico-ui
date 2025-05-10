
import React from "react";
import { cn } from "@/lib/utils";
import { ScheduleType } from "@/types/schedule";

interface ScheduleDisplayProps {
  daysOfWeek: string[];
  timeSlots: number[];
  schedule: ScheduleType;
  isScheduleEnabled: boolean;
  formatTimeSlot: (hour: number) => string;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({
  daysOfWeek,
  timeSlots,
  schedule,
  isScheduleEnabled,
  formatTimeSlot,
}) => {
  return (
    <div className={cn("border rounded-md overflow-auto", !isScheduleEnabled && "opacity-50 pointer-events-none")}>
      <div className="grid grid-cols-[auto_repeat(6,1fr)] min-w-[900px]">
        <div className="bg-muted/50 border-b border-r p-3 font-medium">Hora</div>
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
              const slot = schedule[day][timeIndex];
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
                  {slot.courses.map((course, idx) => {
                    // Check if this is a multi-hour course
                    const isMultiHour = course.startHour !== undefined && 
                                        course.endHour !== undefined && 
                                        course.startHour < course.endHour;
                    
                    // Only render the course in the first cell of its range
                    const shouldRender = !isMultiHour || course.startHour === hour;
                    
                    if (!shouldRender) return null;
                    
                    return (
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
                        {(course.section || course.semester) && (
                          <div className="text-[10px] md:text-xs opacity-80">
                            {course.semester && `Sem: ${course.semester}`}
                            {course.semester && course.section && " • "}
                            {course.section && `Sec: ${course.section}`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
