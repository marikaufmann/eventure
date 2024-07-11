import DatePicker from "./DatePicker";
import CategorySelector from "./CategorySelector";
import ScrollCategorySelector from "./ScrollCategorySelector";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/hooks/use-search-context";

const DynamicCategorySelector = () => {
  const search = useSearchContext();
  const [category, setCategory] = useState(search.category);
  const [subCategory, setSubCategory] = useState(search.subCategory);
  const [date, setDate] = useState<Date | string>(search.date);

  const handleSearch = () => {
    search.saveSearchValues(search.location, subCategory, date, category);
  };
  useEffect(() => {
    setDate(search.date);
  }, [search.date]);
  return (
    <div className="mt-[370px] w-full max-w-[1700px] mx-auto relative">
      <div className="w-full whitespace-nowrap rounded-md border flex shadow-2xl shadow-primary/25">
        <div>
          <div className="min-w-[170px] h-full flex items-center justify-center border-r">
            <DatePicker
              selectedDate={date}
              setSelectedDate={setDate}
              handleSearch={handleSearch}
              styles="border-none text-base bg-transparent h-full"
            />
          </div>
        </div>
        {category.length > 0 && (
          <div>
            <div className="min-w-fit h-full flex items-center justify-center border-r overflow-hidden">
              <CategorySelector
                selectedCategory={subCategory}
                setSelectedCategory={setSubCategory}
                categoryName={category}
                handleSearch={handleSearch}
                styles="border-none text-base focus:ring-0"
              />
            </div>
          </div>
        )}
        <ScrollCategorySelector
          selectedCategory={category}
          setSelectedCategory={setCategory}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default DynamicCategorySelector;
