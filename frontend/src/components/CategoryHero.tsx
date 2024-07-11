import { Skeleton } from "@/components/ui/skeleton";

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { handleCapitalize } from "../lib/utils";
import { MapPin } from "lucide-react";
const CategoryHero = ({
  categoryName,
  userCountry,
  userCity,
  selectedLocation,
}: {
  categoryName: string;
  userCountry: string;
  userCity: string;
  selectedLocation: string | undefined;
}) => {
  const [showPreloader, setShowPreloader] = useState(true);

  const getCloudImageLink = (string: string) => {
    const slashArray = string.split("+%2F+");
    const ampersandArray = string.split("+%26+");
    const spaceArray = string.split("%20");
    let link = "";
    if (slashArray.length > 1) {
      link = slashArray[2]
        ? `${slashArray[0].charAt(0).toUpperCase() + slashArray[0].slice(1)}_${
            slashArray[1].charAt(0).toUpperCase() + slashArray[1].slice(1)
          }_${slashArray[2].charAt(0).toUpperCase() + slashArray[2].slice(1)}`
        : `${slashArray[0].charAt(0).toUpperCase() + slashArray[0].slice(1)}_${
            slashArray[1].charAt(0).toUpperCase() + slashArray[1].slice(1)
          }`;
    } else if (ampersandArray.length > 1) {
      link = ampersandArray[2]
        ? `${ampersandArray[0]
            .charAt(0)
            .toUpperCase()} ${ampersandArray[0].slice(1)}_${ampersandArray[1]
            .charAt(0)
            .toUpperCase()} ${ampersandArray[1].slice(1)}_${ampersandArray[2]
            .charAt(0)
            .toUpperCase()}_${ampersandArray[2].slice(1)}`
        : `${
            ampersandArray[0].charAt(0).toUpperCase() +
            ampersandArray[0].slice(1)
          }_${
            ampersandArray[1].charAt(0).toUpperCase() +
            ampersandArray[1].slice(1)
          }`;
    } else if (spaceArray.length > 1) {
      link = spaceArray[2]
        ? `${spaceArray[0].charAt(0).toUpperCase() + spaceArray[0].slice(1)} ${
            spaceArray[1].charAt(0).toUpperCase() + spaceArray[1].slice(1)
          } ${spaceArray[2].charAt(0).toUpperCase() + spaceArray[2].slice(1)}`
        : `${spaceArray[0].charAt(0).toUpperCase() + spaceArray[0].slice(1)} ${
            spaceArray[1].charAt(0).toUpperCase() + spaceArray[1].slice(1)
          }`;
    } else {
      link = string;
    }
    return link;
  };

  const styles = showPreloader ? "flex w-full h-full" : "hidden";

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-black h-[550px]
       "
      />
      <div className="overflow-hidden h-[550px] w-full relative">
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
          src={`${
            import.meta.env.VITE_CLOUDINARY_ASSETS_URL
          }/${getCloudImageLink(categoryName)}.webp`}
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
          <div className="absolute text-white bottom-[430px] lg:left-20 sm:left-10 left-6 max-w-[1700px] mx-auto  ">
            <Breadcrumbs />
          </div>
          <div className="absolute text-white bottom-20 lg:left-20 sm:left-10 left-6 tracking-wide border-b border-gray-500 max-w-[1700px] mx-auto">
            <h1 className=" text-4xl font-bold ">
              {handleCapitalize(categoryName)}
            </h1>
            <p className="max-w-[300px] text-gray-300 my-4">
              Stay updated on your favorite {handleCapitalize(categoryName)}{" "}
              events. All the info you need, right here.
            </p>
          </div>
          <div className="absolute text-gray-200 bottom-10 lg:left-20 sm:left-10 left-6 tracking-wide  max-w-[1700px] mx-auto flex gap-3 text-lg">
            <MapPin />
            Events near{" "}
            {selectedLocation && selectedLocation !== "All locations"
              ? selectedLocation
              : userCity && userCountry
              ? `${userCity}, ${userCountry}`
              : "you"}
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
