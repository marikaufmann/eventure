import DatePicker from "./DatePicker";
import CategorySelector from "./CategorySelector";
import ScrollCategorySelector from "./ScrollCategorySelector";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/hooks/use-search-context";

const DynamicCategorySelector = ({
  category,
  setCategory,
  date,
  setDate,
  subCategory,
  setSubCategory,
}: {
  category: string | undefined;
  setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<undefined | Date>>;
  subCategory: string | undefined;
  setSubCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <div className="mt-[370px] w-full max-w-[1660px] mx-auto relative ">
      <div className="w-full whitespace-nowrap rounded-sm outline outline-2 outline-primary flex sm:flex-row flex-col shadow-2xl shadow-primary/25">
        <div>
          <div className="min-w-[170px] h-full flex items-center justify-center">
            <DatePicker
              selectedDate={date}
              setSelectedDate={setDate}
              styles="sm:outline sm:outline-2 sm:outline-primary text-base bg-transparent h-full rounded-r-none max-sm:rounded-none "
            />
          </div>
        </div>
        {category && category.length > 0 && (
          <div>
            <div className="min-w-fit h-full flex items-center justify-center sm:border-r-2 max-sm:border-t-2 overflow-hidden ">
              <CategorySelector
                selectedCategory={subCategory}
                setSelectedCategory={setSubCategory}
                categoryName={category}
                styles="border-none text-base focus:ring-0"
              />
            </div>
          </div>
        )}
        <ScrollCategorySelector
          selectedCategory={category}
          setSelectedCategory={setCategory}
          setSubCategory={setSubCategory}
        />
      </div>
    </div>
  );
};

export default DynamicCategorySelector;
