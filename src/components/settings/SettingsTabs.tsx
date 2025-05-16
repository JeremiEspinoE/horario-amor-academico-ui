
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import AccountSettings from "./AccountSettings";
import GeneralSettings from "./GeneralSettings";
import RoomTypeSettings from "./RoomTypeSettings";
import PeriodoAcademico from "../../pages/gestion_academica/PeriodoAcademico";

export default function SettingsTabs() {
  const { userRole } = useAppContext();
  
  // Only admin can see all tabs, teachers will only see account tab
  const [activeTab, setActiveTab] = useState(userRole === "administrativo" ? "academic-periods" : "account");
  
  // Determine if we're showing teacher view or admin view
  const isTeacherView = userRole === "docente";

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Only show all tabs for administrators */}
      {!isTeacherView ? (
        <TabsList className="w-full overflow-x-auto flex-nowrap flex justify-start sm:justify-center">
          <TabsTrigger value="academic-periods" className="whitespace-nowrap">Periodos Académicos</TabsTrigger>
          <TabsTrigger value="room-types" className="whitespace-nowrap">Tipos de Aula</TabsTrigger>
          <TabsTrigger value="general" className="whitespace-nowrap">Configuración General</TabsTrigger>
          <TabsTrigger value="account" className="whitespace-nowrap">Cuenta</TabsTrigger>
        </TabsList>
      ) : (
        <TabsList>
          <TabsTrigger value="account">Mi Perfil</TabsTrigger>
        </TabsList>
      )}
      
      {!isTeacherView && (
        <>
          {/* Gestion de Periodo */}
          <TabsContent value="academic-periods" className="space-y-4">
            <PeriodoAcademico />
          </TabsContent>
          <TabsContent value="room-types" className="space-y-4">
            <RoomTypeSettings />
          </TabsContent>
          
          <TabsContent value="general" className="space-y-4">
            <GeneralSettings />
          </TabsContent>
        </>
      )}
      
      <TabsContent value="account" className="space-y-4">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
}
