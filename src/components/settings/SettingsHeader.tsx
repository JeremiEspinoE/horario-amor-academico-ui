
import { Button } from "@/components/ui/button";
import { Check, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";

export default function SettingsHeader() {
  const { toast } = useToast();
  const { userRole } = useAppContext();

  const handleSaveSettings = () => {
    toast({
      title: "Configuración Guardada",
      description: "La configuración se ha guardado correctamente.",
      action: (
        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      ),
    });
  };

  // Determine if we're showing teacher view or admin view
  const isTeacherView = userRole === "docente";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isTeacherView ? "Mi Perfil" : "Configuración"}
      </h1>
      {!isTeacherView && (
        <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      )}
    </div>
  );
}
