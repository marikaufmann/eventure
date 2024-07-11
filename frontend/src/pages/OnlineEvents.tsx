import Breadcrumbs from "@/components/Breadcrumbs";
import DynamicCategorySelector from "@/components/DynamicCategorySelector";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const OnlineEvents = () => {
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
            src={`
            ${
              import.meta.env.VITE_CLOUDINARY_ASSETS_URL
            }/Online.webp`}
            alt=""
            className="mx-auto max-w-[1100px]  w-full h-full object-cover object-bottom -scale-x-100"
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
                Discover What's Happening Online
                <span className="underline underline-offset-4 font-extrabold italic"></span>
              </h1>
              <p className="max-w-md mt-2">
                Welcome to the world of online events! Explore the latest online
                events from the comfort of your home. Whether you're a regular
                attendee, a newcomer, or just browsing, there's always something
                engaging and fun to do online.
              </p>
            </div>
          </div>
        </div>
      </div>
      <DynamicCategorySelector />
    </div>
  );
};

export default OnlineEvents;
