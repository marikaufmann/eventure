import { allCategories } from "@/lib/config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCloudImageLink, handleLinkFormat } from "@/lib/utils";
const Categories = () => {
  const [loadingState, setLoadingState] = useState(
    allCategories.reduce<Record<string, boolean>>((acc, cat) => {
      acc[cat.category] = true;
      return acc;
    }, {})
  );

  const handleImageLoad = (category: string) => {
    setLoadingState((prev) => {
      return { ...prev, [category]: false };
    });
  };
  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32 pt-5">
      <h1 className="text-4xl font-bold mb-6">All Categories</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {allCategories.map((cat) => {
          return (
            <Link
              to={`/categories/${handleLinkFormat(cat.category)}`}
              key={cat.category}
              className="rounded-sm w-full h-[170px] relative overflow-hidden shadow-xl group/image outline outline-2 "
            >
              {loadingState[cat.category] && (
                <Skeleton className="flex w-full h-full absolute inset-0" />
              )}
              <img
                src={`${
                  import.meta.env.VITE_CLOUDINARY_ASSETS_URL
                }/${getCloudImageLink(cat.category)}.webp`}
                alt="category"
                className="object-cover w-full h-full transition-all ease-in-out group-hover/image:scale-110"
                onLoad={() => handleImageLoad(cat.category)}
              />
              {!loadingState[cat.category] && (
                <div className="bg-black/50 group-hover/image:bg-transparent w-full h-full absolute inset-0 transition-all ease-in-out" />
              )}
              <h1 className="absolute bottom-4 left-4 font-bold text-xl text-white tracking-wide">
                {cat.category}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
