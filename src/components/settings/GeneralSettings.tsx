
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InstitucionNombre from "../../pages/gestion_academica/InstitucionNombre";

export default function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración General</CardTitle>
        <CardDescription>
          Configura ajustes generales del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {/*Configuracion de Institucion */}
          <InstitucionNombre />
          
          <div className="space-y-2">
            <Label htmlFor="schedule-slots">Duración Predeterminada de Hora Clase (minutos)</Label>
            <Select defaultValue="60">
              <SelectTrigger id="schedule-slots">
                <SelectValue placeholder="Selecciona duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
                <SelectItem value="90">90 minutos</SelectItem>
                <SelectItem value="120">120 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule-start">Hora de Inicio de Horario</Label>
            <Select defaultValue="8">
              <SelectTrigger id="schedule-start">
                <SelectValue placeholder="Selecciona hora de inicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7:00 AM</SelectItem>
                <SelectItem value="8">8:00 AM</SelectItem>
                <SelectItem value="9">9:00 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule-end">Hora de Fin de Horario</Label>
            <Select defaultValue="21">
              <SelectTrigger id="schedule-end">
                <SelectValue placeholder="Selecciona hora de fin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="17">5:00 PM</SelectItem>
                <SelectItem value="18">6:00 PM</SelectItem>
                <SelectItem value="19">7:00 PM</SelectItem>
                <SelectItem value="20">8:00 PM</SelectItem>
                <SelectItem value="21">9:00 PM</SelectItem>
                <SelectItem value="22">10:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="week-days">Días Laborables</Label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="bg-primary/20">Lunes</Button>
              <Button size="sm" variant="outline" className="bg-primary/20">Martes</Button>
              <Button size="sm" variant="outline" className="bg-primary/20">Miércoles</Button>
              <Button size="sm" variant="outline" className="bg-primary/20">Jueves</Button>
              <Button size="sm" variant="outline" className="bg-primary/20">Viernes</Button>
              <Button size="sm" variant="outline">Sábado</Button>
              <Button size="sm" variant="outline">Domingo</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
