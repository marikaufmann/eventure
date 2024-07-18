import { useSearchContext } from "@/hooks/use-search-context";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import * as apiClient from "@/api-client";
import { Check, PencilLine } from "lucide-react";
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
import { countriesObj } from "@/lib/config";
import Fuse from "fuse.js";
import TrendingEvents from "@/components/TrendingEvents";
import CategoriesSlider from "./CategoriesSlider";
import CategorySlider from "./CategorySlider";
import { Link } from "react-router-dom";
const Home = () => {
  const search = useSearchContext();
  const { data: userLocation } = useQuery(
    "getUserLocation",
    apiClient.fetchUserLocation
  );

  const [userCountry, setUserCountry] = useState<string | undefined>(undefined);
  const [userCity, setUserCity] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string>(search.location);

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
    search.saveSearchValues(
      location,
      search.category,
      search.date,
      search.category
    );
  }, [location]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const locationsArray = useMemo(
    () =>
      Object.entries(countriesObj).flatMap(([country, cities]) =>
        Object.keys(cities).map((city) => ({
          value: `${city}, ${country}`,
          label: `${city}, ${country}`,
        }))
      ),
    []
  );
  const fuse = new Fuse(locationsArray, { keys: ["label"], threshold: 0.3 });

  const filteredLocations = useMemo(() => {
    if (!userCountry) {
      return locationsArray;
    }
    const userCountryLocations = locationsArray.filter(
      (location) => location.label.split(", ")[1] === userCountry
    );
    const otherLocations = locationsArray.filter(
      (location) => location.label.split(", ")[1] !== userCountry
    );
    return [...userCountryLocations, ...otherLocations];
  }, [locationsArray, userCountry]);

  const results = searchTerm
    ? fuse
        .search(searchTerm)
        .slice(0, 8)
        .map(({ item }) => item)
    : filteredLocations.slice(0, 8);

  useEffect(() => {
    console.log("pop");
    setLocation(value);
  }, [value, setLocation]);

  const events = [
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Zach Bryan with Jason Isbell & the 400 Unit",
      date: "Jun 26",
      venue: "Gillette Stadium",
      price: "195",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Lana Del Rey",
      date: "Jun 20",
      venue: "Fenway Park",
      price: "135",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Nicki Minaj Presents: Pink Friday 2 World Tour",
      date: "Sep 13",
      venue: "Rocket Mortgage FieldHouse",
      price: "73",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Zach Bryan with Jason Isbell & the 400 Unit",
      date: "Jun 26",
      venue: "Gillette Stadium",
      price: "195",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Lana Del Rey",
      date: "Jun 20",
      venue: "Fenway Park",
      price: "135",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Nicki Minaj Presents: Pink Friday 2 World Tour",
      date: "Sep 13",
      venue: "Rocket Mortgage FieldHouse",
      price: "73",
    },
  ];
  return (
    <div className="bg-background w-full min-h-screen h-full text-black">
      <div className="bg-[#070606] py-10">
        <h1 className="text-2xl text-white mb-10 text-center font-medium tracking-widest">
          TRENDING EVENTS
        </h1>
        <div className="px-2">
          <TrendingEvents events={events} />
        </div>
      </div>
      <div className="flex items-center md:py-8 xsm:py-6 py-8 justify-center">
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
                    {/* <MapPin className="w-4 h-4" /> */}
                    {location
                      ? location
                      : userCity &&
                        userCountry &&
                        containsOnlyLetters(userCity) &&
                        containsOnlyLetters(userCountry)
                      ? `${userCity}, ${userCountry}`
                      : "All locations"}
                  </div>
                )}
                <PencilLine className="ml-2 sm:h-6 sm:w-6 w-4 h-4 shrink-0 opacity-70" />
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
        <div className="px-2">
          <CategorySlider events={events} />
        </div>
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
        <div className="px-2">
          <CategorySlider events={events} redTheme={true} />
        </div>
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
        <div className="px-2">
          <CategorySlider events={events} />
        </div>
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
        <div className="px-2">
          <CategorySlider events={events} grayTheme={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
