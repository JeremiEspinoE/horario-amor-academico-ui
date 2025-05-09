
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AppContextType {
  userRole: string | null;
  setUserRole: (role: string) => void;
  isTestMode: boolean;
  setTestMode: (mode: boolean) => void;
  currentPeriod: string;
  setCurrentPeriod: (period: string) => void;
  periodStatus: 'active' | 'inactive' | 'unpublished';
  setPeriodStatus: (status: 'active' | 'inactive' | 'unpublished') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isTestMode, setTestMode] = useState<boolean>(false);
  const [currentPeriod, setCurrentPeriod] = useState<string>('Primavera 2025');
  const [periodStatus, setPeriodStatus] = useState<'active' | 'inactive' | 'unpublished'>('active');

  // Cargar el rol del usuario de localStorage al iniciar
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Guardar el rol del usuario en localStorage cuando cambie
  const handleSetUserRole = (role: string) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const value = {
    userRole,
    setUserRole: handleSetUserRole,
    isTestMode,
    setTestMode,
    currentPeriod,
    setCurrentPeriod,
    periodStatus,
    setPeriodStatus
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};
