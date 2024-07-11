import Breadcrumbs from "@/components/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { countries } from "@/lib/config";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { handleLinkFormat } from "@/lib/utils";
import NoEventsFound from "@/components/NoEventsFound";
import DynamicCategorySelector from "@/components/DynamicCategorySelector";

const Location = () => {
  const path = useLocation().pathname.split("/")[2];
  const location = countries.find(
    (country) => handleLinkFormat(country.englishName) === path
  );

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
            src={location?.hero}
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
            <div className="absolute text-white bottom-[330px] lg:left-20 sm:left-10 left-5 max-w-[1700px] mx-auto  ">
              <Breadcrumbs />
            </div>
            <div className="absolute text-white bottom-40 lg:left-20 sm:left-10 left-5 tracking-wide  max-w-[1700px] mx-auto">
              <h1 className=" sm:text-3xl text-2xl font-bold ">
                Explore What's Happening in{" "}
                {location?.englishName.startsWith("United") ? "the " : ""}
                <span className="underline underline-offset-4 font-extrabold italic">
                  {location?.englishName}
                </span>
              </h1>
              <p className="max-w-md mt-2">
                Welcome to&nbsp;
                {location?.englishName.startsWith("United")
                  ? `the ${location?.englishName}`
                  : location?.englishName}
                ! Dive into the latest events around you. No matter if you're a
                resident, a new arrival, or simply exploring, there's always
                something exciting to do.
              </p>
            </div>
          </div>
        </div>
      </div>
      <DynamicCategorySelector />
      <NoEventsFound />
    </div>
  );
};

export default Location;
