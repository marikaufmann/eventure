import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCategories } from "@/lib/config";
import { handleCapitalize } from "@/lib/utils";
import { useEffect } from "react";

const CategorySelector = ({
  categoryName,
  selectedCategory,
  setSelectedCategory,
  styles,
  handleSearch,
}: {
  categoryName: string;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  styles?: string;
}) => {
  const subcategoriesArray = allCategories.find(
    (cat) => cat.category === handleCapitalize(categoryName as string)
  )?.subcategories;
  useEffect(() => {
    if (!subcategoriesArray?.includes(selectedCategory)) {
      setSelectedCategory("all");
    }
    handleSearch();
  }, [handleSearch, selectedCategory, setSelectedCategory, subcategoriesArray]);
  return (
    <div className="flex-1 w-full ">
      <Select onValueChange={setSelectedCategory} value={selectedCategory}>
        <SelectTrigger className={`w-full truncate ${styles} h-full`}>
          <SelectValue
            placeholder={`All ${handleCapitalize(categoryName as string)}`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            All {handleCapitalize(categoryName as string)}
          </SelectItem>
          {subcategoriesArray?.map((cat) => {
            return (
              <div key={cat}>
                <SelectItem value={cat}>{cat}</SelectItem>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
