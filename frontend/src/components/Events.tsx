import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { handleCapitalize, handleLinkFormat } from "@/lib/utils";
import { allCategories } from "@/lib/config";
import { useState } from "react";
import Carousel from "./Carousel";

const Events = ({
  categoryName,
  selectedCategory,
  events,
}: {
  categoryName: string;
  selectedCategory: string;
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
    <div className="w-full">
      <h1 className="font-bold text-3xl">
        Popular {handleCapitalize(categoryName)} Events
      </h1>
      <div className="mb-10 p-2">
        <Carousel events={events} />
      </div>
      {selectedCategory === "all" ? (
        <div className="flex flex-col gap-6">
          {category?.subcategories
            .slice(0, visibleSubCatCount)
            .map((subCat, index) => (
              <div key={index} className=" p-2">
                <div className="flex justify-between">
                  <h1 className="font-bold text-3xl">{subCat}</h1>
                  <Link
                    to={`/categories/${categoryName}/${handleLinkFormat(
                      subCat
                    )}`}
                    className=" mt-2 mr-2 text-primary hover:underline underline-offset-4 flex gap-1 items-center"
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
                className="items-center flex gap-3 tracking-wide rounded justify-between transition-all ease-in-out group hover:border-primary border-black border-2 py-2 px-10 font-medium"
              >
                {/* <div className="rounded-full  ease-in-out ">
                  <ChevronDown className="w-5 h-5 group-hover:text-primary text-black" />
                </div> */}
                <span className="group-hover:text-primary">Show More</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto"></div>
      )}
    </div>
  );
};
export default Events;
