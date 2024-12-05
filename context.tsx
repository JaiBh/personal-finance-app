"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <AppContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
