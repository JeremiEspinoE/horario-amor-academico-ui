
import React from "react";
import { Search, Filter, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Career, Institution, Subject } from "@/components/Hierarchical/HierarchicalSelect";

interface ScheduleFiltersProps {
  isScheduleEnabled: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedSectionFilter: string;
  setSelectedSectionFilter: (section: string) => void;
  selectedSemesterFilter: string;
  setSelectedSemesterFilter: (semester: string) => void;
  availableSections: string[];
  availableSemesters: string[];
  userRole: string | null;
  // New props for institution and career filters
  institutions: Institution[];
  careers: Career[];
  selectedInstitutionFilter: string;
  setSelectedInstitutionFilter: (institution: string) => void;
  selectedCareerFilter: string;
  setSelectedCareerFilter: (career: string) => void;
}

const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  isScheduleEnabled,
  handleSearch,
  showFilters,
  setShowFilters,
  selectedSectionFilter,
  setSelectedSectionFilter,
  selectedSemesterFilter,
  setSelectedSemesterFilter,
  availableSections,
  availableSemesters,
  userRole,
  // New props
  institutions,
  careers,
  selectedInstitutionFilter,
  setSelectedInstitutionFilter,
  selectedCareerFilter,
  setSelectedCareerFilter,
}) => {
  // Get careers filtered by selected institution
  const filteredCareers = selectedInstitutionFilter 
    ? careers.filter(career => career.institutionId === selectedInstitutionFilter)
    : careers;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={userRole === "docente" ? "Buscar en mi horario..." : "Buscar en horario..."} 
          className="pl-10" 
          onChange={handleSearch} 
          disabled={!isScheduleEnabled} 
        />
      </div>
      <Popover open={showFilters} onOpenChange={setShowFilters}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full md:w-[150px]" disabled={!isScheduleEnabled}>
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-4">
          <div className="grid gap-4">
            {/* Institution filter */}
            {isScheduleEnabled && institutions.length > 0 && userRole !== "docente" && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Institución</h4>
                <Select
                  value={selectedInstitutionFilter}
                  onValueChange={setSelectedInstitutionFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las instituciones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_institutions">Todas las instituciones</SelectItem>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Career filter */}
            {isScheduleEnabled && filteredCareers.length > 0 && userRole !== "docente" && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Carrera</h4>
                <Select
                  value={selectedCareerFilter}
                  onValueChange={setSelectedCareerFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las carreras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_careers">Todas las carreras</SelectItem>
                    {filteredCareers.map((career) => (
                      <SelectItem key={career.id} value={career.id}>
                        {career.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Semester filter for both admin and teachers */}
            {isScheduleEnabled && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Semestre</h4>
                <Select
                  value={selectedSemesterFilter}
                  onValueChange={setSelectedSemesterFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los semestres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_semesters">Todos los semestres</SelectItem>
                    {availableSemesters.length > 0 ? (
                      availableSemesters.map((semester, index) => (
                        <SelectItem key={index} value={semester}>
                          {semester}
                        </SelectItem>
                      ))
                    ) : (
                      // Sample semesters for teachers when no career is selected
                      userRole === "docente" && [
                        <SelectItem key="sem1" value="Semestre 1">Semestre 1</SelectItem>,
                        <SelectItem key="sem2" value="Semestre 2">Semestre 2</SelectItem>,
                        <SelectItem key="sem3" value="Semestre 3">Semestre 3</SelectItem>
                      ]
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Section filter */}
            {isScheduleEnabled && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Sección</h4>
                <Select
                  value={selectedSectionFilter}
                  onValueChange={setSelectedSectionFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las secciones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_sections">Todas las secciones</SelectItem>
                    {availableSections.length > 0 ? (
                      availableSections.map((section, index) => (
                        <SelectItem key={index} value={section}>
                          {section}
                        </SelectItem>
                      ))
                    ) : (
                      // Sample sections for teachers when no career is selected
                      userRole === "docente" && [
                        <SelectItem key="secA" value="Sección A">Sección A</SelectItem>,
                        <SelectItem key="secB" value="Sección B">Sección B</SelectItem>,
                        <SelectItem key="secC" value="Sección C">Sección C</SelectItem>
                      ]
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Department filter for both roles */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Departamento</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="comp-sci" />
                  <label
                    htmlFor="comp-sci"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Informática
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="business" />
                  <label
                    htmlFor="business"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Negocios
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="math" />
                  <label
                    htmlFor="math"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Matemáticas
                  </label>
                </div>
              </div>
            </div>

            {/* Display options for both roles */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Opciones de visualización</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-conflicts" defaultChecked />
                  <label
                    htmlFor="show-conflicts"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Resaltar conflictos
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-empty" />
                  <label
                    htmlFor="show-empty"
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ocultar espacios vacíos
                  </label>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setShowFilters(false)}
            >
              Aplicar Filtros
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScheduleFilters;
