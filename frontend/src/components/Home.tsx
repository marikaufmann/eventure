import { useSearchContext } from "@/hooks/use-search-context";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "@/api-client";
import { Check, LocateFixed, PencilLine } from "lucide-react";
import { cn, containsOnlyLetters, useFetchCategories } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  citiesAndCountries,
  fullCountriesObject,
  popularCitiesAndCountries,
  popularCitiesByCountry,
} from "@/lib/config";
import Fuse from "fuse.js";
import TrendingEvents from "@/components/TrendingEvents";
import CategoriesSlider from "./CategoriesSlider";
import CategorySlider from "./CategorySlider";
import { Link } from "react-router-dom";

const Home = () => {
  const search = useSearchContext();
  const { data: userLocation, isSuccess: fetchedUserLocation } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: apiClient.fetchUserLocation,
    staleTime: 0,
    gcTime: 0,
  });

  const [userCountry, setUserCountry] = useState<string | undefined>(undefined);
  const [userCity, setUserCity] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string>(search.location);
  const [initialLocation, setInitialLocation] = useState<string | undefined>(
    undefined
  );
  const [showNotFoundEvents, setShowNotFoundEvents] = useState<boolean>(false);
  const [hasTrendingEvents, setHasTrendingEvents] = useState<boolean>(false);

  const [isFetchedEventsForUsersLocation, setIsFetchedEventsForUsersLocation] =
    useState<boolean | undefined>(undefined);
  const [
    isFetchedEventsForUsersCapitalLocation,
    setIsFetchedEventsForUsersCapitalLocation,
  ] = useState<boolean | undefined>(undefined);
  const [
    isFetchedEventsForManualUsersLocation,
    setIsFetchedEventsForManualUsersLocation,
  ] = useState<boolean | undefined>(undefined);
  const [
    isFetchedEventsForManualUsersCapitalLocation,
    setIsFetchedEventsForManualUsersCapitalLocation,
  ] = useState<boolean | undefined>(undefined);
  const [locationFetchStatus, setLocationFetchStatus] = useState<
    | "initial"
    | "capital"
    | "fallback"
    | "manualInitial"
    | "manualCapital"
    | "manualFallback"
  >("initial");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Music", "Sports", "Comedy", "Theatre"];

  const { results: categoryData } = useFetchCategories({
    location,
    categories,
    hasTrendingEvents,
    setHasTrendingEvents,
  });

  useEffect(() => {
    if (!location && search.location) {
      setLocation(search.location);
    }
  }, [search.location, location]);

  useEffect(() => {
    if (fetchedUserLocation && !search.location && !location) {
      setUserCountry(userLocation?.country?.name);
      setUserCity(userLocation?.city?.name);
      const newLocation =
        userLocation?.city?.name && userLocation?.country?.name
          ? `${userLocation.city.name}, ${userLocation.country.name}`
          : "New York, United States";
      setLocation(newLocation);
      setInitialLocation(newLocation);
      search.saveSearchValues(
        newLocation,
        search.category,
        search.date,
        search.category
      );
    }
  }, [userLocation, fetchedUserLocation, search.location, location]);

  useEffect(() => {
    if (
      locationFetchStatus === "initial" &&
      !hasTrendingEvents &&
      isFetchedEventsForUsersLocation === false
    ) {
      let capitalLocation;
      if (userCountry) {
        capitalLocation =
          citiesAndCountries.find(
            (loc) => loc.split(", ")[1] === userCountry
          ) || "New York, United States";
      } else {
        capitalLocation =
          citiesAndCountries.find(
            (loc) => loc.split(", ")[1] === search.location.split(", ")[1]
          ) || "New York, United States";
      }
      setInitialLocation(search.location);
      setLocationFetchStatus("capital");
      setShowNotFoundEvents(true);
      setLocation(capitalLocation);
    } else if (
      locationFetchStatus === "capital" &&
      !hasTrendingEvents &&
      isFetchedEventsForUsersCapitalLocation === false
    ) {
      setLocationFetchStatus("fallback");
      setLocation("New York, United States");
      setValue("New York, United States");
    } else if (
      locationFetchStatus === "manualInitial" &&
      !hasTrendingEvents &&
      isFetchedEventsForManualUsersLocation === false
    ) {
      const capitalLocation =
        citiesAndCountries.find(
          (loc) => loc.split(", ")[1] === location.split(", ")[1]
        ) || "New York, United States";
      setLocationFetchStatus("manualCapital");
      setLocation(capitalLocation);
      setShowNotFoundEvents(true);
      setValue(capitalLocation);
    } else if (
      locationFetchStatus === "manualCapital" &&
      !hasTrendingEvents &&
      isFetchedEventsForManualUsersCapitalLocation === false
    ) {
      setLocationFetchStatus("manualFallback");
      setLocation("New York, United States");
      setValue("New York, United States");
    } else if (locationFetchStatus === "manualInitial" && hasTrendingEvents) {
      setShowNotFoundEvents(false);
    }
  }, [
    hasTrendingEvents,
    locationFetchStatus,
    isFetchedEventsForUsersLocation,
    isFetchedEventsForUsersCapitalLocation,
    isFetchedEventsForManualUsersLocation,
    isFetchedEventsForManualUsersCapitalLocation,
  ]);

  const locationsArray = useMemo(
    () =>
      Object.entries(fullCountriesObject).flatMap(([country, cities]) =>
        Object.keys(cities).map((city) => ({
          value: `${city}, ${country}`,
          label: `${city}, ${country}`,
        }))
      ),
    []
  );
  const fuse = useMemo(() => {
    return new Fuse(locationsArray, { keys: ["label"], threshold: 0.3 });
  }, [locationsArray]);

  const filteredLocations = useMemo(() => {
    const worldCapitalsLocations = locationsArray
      .filter((location) => popularCitiesAndCountries.includes(location.label))
      .sort(
        (a, b) =>
          popularCitiesAndCountries.indexOf(a.label) -
          popularCitiesAndCountries.indexOf(b.label)
      );
    const nonCapitalLocations = locationsArray.filter(
      (location) => !popularCitiesAndCountries.includes(location.label)
    );

    if (!userCountry) {
      return [...worldCapitalsLocations, ...nonCapitalLocations];
    }
    const userCountryLocations = locationsArray.filter(
      (location) => location.label.split(", ")[1] === userCountry
    );
    const otherLocations = nonCapitalLocations.filter(
      (location) => !userCountryLocations.includes(location)
    );
    return [
      ...userCountryLocations,
      ...worldCapitalsLocations,
      ...otherLocations,
    ];
  }, [locationsArray, userCountry]);

  const results = useMemo(() => {
    if (searchTerm) {
      const matchingCountry = Object.keys(popularCitiesByCountry).find(
        (country) => country.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      const popularCities = matchingCountry
        ? popularCitiesByCountry[
            matchingCountry as keyof typeof popularCitiesByCountry
          ]
        : [];

      const popularCityResults = popularCities.map((city) => ({
        value: `${city}, ${matchingCountry}`,
        label: `${city}, ${matchingCountry}`,
      }));

      const otherResults = fuse
        .search(searchTerm)
        .map(({ item }) => item)
        .filter(
          (location) => !popularCities.includes(location.value.split(", ")[0])
        )
        .slice(0, 8 - popularCityResults.length);

      return [...popularCityResults, ...otherResults];
    } else {
      return filteredLocations.slice(0, 8);
    }
  }, [searchTerm, fuse, filteredLocations]);

  useEffect(() => {
    if (value) {
      setLocation(value);
      search.saveSearchValues(
        value,
        search.category,
        search.date,
        search.category
      );
    }
  }, [value]);

  useEffect(() => {
    if (location) {
      search.saveSearchValues(
        location,
        search.category,
        search.date,
        search.category
      );
    }
  }, [location]);
  return (
    <div className="bg-background w-full min-h-screen h-full text-black">
      <div className="bg-[#070606] py-10">
        <h1 className="text-2xl text-white mb-10 text-center font-medium tracking-widest">
          TRENDING EVENTS
        </h1>

        <div className="px-2">
          <TrendingEvents
            location={location}
            setIsFetchedEventsForUsersLocation={
              setIsFetchedEventsForUsersLocation
            }
            setIsFetchedEventsForUsersCapitalLocation={
              setIsFetchedEventsForUsersCapitalLocation
            }
            setIsFetchedEventsForManualUsersLocation={
              setIsFetchedEventsForManualUsersLocation
            }
            setIsFetchedEventsForManualUsersCapitalLocation={
              setIsFetchedEventsForManualUsersCapitalLocation
            }
            setHasTrendingEvents={setHasTrendingEvents}
            locationFetchStatus={locationFetchStatus}
          />
        </div>
      </div>
      {showNotFoundEvents && (
        <div className="text-black/80 flex text-center md:text-lg text-base md:pt-8 xsm:pt-6 pt-8 pb-4 w-fit mx-auto">
          No events found in{" "}
          <p className="flex gap-1 ml-3 items-center text-primary">
            <LocateFixed className="w-5 h-5 " /> {initialLocation}
          </p>
        </div>
      )}
      <div
        className={`flex items-center  justify-center ${
          showNotFoundEvents ? "md:pb-8 xsm:pb-6 pb-8" : "md:py-8 xsm:py-6 py-8"
        }`}
      >
        <h1 className="md:text-2xl sm:text-xl text-lg font-medium ">
          Browsing events near{" "}
        </h1>
        <div className="w-fit ml-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between outline outline-2 shadow-sm bg-white rounded-sm"
              >
                {value ? (
                  <div className="truncate md:text-xl  sm:text-lg text-base">
                    {locationsArray.find(
                      (location) => location.value === value
                    ) && value}
                  </div>
                ) : (
                  <div className="flex gap-2 md:text-xl sm:text-lg text-base">
                    {location
                      ? location
                      : userCity &&
                        userCountry &&
                        containsOnlyLetters(userCity) &&
                        containsOnlyLetters(userCountry)
                      ? `${userCity}, ${userCountry}`
                      : "New York, United States"}
                  </div>
                )}
                <PencilLine className="ml-2 sm:h-6 sm:w-6 w-4 h-4 shrink-0 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput
                  placeholder="Search location..."
                  onValueChange={(value) => {
                    setSearchTerm(value);
                  }}
                  value={searchTerm}
                />
                <CommandList>
                  <CommandEmpty>No such locations found.</CommandEmpty>
                  <CommandGroup>
                    {results.map((location) => (
                      <CommandItem
                        key={location.value}
                        value={location.value}
                        onSelect={(currentValue) => {
                          setLocationFetchStatus("manualInitial");
                          setValue(currentValue === value ? "" : currentValue);
                          setInitialLocation(
                            currentValue === value ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === location.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span>
                          {`${location.label.split(", ")[0]}, `}
                          <span className="font-medium">
                            {location.label.split(", ")[1]}
                          </span>
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="bg-[#262626]  pt-4 pb-12 border-t-2 border-b-2 border-black">
        <h1 className="text-2xl font-medium mb-4 text-white max-w-[1700px] mx-auto px-10">
          Explore by Category
        </h1>
        <div className="px-2">
          <CategoriesSlider />
        </div>
      </div>
      <div className="bg-black/10 pt-4 pb-6  border-t-2 border-b-2 border-black">
        <div className="max-w-[1700px] mx-auto">
          <Link
            to="/categories/music"
            className="text-3xl font-medium mb-4 text-black  px-10"
          >
            Music
          </Link>
        </div>
        {categoryData[0].isFetched &&
        (!categoryData[0].data || categoryData[0].data?.length === 0) ? (
          <p className=" mb-4 text-white/60 pt-4   px-10">
            No music events found in {location}
          </p>
        ) : (
          <div className="px-2">
            <CategorySlider
              category="Music"
              location={location}
              data={categoryData[0]}
            />
          </div>
        )}
      </div>
      <div className="bg-primary pt-4 pb-6  border-t border-b-2 border-black">
        <div className="max-w-[1700px] mx-auto">
          <Link
            to="/categories/sports"
            className="text-3xl font-medium mb-4 text-white px-10"
          >
            Sports
          </Link>
        </div>
        {categoryData[1].isFetched &&
        (!categoryData[1].data || categoryData[1].data?.length === 0) ? (
          <p className=" mb-4 text-white/60 pt-4   px-10">
            No sports events found in {location}
          </p>
        ) : (
          <div className="px-2">
            <CategorySlider
              redTheme={true}
              category="Sports"
              location={location}
              data={categoryData[1]}
            />
          </div>
        )}
      </div>
      <div className="bg-black/30 pt-4 pb-6  border-t border-b-2 border-black">
        <div className="max-w-[1700px] mx-auto">
          <Link
            to="/categories/comedy"
            className="text-3xl font-medium mb-4 text-black px-10"
          >
            Comedy
          </Link>
        </div>
        {categoryData[2].isFetched &&
        (!categoryData[2].data || categoryData[2].data?.length === 0) ? (
          <p className=" mb-4 text-white/60 pt-4   px-10">
            No comedy events found in {location}
          </p>
        ) : (
          <div className="px-2">
            <CategorySlider
              category="Comedy"
              location={location}
              data={categoryData[2]}
            />
          </div>
        )}
      </div>
      <div className="bg-[#262626] pt-4 pb-6  border-t border-b  border-black">
        <div className="max-w-[1700px] mx-auto">
          <Link
            to="/categories/theatre"
            className="text-3xl font-medium mb-4 text-white  px-10"
          >
            Theatre
          </Link>
        </div>
        {categoryData[3].isFetched &&
        (!categoryData[3].data || categoryData[3].data?.length === 0) ? (
          <p className=" mb-4 text-white/60 pt-4   px-10">
            No theatre events found in {location}
          </p>
        ) : (
          <div className="px-2">
            <CategorySlider
              grayTheme={true}
              category="Theatre"
              location={location}
              data={categoryData[3]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
