
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstitucionFormulario() {
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidadId, setUnidadId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUnidad = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado");

        const res = await fetch("http://127.0.0.1:8000/api/academic/unidades-academicas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const unidad = data.results[0];

        if (unidad) {
          setNombreInstitucion(unidad.nombre_unidad || "");
          setDescripcion(unidad.descripcion || "");
          setUnidadId(unidad.unidad_id);
        }
      } catch (error) {
        console.error("Error al cargar unidad:", error);
        toast.error("No se pudo cargar la información de la institución");
      }
    };

    fetchUnidad();
  }, []);

  const guardarCambios = async () => {
    if (!unidadId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await fetch(`http://127.0.0.1:8000/api/academic/unidades-academicas/${unidadId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre_unidad: nombreInstitucion,
          descripcion: descripcion,
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar");
      toast.success("Información actualizada correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("Hubo un problema al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Información Institucional</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="institution-name">Nombre de la Institución</Label>
            <Input
              id="institution-name"
              placeholder="Nombre de la institución"
              value={nombreInstitucion}
              onChange={(e) => setNombreInstitucion(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution-description">Descripción</Label>
            {isMobile ? (
              <Textarea
                id="institution-description"
                placeholder="Descripción de la institución"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                className="w-full"
              />
            ) : (
              <Input
                id="institution-description"
                placeholder="Descripción de la institución"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full"
              />
            )}
          </div>

          <Button 
            onClick={guardarCambios} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
