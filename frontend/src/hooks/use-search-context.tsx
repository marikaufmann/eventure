import { SearchContext, SearchContextType } from "@/contexts/SearchContext";
import { useContext } from "react";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};
