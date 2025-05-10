
import React from "react";

const ScheduleLegend: React.FC = () => {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-academic-600"></div>
        <span className="text-sm">Informática</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-faculty-600"></div>
        <span className="text-sm">Matemáticas</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-course-600"></div>
        <span className="text-sm">Negocios</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-room-600"></div>
        <span className="text-sm">Física</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-destructive"></div>
        <span className="text-sm">Conflictos</span>
      </div>
    </div>
  );
};

export default ScheduleLegend;
