
import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduleData {
  day: string;
  time: string;
  course: string;
  room: string;
  faculty: string;
}

interface ExcelExportProps {
  data: any[];
  title?: string;
  filename?: string;
}

export const ExcelExport: React.FC<ExcelExportProps> = ({
  data,
  title = 'Horario',
  filename = 'horario_academico'
}) => {
  const { toast } = useToast();

  const exportToExcel = () => {
    try {
      // Crear una hoja de trabajo
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Crear un libro de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, title);
      
      // Escribir y descargar el archivo
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      
      toast({
        title: "Exportación exitosa",
        description: "El horario ha sido exportado correctamente",
      });
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      toast({
        title: "Error al exportar",
        description: "No se pudo exportar el horario a Excel",
        variant: "destructive"
      });
    }
  };

  return (
    <Button onClick={exportToExcel} variant="outline" className="ml-auto">
      <Download className="mr-2 h-4 w-4" />
      Exportar a Excel
    </Button>
  );
};
