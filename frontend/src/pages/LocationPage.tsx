import Breadcrumbs from "@/components/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { countries } from "@/lib/config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleCapitalize, handleLinkFormat } from "@/lib/utils";
import DynamicCategorySelector from "@/components/DynamicCategorySelector";
import { useSearchContext } from "@/hooks/use-search-context";
import ExpandedEvents from "@/components/ExpandedEvents";

const LocationPage = () => {
  const path = useLocation().pathname.split("/")[2];
  const search = useSearchContext();
  const [category, setCategory] = useState<string | undefined>(search.category);
  const [subCategory, setSubCategory] = useState<string | undefined>(
    search.subCategory
  );
  const [date, setDate] = useState<Date | undefined>(search.date);

  useEffect(() => {
    search.saveSearchValues(search.location, subCategory, date, category);
  }, [category, subCategory, date]);

  useEffect(() => {
    setDate(search.date);
  }, [search.date]);
  const selectedLocation = countries.find(
    (country) => handleLinkFormat(country.englishName) === path
  );
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
  const [showPreloader, setShowPreloader] = useState(true);
  const styles = showPreloader ? "flex w-full h-full" : "hidden";
  return (
    <div className="bg-background w-full min-h-screen h-full text-black">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-black h-[450px]
       "
        />
        <div className="overflow-hidden h-[450px] w-full relative">
          <div className={styles}>
            <Skeleton className={styles} />
            <img
              src={`${
                import.meta.env.VITE_CLOUDINARY_ASSETS_URL
              }/background_overlay.webp`}
              alt=""
              className="h-full w-full absolute inset-0"
            />
          </div>
          <img
            src={selectedLocation?.hero}
            alt=""
            className="mx-auto max-w-[1100px]  w-full h-full object-cover object-center"
            onLoad={() => setShowPreloader(false)}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          {!showPreloader && (
            <img
              src={`${
                import.meta.env.VITE_CLOUDINARY_ASSETS_URL
              }/background_overlay.webp`}
              alt=""
              className="h-full w-full absolute inset-0 mx-auto max-w-[1100px]"
            />
          )}
          <div className="max-w-[1700px] mx-auto relative">
            <div className="absolute text-white xsm:bottom-[330px] bottom-[340px] lg:left-20 sm:left-10 left-5 max-w-[1700px] mx-auto  ">
              <Breadcrumbs />
            </div>
            <div className="absolute text-white  bottom-40 lg:left-20 sm:left-10 left-5 tracking-wide  max-w-[1700px] mx-auto">
              <h1 className=" sm:text-3xl xsm:text-2xl text-xl font-bold ">
                Explore What's Happening in{" "}
                {selectedLocation?.englishName.startsWith("United")
                  ? "the "
                  : ""}
                <span className="underline underline-offset-4 font-extrabold italic">
                  {selectedLocation?.englishName}
                </span>
              </h1>
              <p className="xsm:max-w-md max-w-xs mt-2">
                Welcome to&nbsp;
                {selectedLocation?.englishName.startsWith("United")
                  ? `the ${selectedLocation?.englishName}`
                  : selectedLocation?.englishName}
                ! Dive into the latest events around you. No matter if you're a
                resident, a new arrival, or simply exploring, there's always
                something exciting to do.
              </p>
            </div>
          </div>
        </div>
      </div>
      <DynamicCategorySelector
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="font-bold text-3xl">
          {subCategory && category ? (
            <>
              {subCategory !== "all"
                ? handleCapitalize(subCategory)
                : `All ${handleCapitalize(category as string)}`}{" "}
              Events
            </>
          ) : category ? (
            <>{handleCapitalize(category)} Events</>
          ) : (
            <>Popular Events</>
          )}
          &nbsp;in{" "}
          {selectedLocation?.englishName.startsWith("United") ? "the " : ""}{" "}
          {selectedLocation?.englishName}
        </h1>
        <div className="mb-10 mt-6">
          <ExpandedEvents events={events} />
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
