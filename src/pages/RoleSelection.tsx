
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCog, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      // Por ahora solo redirigimos al login, pero podríamos usar el rol después
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-accent/20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md animate-fade-in shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Planificador Académico</CardTitle>
          <CardDescription>Selecciona tu rol para continuar</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="grid grid-cols-1 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="administrativo" id="administrativo" />
              <Label
                htmlFor="administrativo"
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-accent"
              >
                <UserCog className="h-5 w-5" />
                <span>Administrativo</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="docente" id="docente" />
              <Label
                htmlFor="docente"
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-accent"
              >
                <School className="h-5 w-5" />
                <span>Docente</span>
              </Label>
            </div>
          </RadioGroup>

          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={!selectedRole}
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
      
      <div className="absolute bottom-4 text-center w-full text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Planificador Académico. Todos los derechos reservados.
      </div>
    </div>
  );
}
