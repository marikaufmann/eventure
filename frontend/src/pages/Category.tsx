import CategoryHero from "@/components/CategoryHero";
import CategorySearch from "@/components/CategorySearch";
import { useLocation } from "react-router-dom";
import * as apiClient from "@/api-client";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Events from "../components/Events";
import { useSearchContext } from "../hooks/use-search-context";
const Category = () => {
  const search = useSearchContext();
  const { data: userLocation } = useQuery(
    "getUserLocation",
    apiClient.fetchUserLocation
  );
  const [userCountry, setUserCountry] = useState(userLocation?.country?.name);
  const [userCity, setUserCity] = useState(userLocation?.city?.name);
  const [category, setCategory] = useState(
    search.subCategory.length > 0 ? search.subCategory : "all"
  );
  const [location, setLocation] = useState(search.location);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date | string>(search.date);

  useEffect(() => {
    setDate(search.date);
  }, [search.date]);
  useEffect(() => {
    setUserCountry(userLocation?.country?.name);
    setUserCity(userLocation?.city?.name);
    setLocation(
      search.location.length > 0
        ? search.location
        : userCity && userCountry
        ? `${userCity}, ${userCountry}`
        : "All locations"
    );
    setSelectedLocation(
      search.location.length > 0 ? search.location : undefined
    );
  }, [userCity, userCountry, userLocation]);

  const path = useLocation();
  const categoryName = path.pathname.split("/")[2];
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
  const handleSearch = () => {
    search.saveSearchValues(location, category, date);
    setSelectedLocation(location);
  };
  return (
    <div className="bg-background w-full min-h-screen h-full text-black">
      <CategoryHero
        categoryName={categoryName}
        userCountry={userCountry}
        userCity={userCity}
        selectedLocation={selectedLocation}
      />
      <div className="mt-[470px] w-full  pb-4 border-b border-gray-200 max-w-[1700px] mx-auto relative">
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
          handleSearch={handleSearch}
        />
      </div>
      <div className="max-w-[1700px] mx-auto py-8">
        <Events
          categoryName={categoryName}
          selectedCategory={category}
          events={events}
        />
      </div>
    </div>
  );
};

export default Category;
