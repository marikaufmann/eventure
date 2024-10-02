import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn, containsOnlyLetters } from "@/lib/utils";
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
  fullCountriesObject,
  popularCitiesAndCountries,
  popularCitiesByCountry,
} from "@/lib/config";
import Fuse from "fuse.js";
const LocationSelector = ({
  userCountry,
  userCity,
  selectedLocation,
  setSelectedLocation,
}: {
  userCountry: string | undefined;
  userCity: string | undefined;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
    setSelectedLocation(value);
  }, [value, setSelectedLocation]);
  return (
    <div className="flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between flex items-center outline outline-1 text-base shadow rounded-sm"
          >
            {value ? (
              <div className="truncate">
                {locationsArray.find((location) => location.value === value) &&
                  value}
              </div>
            ) : (
              <div className="flex gap-2">
                <MapPin className="w-5 h-5" />
                {selectedLocation
                  ? selectedLocation
                  : userCity &&
                    userCountry &&
                    containsOnlyLetters(userCity) &&
                    containsOnlyLetters(userCountry)
                  ? `${userCity}, ${userCountry}`
                  : "All locations"}
              </div>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput
              placeholder="Search location..."
              onValueChange={(value) => setSearchTerm(value)}
              value={searchTerm}
            />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {results.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === location.value ? "opacity-100" : "opacity-0"
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
  );
};

export default LocationSelector;
