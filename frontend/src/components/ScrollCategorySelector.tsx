import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { allCategories } from "@/lib/config";
import { useEffect, useRef } from "react";

type Category = { category: string; subcategories: string[] };

const ScrollCategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  handleSearch,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}) => {
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory === category.category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category.category);
    }
  };

  useEffect(() => {
    const element = categoryRefs.current[selectedCategory];
    if (element) {
      setTimeout(() => {
        element.focus();
      }, 100);
    }
  }, [selectedCategory]);

  return (
    <ScrollArea className="h-24">
      <div className="flex w-max space-x-4 p-4">
        {allCategories.map((category) => (
          <button
            ref={(el) => (categoryRefs.current[category.category] = el)}
            onClick={() => {
              handleCategorySelect(category);
              handleSearch();
            }}
            key={category.category}
            className={` ${
              selectedCategory === category.category
                ? "bg-primary/50 shadow-lg shadow-primary/25"
                : ""
            } overflow-hidden rounded-xl p-4 text-black font-medium bg-primary/20 hover:bg-primary/50 shadow-sm hover:shadow-xl shadow-primary/25 focus:outline-none`}
          >
            {category.category}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollCategorySelector;
