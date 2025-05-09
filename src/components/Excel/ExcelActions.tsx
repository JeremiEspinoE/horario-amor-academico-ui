
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExcelActionsProps {
  data: any;
  onImport: (data: any) => void;
  filename?: string;
  sheetName?: string;
}

export const ExcelActions = ({ 
  data, 
  onImport, 
  filename = 'descarga', 
  sheetName = 'Hoja1' 
}: ExcelActionsProps) => {
  const [importing, setImporting] = useState(false);
  const { toast } = useToast();

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Generar archivo Excel y descargarlo
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      
      toast({
        title: "Exportación exitosa",
        description: "Los datos se han exportado correctamente",
      });
    } catch (error) {
      console.error("Error al exportar:", error);
      toast({
        title: "Error en la exportación",
        description: "No se pudo exportar los datos",
        variant: "destructive"
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImporting(true);
    const file = e.target.files?.[0];
    
    if (!file) {
      setImporting(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const wb = XLSX.read(event.target?.result, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        onImport(data);
        toast({
          title: "Importación exitosa",
          description: "Los datos se han importado correctamente",
        });
      } catch (error) {
        console.error("Error al importar:", error);
        toast({
          title: "Error en la importación",
          description: "El formato del archivo no es compatible",
          variant: "destructive"
        });
      } finally {
        setImporting(false);
        // Limpiar el input para permitir importar el mismo archivo nuevamente
        e.target.value = '';
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Error en la importación",
        description: "No se pudo leer el archivo",
        variant: "destructive"
      });
      setImporting(false);
    };
    
    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToExcel}
        className="flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        <span>Exportar Excel</span>
      </Button>
      
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 ${importing ? 'opacity-70' : ''}`}
          disabled={importing}
        >
          <Upload className="h-4 w-4" />
          <span>Importar Excel</span>
          <input
            type="file"
            accept=".xlsx, .xls"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImport}
            disabled={importing}
          />
        </Button>
      </div>
    </div>
  );
};
