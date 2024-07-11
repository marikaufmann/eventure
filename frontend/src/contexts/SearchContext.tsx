import { createContext, useState } from "react";

export type SearchContextType = {
  location: string;
  subCategory: string;
  category: string;
  date: Date | string;
  saveSearchValues: (
    location: string,
    subCategory: string,
    date: Date | string,
    category?: string
  ) => void;
};
export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<string>(
    () => sessionStorage.getItem("location") || ""
  );
  const [subCategory, setSubCategory] = useState<string>(
    () => sessionStorage.getItem("subCategory") || ""
  );
  const [category, setCategory] = useState<string>(
    () => sessionStorage.getItem("category") || ""
  );
  const [date, setDate] = useState<Date | string>(
    () => new Date(sessionStorage.getItem("date") as string) || ""
  );

  const saveSearchValues = (
    location: string,
    subCategory: string,
    date: Date | string,
    category?: string
  ) => {
    setLocation(location);
    setSubCategory(subCategory);
    setDate(date);
    sessionStorage.setItem("location", location);
    sessionStorage.setItem("subCategory", subCategory);
    sessionStorage.setItem("date", date.toString());
    if (category) {
      setCategory(category);
      sessionStorage.setItem("category", category);
    }
  };

  return (
    <SearchContext.Provider
      value={{ location, subCategory, date, saveSearchValues, category }}
    >
      {children}
    </SearchContext.Provider>
  );
};
