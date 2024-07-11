import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useContext } from "react";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
