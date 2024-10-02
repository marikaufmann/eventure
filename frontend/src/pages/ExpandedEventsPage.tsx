import { useLocation } from "react-router-dom";
import { containsOnlyLetters, handleCapitalize } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import LocationSelector from "@/components/LocationSelector";
import DatePicker from "@/components/DatePicker";
import { useSearchContext } from "@/hooks/use-search-context";
import * as apiClient from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import ExpandedEvents from "@/components/ExpandedEvents";

const ExpandedEventsPage = () => {
  const path = useLocation();
  const categoryName = path.pathname.split("/")[2];
  const subCategoryName = path.pathname.split("/")[3];
  const search = useSearchContext();
  const [location, setLocation] = useState(search.location);
  const [date, setDate] = useState<Date | undefined>(search.date);

  const { data: userLocation } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: apiClient.fetchUserLocation,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [userCountry, setUserCountry] = useState<string | undefined>(undefined);
  const [userCity, setUserCity] = useState<string | undefined>(undefined);

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
  }, [userLocation, userCity, userCountry]);

  useEffect(() => {
    search.saveSearchValues(location, search.category, date, "");
  }, [location, date]);

  useEffect(() => {
    setDate(search.date);
  }, [search.date]);



  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32">
      <div className="-mt-1">
        <Breadcrumbs />
      </div>
      <h1 className="text-4xl font-bold my-6">
        {subCategoryName === "all"
          ? `${handleCapitalize(subCategoryName)} ${handleCapitalize(
              categoryName
            )} events`
          : handleCapitalize(subCategoryName)}
      </h1>

      <div className="flex gap-6 w-full md:flex-row flex-col mb-8">
        <LocationSelector
          userCountry={userCountry}
          userCity={userCity}
          selectedLocation={location}
          setSelectedLocation={setLocation}
        />

        <DatePicker selectedDate={date} setSelectedDate={setDate} />
      </div>
      <ExpandedEvents
        location={location}
        date={date}
        category={
          subCategoryName === "all"
            ? handleCapitalize(categoryName)
            : handleCapitalize(subCategoryName)
        }
        handleIsFetching={(value: boolean) => setIsFetching(value)}
      />
      {isFetching && (
        <li className="flex justify-center mt-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
        </li>
      )}
    </div>
  );
};

export default ExpandedEventsPage;
