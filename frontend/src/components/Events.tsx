import { ArrowDownUp, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  handleCapitalize,
  handleLinkFormat,
  useFetchCategories,
} from "@/lib/utils";
import { allCategories } from "@/lib/config";
import { useState, useMemo } from "react";
import Carousel from "./Carousel";
import ExpandedEvents from "./ExpandedEvents";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Events = ({
  categoryName,
  selectedCategory,
  location,
  date,
}: {
  categoryName: string;
  selectedCategory: string | undefined;
  location: string;
  date: Date | undefined;
}) => {
  const [visibleSubCatCount, setVisibleSubCatCount] = useState(6);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Sort by");
  const handleViewMore = () => {
    setVisibleSubCatCount((prevCount) => prevCount + 6);
  };
  const category = allCategories.find(
    (cat) => cat.category === handleCapitalize(categoryName)
  );
  const categories = [
    handleCapitalize(categoryName),
    ...(category?.subcategories as string[]),
  ];
  const { results: categoryData, allFetched } = useFetchCategories({
    location,
    categories,
    date:
      date &&
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
    hasTrendingEvents: !!categories,
  });
  const notEmptySubcategories = useMemo(() => {
    return categoryData
      .map((category, index) => ({
        data: category.data,
        catName: categories[index],
        index,
      }))
      .filter((category) => category.data && category.data?.length !== 0);
  }, [categoryData, allFetched]);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="w-full ">
      {selectedCategory === "all" ? (
        <>
          {allFetched && notEmptySubcategories.length === 0 ? (
            <div className="pt-32 px-10">
              <div className="font-medium flex flex-col gap-4 mx-auto items-center justify-center ">
                <h1 className=" laptop:text-2xl text-lg ">
                  We couldn't find any {category?.category} events that match
                  your selected criteria.
                </h1>
                <p className="text-lg laptop:text-xl text-gray-600 ">
                  Please adjust your filters to discover available events.
                </p>
              </div>
            </div>
          ) : notEmptySubcategories &&
            allFetched &&
            notEmptySubcategories.length > 0 ? (
            <div className="flex flex-col ">
              {notEmptySubcategories
                .slice(0, visibleSubCatCount)
                .map((subCat, index) => (
                  <div key={index}>
                    {categoryData[subCat.index]?.data &&
                      categoryData[subCat.index].data?.length !== 0 && (
                        <div className="py-6">
                          <div className="flex justify-between">
                            <h1 className="font-bold text-3xl pl-6">
                              {subCat.catName === category?.category
                                ? `Popular ${category.category} Events`
                                : subCat.catName}
                            </h1>
                            <Link
                              to={`/categories/${categoryName}/${
                                subCat.catName === category?.category
                                  ? "all"
                                  : handleLinkFormat(subCat.catName)
                              }`}
                              className=" mt-2 mr-6 text-primary hover:underline underline-offset-4 flex gap-1 items-center z-10"
                            >
                              View all
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                          <Carousel data={categoryData[subCat.index]} />
                        </div>
                      )}
                  </div>
                ))}
              {category &&
                notEmptySubcategories &&
                visibleSubCatCount < notEmptySubcategories.length && (
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
          ) : (
            <div className="flex flex-col ">
              {categories.slice(0, visibleSubCatCount).map((subCat, index) => (
                <div key={index}>
                  <div className="py-6">
                    <div className="flex justify-between">
                      <h1 className="font-bold text-3xl pl-6">
                        {subCat === category?.category
                          ? `Popular ${category.category} Events`
                          : subCat}
                      </h1>
                      <Link
                        to={`/categories/${categoryName}/${
                          subCat === category?.category
                            ? "all"
                            : handleLinkFormat(subCat)
                        }`}
                        className=" mt-2 mr-6 text-primary hover:underline underline-offset-4 flex gap-1 items-center z-10"
                      >
                        View all
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <Carousel data={categoryData[index]} />
                  </div>
                </div>
              ))}
              {category &&
                categoryData &&
                visibleSubCatCount < categoryData.length && (
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
          )}
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">
              {handleCapitalize(selectedCategory as string)} Events
            </h1>
            <Select onValueChange={handleSelectChange} value={selectedValue}>
              <SelectTrigger className="w-[180px] border border-black ">
                <div className="flex items-center gap-2">
                  <ArrowDownUp className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Sort by">Sort by</SelectItem>
                  <SelectItem value="Upcoming First">Upcoming First</SelectItem>
                  <SelectItem value="Later First">Later First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-10 mt-8">
            <ExpandedEvents
              category={selectedCategory}
              location={location}
              date={date}
              sortBy={selectedValue}
              handleIsFetching={(value: boolean) => setIsFetching(value)}
            />
            {isFetching && (
              <li className="flex justify-center mt-6">
                <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Events;
