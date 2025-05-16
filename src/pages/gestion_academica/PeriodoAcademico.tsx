
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);
const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold leading-none tracking-tight">{children}</h3>
);
const CardDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Label = ({ children, htmlFor = "", className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>
);
const Input = ({ id = "", type = "text", value = "", defaultValue = "", placeholder = "", className = "", onChange = () => {}, readOnly = false, disabled = false, ...props }) => (
  <input
    id={id}
    type={type}
    value={value}
    defaultValue={defaultValue}
    placeholder={placeholder}
    onChange={onChange}
    readOnly={readOnly}
    disabled={disabled}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className} ${readOnly ? 'cursor-default bg-muted/50' : ''}`}
    {...props}
  />
);
const Button = ({ children, variant = "default", className = "", onClick = () => {}, disabled = false, loading = false, type = "button", ...props }) => {
  const getVariantClass = () => {
    if (variant === "outline") return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${getVariantClass()} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

const Select = ({ children, value, onValueChange, ...props }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </select>
);
const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;

const Dialog = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => onClose()}>
      <div className="bg-card border rounded-lg shadow-lg p-6 w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

// DatePicker implementación correcta
const DatePicker = ({ value, onChange, id = "", disabled = false }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || "");

  useEffect(() => {
    setCurrentDate(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCurrentDate(newValue);
    onChange(newValue);
  };

  const handleCalendarToggle = () => {
    if (!disabled) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  const handleDateSelect = (e) => {
    const newDate = e.target.value;
    setCurrentDate(newDate);
    onChange(newDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex">
        <Input
          id={id}
          type="date"
          value={currentDate}
          onChange={handleInputChange}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="button"
          onClick={handleCalendarToggle}
          className={`absolute right-0 top-0 h-10 w-10 flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={disabled}
        >
          <CalendarIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const API_URL_BASE = "/api/academic/periodos-academicos";

export default function AcademicPeriods() {
  const [periods, setPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [error, setError] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [formData, setFormData] = useState({ nombre_periodo: "", fecha_inicio: "", fecha_fin: "", activo: false });

  // Manejo centralizado de errores
  const handleApiError = (err, context) => {
    console.error(`Error ${context}:`, err);
    let message = `Error al ${context}. Intente de nuevo.`;
    if (err.response && err.response.data) {
      const data = err.response.data;
      if (data.message) message = data.message;
      else if (data.detail) message = data.detail;
      else if (Array.isArray(data) && data.length) message = JSON.stringify(data[0]);
      else if (typeof data === 'string') message = data;
    } else if (err.message) {
      message = err.message;
    }
    setError(message);
    toast.error(message);
  };

  // Fetch inicial de periodos
  useEffect(() => {
    async function load() {
      setIsFetching(true);
      setError(null);
      try {
        const res = await api.get(`${API_URL_BASE}/`);
        const data = res.data;
        if (!data || !Array.isArray(data.results)) throw new Error('Respuesta inválida');
        const arr = data.results.map(p => ({
          ...p,
          fecha_inicio: p.fecha_inicio?.split('T')[0] || '',
          fecha_fin:    p.fecha_fin?.split('T')[0]    || ''
        })).sort((a, b) => {
          const dateA = new Date(b.fecha_inicio).getTime();
          const dateB = new Date(a.fecha_inicio).getTime();
          return dateA - dateB;
        });
        setPeriods(arr);
        setCurrentPeriod(arr.find(p => p.activo) || arr[0] || null);
      } catch (e) {
        handleApiError(e, 'cargar periodos');
      } finally {
        setIsFetching(false);
      }
    }
    load();
  }, []);

  // Handlers de formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleDateChange = (name, date) => setFormData(prev => ({ ...prev, [name]: date }));

  const handleAddNewClick = () => {
    setEditingPeriod(null);
    setFormData({ nombre_periodo: "", fecha_inicio: "", fecha_fin: "", activo: false });
    setError(null);
    setIsModalOpen(true);
  };
  const handleEditClick = (period) => {
    setEditingPeriod(period);
    setFormData({
      nombre_periodo: period.nombre_periodo,
      fecha_inicio:   period.fecha_inicio,
      fecha_fin:      period.fecha_fin,
      activo:         period.activo
    });
    setError(null);
    setIsModalOpen(true);
  };

  // Submit (crear/editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.nombre_periodo || !formData.fecha_inicio || !formData.fecha_fin) {
      setError("Complete todos los campos.");
      setIsSubmitting(false);
      return;
    }
    
    const startDate = new Date(formData.fecha_inicio).getTime();
    const endDate = new Date(formData.fecha_fin).getTime();
    
    if (startDate >= endDate) {
      setError("La fecha de fin debe ser posterior.");
      setIsSubmitting(false);
      return;
    }

    const url    = editingPeriod ? `${API_URL_BASE}/${editingPeriod.periodo_id}/` : `${API_URL_BASE}/`;
    const method = editingPeriod ? api.put : api.post;

    try {
      const res = await method(url, formData);
      const saved = res.data;
      const formatted = {
        ...saved,
        fecha_inicio: saved.fecha_inicio?.split('T')[0] || '',
        fecha_fin:    saved.fecha_fin?.split('T')[0]    || ''
      };
      toast.success(`Periodo ${editingPeriod ? 'actualizado' : 'guardado'} correctamente.`);

      let updatedList;
      if (editingPeriod) {
        updatedList = periods.map(p => p.periodo_id === editingPeriod.periodo_id ? formatted : p);
        if (formatted.activo) {
          setCurrentPeriod(formatted);
          updatedList = updatedList.map(p => p.periodo_id !== formatted.periodo_id ? { ...p, activo: false } : p);
        }
      } else {
        updatedList = [formatted, ...periods];
        if (formatted.activo) {
          setCurrentPeriod(formatted);
          updatedList = updatedList.map(p => p.periodo_id !== formatted.periodo_id ? { ...p, activo: false } : p);
        }
      }
      
      updatedList.sort((a, b) => {
        const dateA = new Date(b.fecha_inicio).getTime();
        const dateB = new Date(a.fecha_inicio).getTime();
        return dateA - dateB;
      });
      
      setPeriods(updatedList);
      setIsModalOpen(false);
    } catch (e) {
      handleApiError(e, editingPeriod ? 'actualizar periodo' : 'guardar periodo');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching && periods.length === 0) {
    return <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /> Cargando periodos...</div>;
  }

  const upcoming = periods.filter(p => !currentPeriod || p.periodo_id !== currentPeriod.periodo_id);

  return (
    <div className="space-y-6">
      {/* Error general */}
      {error && !isModalOpen && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Periodo Actual */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Periodo Actual</CardTitle>
            {currentPeriod?.activo && <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Activo</div>}
            {!currentPeriod && !isFetching && <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Ninguno</div>}
          </div>
          <CardDescription>Periodo académico activo</CardDescription>
        </CardHeader>
        {currentPeriod && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1"><Label htmlFor="nombre">Nombre</Label><Input id="nombre" value={currentPeriod.nombre_periodo} readOnly defaultValue="" placeholder="" /></div>
              <div className="space-y-1"><Label htmlFor="fecha-inicio">Inicio</Label><Input id="fecha-inicio" type="date" value={currentPeriod.fecha_inicio} readOnly defaultValue="" placeholder="" /></div>
              <div className="space-y-1"><Label htmlFor="fecha-fin">Fin</Label><Input id="fecha-fin" type="date" value={currentPeriod.fecha_fin} readOnly defaultValue="" placeholder="" /></div>
            </div>
            <div className="flex justify-end"><Button variant="outline" onClick={() => handleEditClick(currentPeriod)} disabled={isFetching}>Configurar</Button></div>
          </CardContent>
        )}
        {!currentPeriod && !isFetching && <CardContent>No hay periodo activo.</CardContent>}
      </Card>

      {/* Otros Periodos */}
      <Card>
        <CardHeader>
          <CardTitle>Otros Periodos</CardTitle>
          <CardDescription>Periodos pasados o futuros</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isFetching && periods.length > 0 && <p>Actualizando...</p>}
          {upcoming.length === 0 && !isFetching && <p className="text-center">No hay otros periodos.</p>}
          {upcoming.map(p => (
            <div key={p.periodo_id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center border rounded-lg p-4 hover:bg-accent/50">
              <div className="grid grid-cols-3 gap-x-4"><p className="font-medium">{p.nombre_periodo}</p><p>{p.fecha_inicio}</p><p>{p.fecha_fin}</p></div>
              <Button variant="outline" size="sm" onClick={() => handleEditClick(p)} disabled={isFetching}>Configurar</Button>
            </div>
          ))}
          <div className="border-t pt-6 mt-6"><Button onClick={handleAddNewClick} disabled={isFetching}>Agregar Nuevo Periodo</Button></div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => !isSubmitting && setIsModalOpen(false)} title={editingPeriod ? "Editar Periodo Académico" : "Agregar Nuevo Periodo"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && isModalOpen && <div className="p-3 bg-destructive/10 text-destructive border rounded-md text-sm">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="nombre_periodo">Nombre *</Label>
            <Input id="nombre_periodo" name="nombre_periodo" value={formData.nombre_periodo} onChange={handleInputChange} required disabled={isSubmitting} defaultValue="" placeholder=""/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha_inicio">Fecha Inicio *</Label>
              <DatePicker id="fecha_inicio" value={formData.fecha_inicio} onChange={date => handleDateChange('fecha_inicio', date)} disabled={isSubmitting}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha_fin">Fecha Fin *</Label>
              <DatePicker id="fecha_fin" value={formData.fecha_fin} onChange={date => handleDateChange('fecha_fin', date)} disabled={isSubmitting}/>
            </div>
          </div>
          <div className="flex items-center space-x-2"><input type="checkbox" name="activo" checked={formData.activo} onChange={handleInputChange} disabled={isSubmitting} id="activo"/><Label htmlFor="activo">Marcar como activo</Label></div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancelar</Button>
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>{isSubmitting ? (editingPeriod ? 'Actualizando...' : 'Guardando...') : (editingPeriod ? 'Actualizar' : 'Guardar')}</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
