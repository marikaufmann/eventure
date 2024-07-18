import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Skeleton } from "./ui/skeleton";
import { Heart, SquareArrowOutUpRight } from "lucide-react";

const TrendingSlide = ({
  events,
  setIsOpen,
}: {
  events: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { width } = useWindowDimentions();
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

  return (
    <Swiper
      cssMode={true}
      spaceBetween={20}
      slidesPerView={width > 900 ? 3 : width > 500 ? 2 : 1}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation, Mousewheel, Keyboard]}
      className="flex gap-2 h-[390px] w-full max-w-[1700px] mx-auto px-10 trending-swiper"
    >
      {events.map((event, index) => (
        <SwiperSlide
          key={index}
          className="group rounded-sm  h-[350px] border-white/50 border  overflow-hidden hover:bg-white/5"
        >
          <div className="h-full w-full relative  ">
            <div
              className={`${
                loadingState[event.title]
                  ? "absolute inset-0 flex flex-col space-y-3"
                  : "hidden"
              }`}
            >
              <Skeleton className="rounded-none  h-[200px] w-full " />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full rounded-sm " />
                <Skeleton className="h-5 w-[250px] rounded-sm" />
                <Skeleton className="h-5 w-[100px] rounded-sm" />
              </div>
            </div>
            <div
              className={`${
                loadingState[event.title] ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500 `}
            >
              <div className="absolute top-2 right-2 z-[30] transition-all ease-in-out">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-full hover:bg-white bg-white/70"
                  >
                    <SquareArrowOutUpRight className="text-black w-5 h-5 hover:text-primary" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white bg-white/70 hover:fill-primary">
                    <Heart className="w-5 h-5 text-black hover:fill-primary hover:text-primary" />
                  </button>
                </div>
              </div>
              <Link to="/">
                <div className="h-[200px] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-t-sm group-hover:scale-110 transition-all ease-in-out"
                    loading="lazy"
                    onLoad={() => handleImageLoad(event.title)}
                  />
                </div>
              </Link>
              <Link
                to="/"
                className="gap-2 p-2 flex flex-col justify-between rounded-b-lg  text-white"
              >
                <Helmet>
                  <title>{event.title}</title>
                  <meta property="og:title" content={event.title} />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={event.url} />
                  <meta property="og:image" content={event.image} />
                  <meta property="og:description" content={event.description} />
                  <meta property="og:site_name" content="Your Website Name" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:title" content={event.title} />
                  <meta
                    name="twitter:description"
                    content={event.description}
                  />
                  <meta name="twitter:image" content={event.image} />
                </Helmet>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold truncate">
                    {event.title}
                  </h3>
                  <p className=" truncate">
                    {event.date} · {event.venue}
                  </p>
                </div>
                <p className="">From ${event.price}</p>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingSlide;
