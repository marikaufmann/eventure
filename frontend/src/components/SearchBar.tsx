import { AutoComplete, Input, SelectProps } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const SearchBar = () => {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };
  return (
    <>
      <AutoComplete
        className="w-full sm:px-10 px-4 2xl:mt-10 sm:mt-16 mt-8 "
        popupMatchSelectWidth={252}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        size="large"
      >
        <Input.Search
          size="large"
          placeholder="What's happening near you?"
          enterButton={<Search className="text-secondary" />}
          className="shadow-2xl shadow-[#FA0C1A]/25"
        />
      </AutoComplete>
    </>
  );
};

export default SearchBar;
