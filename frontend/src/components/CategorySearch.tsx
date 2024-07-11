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
  handleSearch,
}: {
  userCountry: string;
  userCity: string;
  categoryName: string;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Date | string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | string>>;
  isSubCategoryPage?: boolean;
  handleSearch: () => void;
}) => {
  return (
    <div className="flex gap-6 w-full md:flex-row flex-col ">
      <LocationSelector
        userCountry={userCountry}
        userCity={userCity}
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        handleSearch={handleSearch}
      />
      <CategorySelector
        categoryName={categoryName}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        handleSearch={handleSearch}
      />
      <DatePicker
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        handleSearch={handleSearch}
      />
      {/* <button
        onClick={(e) => handleSearch(e)}
        className="bg-primary flex lg:flex items-center justify-center px-10 rounded-md text-white font-semibold hover:bg-primary/80 w-full md:max-w-[170px] max-md:h-[40px]"
      >
        Find Events
      </button> */}
    </div>
  );
};

export default CategorySearch;
