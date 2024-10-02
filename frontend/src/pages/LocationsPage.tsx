import { useState, useEffect } from "react";
import { countries } from "@/lib/config";
import { handleLinkFormat } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Locations = () => {
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32 pt-5">
      <h1 className="text-4xl font-bold mb-6">All Countries</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-xl">
        {countries.map((country, index) => (
          <Link
            key={country.englishName}
            to={`/locations/${handleLinkFormat(country.englishName)}`}
            className={`flex justify-between items-center hover:bg-primary/40 pl-2 pr-10 py-6 border-b-2 border-r-2 border-black group/country  transition-all ease-in-out ${
              (index + 1) % columns === 0 ? "border-r-0" : ""
            } ${
              index >=
              countries.length - (countries.length % columns || columns)
                ? "border-b-0"
                : ""
            }`}
          >
            <div className="flex gap-4 items-center group-hover/country:scale-[105%] group-hover/country:text-primary">
              <img
                src={country.icon}
                alt={country.name}
                className={`rounded-sm object-cover w-[55px] h-[35px] ${
                  country.name === "United Arab Emirates" && "object-left"
                }`}
              />
              {country.name}
            </div>
            <ArrowRight className="text-black group-hover/country:scale-[110%] group-hover/country:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
