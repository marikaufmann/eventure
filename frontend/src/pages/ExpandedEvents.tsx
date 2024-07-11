import { Link, useLocation } from "react-router-dom";
import { handleCapitalize } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import LocationSelector from "@/components/LocationSelector";
import DatePicker from "@/components/DatePicker";
import { useSearchContext } from "@/hooks/use-search-context";

const ExpandedEvents = () => {
  const path = useLocation();
  const categoryName = path.pathname.split("/")[3];
  const search = useSearchContext();
  const [location, setLocation] = useState(search.location);
  const [date, setDate] = useState<Date | string>(search.date);

  const handleSearch = () => {
    search.saveSearchValues(location, search.subCategory, date);
  };
  useEffect(() => {
    setDate(search.date);
  }, [search.date]);
  const events = [
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Zach Bryan with Jason Isbell & the 400 Unit",
      date: "Jun 26",
      venue: "Gillette Stadium",
      price: "195",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Lana Del Rey",
      date: "Jun 20",
      venue: "Fenway Park",
      price: "135",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Nicki Minaj Presents: Pink Friday 2 World Tour",
      date: "Sep 13",
      venue: "Rocket Mortgage FieldHouse",
      price: "73",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Zach Bryan with Jason Isbell & the 400 Unit",
      date: "Jun 26",
      venue: "Gillette Stadium",
      price: "195",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Lana Del Rey",
      date: "Jun 20",
      venue: "Fenway Park",
      price: "135",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Nicki Minaj Presents: Pink Friday 2 World Tour",
      date: "Sep 13",
      venue: "Rocket Mortgage FieldHouse",
      price: "73",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Lana Del Rey",
      date: "Jun 20",
      venue: "Fenway Park",
      price: "135",
    },
    {
      image:
        "https://res.cloudinary.com/dxsxtx313/image/upload/v1717874419/eventure/Sports.webp",
      title: "Nicki Minaj Presents: Pink Friday 2 World Tour",
      date: "Sep 13",
      venue: "Rocket Mortgage FieldHouse",
      price: "73",
    },
  ];
  const [loadingState, setLoadingState] = useState(
    events.reduce((acc, event) => {
      acc[event.title] = true;
      return acc;
    }, {})
  );

  const handleImageLoad = (title) => {
    setLoadingState((prev) => {
      return { ...prev, [title]: false };
    });
  };
  const lastPostRef = useRef(null);
  const isSubCategoryPage = path.pathname.match(/^\/categories\/[^/]+\/[^/]+$/);

  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32">
      <div className="-mt-1">
        <Breadcrumbs />
      </div>
      <h1 className="text-4xl font-bold my-6">
        {handleCapitalize(categoryName)}
      </h1>

      <div className="flex gap-6 w-full md:flex-row flex-col mb-8">
        <LocationSelector
          selectedLocation={location}
          setSelectedLocation={setLocation}
          handleSearch={handleSearch}
        />

        <DatePicker
          selectedDate={date}
          setSelectedDate={setDate}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-4 border-t border-gray-100">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 hover:shadow-lg shadow-sm rounded-lg"
          >
            <div className="flex gap-4 py-4">
              {loadingState[event.title] && (
                <div className="flex gap-4 ">
                  <Skeleton className="w-[170px] h-[100px] rounded-lg" />
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-7 w-[350px]" />
                      <Skeleton className="h-6 w-[200px]" />
                    </div>
                    <Skeleton className="h-5 w-[100px]" />
                  </div>
                </div>
              )}
              <div
                className={`${
                  loadingState[event.title] ? "invisible" : "visible"
                } w-[170px] max-md:w-[120px] h-full rounded-lg`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full rounded-lg"
                  onLoad={() => handleImageLoad(event.title)}
                  style={{
                    display: loadingState[event.title] ? "none" : "block",
                  }}
                />
              </div>
              <div
                className={`${
                  loadingState[event.title] ? "hidden" : "block"
                } flex flex-col justify-between max-sm:w-[200px] max-md:w-[300px]  `}
              >
                <div className="flex flex-col">
                  <p className="font-medium text-lg truncate">{event.title}</p>
                  <p className="text-black/50 truncate">
                    {event.date} · {event.venue}
                  </p>
                </div>
                <p>From {event.price}</p>
              </div>
            </div>
            <div className={` flex flex-col justify-between py-4 gap-4`}>
              <Link
                to={`/`}
                className="bg-black font-semibold text-white flex justify-center items-center h-[40px] w-[120px] rounded-lg  hover:shadow-black/40 hover:shadow max-md:text-sm max-md:w-[100px]"
              >
                View Event
              </Link>
            </div>
          </div>
        ))}
      </div>
      {true && (
        <li className="flex justify-center mt-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
        </li>
      )}
    </div>
  );
};

export default ExpandedEvents;
