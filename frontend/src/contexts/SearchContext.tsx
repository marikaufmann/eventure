import { createContext, useState } from "react";

export type SearchContextType = {
  location: string;
  subCategory: string | undefined;
  category: string | undefined;
  date: Date | undefined;
  saveSearchValues: (
    location: string,
    subCategory: string | undefined,
    date: Date | undefined,
    category: string | undefined
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
  const [subCategory, setSubCategory] = useState<string | undefined>(
    () => sessionStorage.getItem("subCategory") || undefined
  );
  const [category, setCategory] = useState<string | undefined>(
    () => sessionStorage.getItem("category") || undefined
  );
  const [date, setDate] = useState<Date | undefined>(() => {
    const savedDate = sessionStorage.getItem("date");
    return savedDate ? new Date(savedDate) : undefined;
  });

  const saveSearchValues = (
    location: string,
    subCategory: string | undefined,
    date: Date | undefined,
    category: string | undefined
  ) => {
    setLocation(location);
    setSubCategory(subCategory);
    setDate(date);
    setCategory(category);
    sessionStorage.setItem("location", location);

    if (date) {
      sessionStorage.setItem("date", date.toString());
    } else {
      sessionStorage.removeItem("date");
    }
    if (subCategory) {
      sessionStorage.setItem("subCategory", subCategory);
    } else {
      sessionStorage.removeItem("subCategory");
    }
    if (category) {
      sessionStorage.setItem("category", category);
    } else {
      sessionStorage.removeItem("category");
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
