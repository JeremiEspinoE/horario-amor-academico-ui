
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";

export default function Settings() {
  const { userRole } = useAppContext();
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-8 animate-fade-in container-xl">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  );
}
