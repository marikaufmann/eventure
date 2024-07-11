import { useAppContext } from "@/hooks/use-app-context";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const SavedEvents = () => {
  const { isLoggedIn, setShowLoginForm } = useAppContext();
  const [selectedValue, setSelectedValue] = useState("Show all");
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
  ];
  const [eventsArray, setEventsArray] = useState(events);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      setShowLoginForm(true);
    }
  }, [isLoggedIn]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    selectedValue === "Show all"
      ? setEventsArray(events)
      : selectedValue === "Future events"
      ? setEventsArray(futureEvents)
      : setEventsArray(pastEvents);
  }, [selectedValue]);
  const pastEvents = events.filter((event) => event.date === "Jun 20");
  const futureEvents = events.filter((event) => event.date === "Sep 13");
  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32 pt-5">
      <div className="">
        <h1 className="text-4xl font-bold">Saved events</h1>
      </div>

      <div className="flex flex-end md:self-end max-md:mt-4 pr-8">
        <Select onValueChange={handleSelectChange} value={selectedValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Show all" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Show all">Show all</SelectItem>
              <SelectItem value="Future events">Future events</SelectItem>
              <SelectItem value="Past events">Past events</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="md:mt-6 mt-4 flex flex-col gap-6">
        {eventsArray.map((event, index) => (
          <>
            {event.title === "Lana Del Rey" ? (
              <div
                key={index}
                className="flex justify-between items-center p-4   shadow-sm rounded-lg gap-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/10" />
                <img
                  src={event.image}
                  alt=""
                  className="h-full md:w-[240px] w-[120px] rounded-lg"
                />
                <div className="flex flex-col justify-between flex-1 truncate">
                  <div className="flex flex-col">
                    <p className="font-medium text-lg truncate">
                      {event.title}
                    </p>
                    <p className="text-black/50 truncate">
                      {event.date} · {event.venue}
                    </p>
                  </div>
                  <p>From {event.price}</p>
                </div>
                <div className="hover:shadow-xl hover:shadow-black rounded-full p-4 group">
                  <Heart className="fill-primary text-primary hover:text-black hover:fill-transparent" />
                </div>
              </div>
            ) : (
              <Link
                to="/"
                key={index}
                className="flex justify-between items-center p-4  hover:shadow-lg shadow-sm rounded-lg gap-8"
              >
                <div>
                  <img
                    src={event.image}
                    alt=""
                    className="h-full md:w-[240px] w-[120px] rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 truncate">
                  <div className="flex flex-col">
                    <p className="font-medium text-lg truncate">
                      {event.title}
                    </p>
                    <p className="text-black/50 truncate">
                      {event.date} · {event.venue}
                    </p>
                  </div>
                  <p>From {event.price}</p>
                </div>
                <div className="hover:shadow hover:shadow-black/30 rounded-full p-4 group">
                  <Heart className="fill-primary text-primary group-hover:text-black group-hover:fill-transparent" />
                </div>
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default SavedEvents;
