
import React from "react";
import { ChevronLeft, ChevronRight, CalendarIcon, Download, TestTube, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ExcelExport } from "@/components/Schedule/ExcelExport";
import { useToast } from "@/hooks/use-toast";

interface ScheduleHeaderProps {
  currentPeriod: string;
  userRole: string | null;
  isTestMode: boolean;
  hasErrors: boolean;
  isScheduleEnabled: boolean;
  generateAutomaticSchedule: () => void;
  prepareDataForExcel: () => any[];
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  currentPeriod,
  userRole,
  isTestMode,
  hasErrors,
  isScheduleEnabled,
  generateAutomaticSchedule,
  prepareDataForExcel,
}) => {
  const { toast } = useToast();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Horario</h1>
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
        
        {/* Botón para generar horario automático (solo para administradores) */}
        {userRole === "administrativo" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={!isScheduleEnabled}
                className="relative"
                onClick={(e) => {
                  if (!isScheduleEnabled) {
                    e.preventDefault();
                    toast({
                      title: "Selección requerida",
                      description: "Seleccione una institución y una carrera antes de generar el horario",
                      variant: "destructive"
                    });
                  }
                }}
              >
                <TestTube className="mr-2 h-4 w-4" />
                Generar automáticamente
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Generar horario automático</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción intentará generar un horario automático optimizado sin conflictos.
                  {isTestMode
                    ? "No se preocupe, estás en modo prueba, por lo que no afectará los datos reales."
                    : "Esta acción modificará el horario actual."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={generateAutomaticSchedule}>
                  Generar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              disabled={(hasErrors && !isTestMode) || !isScheduleEnabled}
              onClick={(e) => {
                if (!isScheduleEnabled) {
                  e.preventDefault();
                  toast({
                    title: "Selección requerida",
                    description: "Seleccione una institución y una carrera antes de publicar el horario",
                    variant: "destructive"
                  });
                }
              }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Publicar Horario
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar Horario</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de que deseas publicar el horario de {currentPeriod}? Esto lo hará
                visible para todos los docentes y estudiantes.
                {hasErrors && (
                  <div className="mt-2 p-2 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>
                      Hay conflictos en el horario que deben resolverse antes de publicar.
                      {isTestMode && " Sin embargo, en modo prueba puedes publicar de todos modos."}
                    </span>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Publicar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <ExcelExport 
          data={prepareDataForExcel()} 
          title={currentPeriod} 
          filename={`horario_${currentPeriod.replace(/\s+/g, '_').toLowerCase()}`} 
        />
      </div>
    </div>
  );
};

export default ScheduleHeader;
