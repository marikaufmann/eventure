import { countriesObj } from "@/lib/config";

import DatePicker from "./DatePicker";
import LocationSelector from "./LocationSelector";
import CategorySelector from "./CategorySelector";

const countriesArray = [];
Object.keys(countriesObj).forEach((country) => {
  Object.keys(countriesObj[country]).forEach((city) => {
    countriesArray.push({
      value: { country, city },
      label: `${city}, ${country}`,
    });
  });
});

const CategorySearch = ({
  userCountry,
  userCity,
  categoryName,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
}: {
  userCountry: string | undefined;
  userCity: string | undefined;
  categoryName: string;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isSubCategoryPage?: boolean;
}) => {
  return (
    <div className="flex gap-6 w-full md:flex-row flex-col ">
      <LocationSelector
        userCountry={userCountry}
        userCity={userCity}
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
      <CategorySelector
        categoryName={categoryName}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        styles="shadow"
      />
      <DatePicker
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CategorySearch;
