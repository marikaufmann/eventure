import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { handleCapitalize, handleLinkFormat } from "@/lib/utils";
import { allCategories } from "@/lib/config";
import { useState } from "react";
import Carousel from "./Carousel";
import ExpandedEvents from "./ExpandedEvents";

const Events = ({
  categoryName,
  selectedCategory,
  events,
}: {
  categoryName: string;
  selectedCategory: string | undefined;
  events: unknown;
}) => {
  const [visibleSubCatCount, setVisibleSubCatCount] = useState(6);

  const handleViewMore = () => {
    setVisibleSubCatCount((prevCount) => prevCount + 6);
  };
  const category = allCategories.find(
    (cat) => cat.category === handleCapitalize(categoryName)
  );

  return (
    <div className="w-full ">
      {selectedCategory === "all" ? (
        <>
          <div>
            <h1 className="font-bold text-3xl pl-6">
              Popular {handleCapitalize(categoryName)} Events
            </h1>
            <div className="mb-4 py-2">
              <Carousel events={events} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {category?.subcategories
              .slice(0, visibleSubCatCount)
              .map((subCat, index) => (
                <div key={index} className=" py-2">
                  <div className="flex justify-between">
                    <h1 className="font-bold text-3xl pl-6">{subCat}</h1>
                    <Link
                      to={`/categories/${categoryName}/${handleLinkFormat(
                        subCat
                      )}`}
                      className=" mt-2 mr-6 text-primary hover:underline underline-offset-4 flex gap-1 items-center"
                    >
                      View all
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <Carousel events={events} />
                </div>
              ))}
            {category && visibleSubCatCount < category.subcategories.length && (
              <div className=" pt-6 flex text-black px-4 justify-center items-center">
                <button
                  onClick={handleViewMore}
                  className="items-center flex gap-3 tracking-wide rounded justify-between transition-all ease-in-out group  hover:bg-primary border-black border-2 py-2 px-10 font-medium"
                >
                 
                  <span className="group-hover:text-black">Show More</span>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-3xl">
            {handleCapitalize(selectedCategory as string)} Events
          </h1>
          <div className="mb-10 mt-8">
            <ExpandedEvents events={events} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Events;
