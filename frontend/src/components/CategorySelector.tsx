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
}: {
  categoryName: string;
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  styles?: string;
}) => {
  const subcategoriesArray = allCategories.find(
    (cat) => cat.category === handleCapitalize(categoryName as string)
  )?.subcategories;
  useEffect(() => {
    if (!subcategoriesArray?.includes(selectedCategory as string)) {
      setSelectedCategory("all");
    }
  }, [selectedCategory, setSelectedCategory, subcategoriesArray]);
  return (
    <div className="flex-1 w-full">
      <Select onValueChange={setSelectedCategory} value={selectedCategory} >
        <SelectTrigger className={`w-full truncate ${styles} h-full border-black border  rounded-sm text-base `}>
          <SelectValue 
            placeholder={`All ${handleCapitalize(categoryName as string)}`}
          />
        </SelectTrigger>
        <SelectContent className=" ">
          <SelectItem value="all" className="text-base">
            All {handleCapitalize(categoryName as string)}
          </SelectItem>
          {subcategoriesArray?.map((cat) => {
            return (
              <div key={cat} className="">
                <SelectItem className="text-base" value={cat}>{cat}</SelectItem>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
