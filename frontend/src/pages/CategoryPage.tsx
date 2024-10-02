import CategoryHero from "@/components/CategoryHero";
import CategorySearch from "@/components/CategorySearch";
import { useLocation } from "react-router-dom";
import * as apiClient from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Events from "../components/Events";
import { useSearchContext } from "../hooks/use-search-context";
import { containsOnlyLetters } from "@/lib/utils";

const Category = () => {
  const search = useSearchContext();
  const { data: userLocation } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: apiClient.fetchUserLocation,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const [userCountry, setUserCountry] = useState<string | undefined>(undefined);
  const [userCity, setUserCity] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(
    search.subCategory && search.subCategory.length > 0
      ? search.subCategory
      : "all"
  );
  const [location, setLocation] = useState<string>(search.location);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date | undefined>(search.date);

  useEffect(() => {
    const countryName = userLocation?.country?.name;
    const cityName = userLocation?.city?.name;

    setUserCountry(userLocation?.country?.name);
    setUserCity(userLocation?.city?.name);
    setLocation(
      search.location.length > 0 && search.location !== "All locations"
        ? search.location
        : cityName &&
          countryName &&
          containsOnlyLetters(cityName) &&
          containsOnlyLetters(countryName)
        ? `${userCity}, ${userCountry}`
        : "All locations"
    );
    setSelectedLocation(
      search.location.length > 0 ? search.location : undefined
    );
  }, [userLocation, userCity, userCountry]);

  useEffect(() => {
    search.saveSearchValues(location, category, date, search.category);
    setSelectedLocation(location);
  }, [location, category, date]);

  useEffect(() => {
    setDate(search.date);
  }, [search.date]);

  const path = useLocation();
  const categoryName = path.pathname.split("/")[2];


  return (
    <div className="bg-background w-full min-h-screen h-full text-black ">
      <CategoryHero
        categoryName={categoryName}
        userCountry={userCountry}
        userCity={userCity}
        selectedLocation={selectedLocation}
      />
      <div className="mt-[470px] w-full pb-4 border-b border-gray-200 max-w-[1700px] mx-auto relative">
        <CategorySearch
          userCountry={userCountry}
          userCity={userCity}
          categoryName={categoryName}
          selectedCategory={category}
          setSelectedCategory={setCategory}
          selectedLocation={location}
          setSelectedLocation={setLocation}
          selectedDate={date}
          setSelectedDate={setDate}
        />
      </div>
      <div className="max-w-[1700px] mx-auto py-8 ">
        <Events
          categoryName={categoryName}
          selectedCategory={category}
          location={location}
          date={date}
        />
      </div>
    </div>
  );
};

export default Category;
