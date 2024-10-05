import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Skeleton } from "./ui/skeleton";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import { FetchedEventType } from "../../../backend/src/shared/types";
import { UseQueryResult } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import getSymbolFromCurrency from "currency-symbol-map";

const Slide = ({
  data,
  setIsOpen,
}: {
  data: UseQueryResult<FetchedEventType[]>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const events = data?.data;
  const isFetching = data?.isFetching;
  const { width } = useWindowDimentions();
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );
  useEffect(() => {
    if (events) {
      setLoadingState(
        events.reduce<Record<string, boolean>>(
          (acc, event: FetchedEventType) => {
            acc[event.name] = true;
            return acc;
          },
          {}
        )
      );
    }
  }, [events]);

  const handleImageLoad = (title: string) => {
    setLoadingState((prev) => {
      return { ...prev, [title]: false };
    });
  };

  return (
    <Swiper
      cssMode={true}
      spaceBetween={20}
      slidesPerView={width > 1300 ? 4 : width > 900 ? 3 : width > 450 ? 2 : 1}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation, Mousewheel, Keyboard]}
      className="flex gap-2 w-full h-[300px] px-6 "
    >
      {isFetching || !events
        ? [...Array(6)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="group hover:bg-black/5 h-[270px] rounded-sm overflow-hidden border-2 border-black"
            >
              <div className="h-full w-full relative rounded-sm">
                <div className="absolute inset-0 flex flex-col space-y-3">
                  <Skeleton className="h-[140px] w-full rounded-none" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        : events.slice(0, 6).map((event: FetchedEventType, index: number) => (
            <SwiperSlide
              key={index}
              className="group hover:bg-black/5 h-[270px] rounded-sm overflow-hidden border-2 border-black"
            >
              <div className="h-full w-full relative rounded-sm">
                <div
                  className={`absolute inset-0 flex flex-col space-y-3 ${
                    loadingState[event.name] ? "" : "hidden"
                  }`}
                >
                  <Skeleton className="h-[140px] w-full rounded-none" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <div
                  className={`${
                    loadingState[event.name] ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-500`}
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
                  <Link
                    to={`/event/${encodeURIComponent(
                      event.location
                    )}/${encodeURIComponent(event.id)}`}
                  >
                    <div className="h-[150px] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover  group-hover:scale-110 transition-all ease-in-out"
                        loading="lazy"
                        onLoad={() => handleImageLoad(event.name)}
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/event/${encodeURIComponent(
                      event.location
                    )}/${encodeURIComponent(event.id)}`}
                    className="gap-2 p-2 flex flex-col justify-between rounded-b-lg "
                  >
                    <Helmet>
                      <title>{event.name}</title>
                      <meta property="og:title" content={event.name} />
                      <meta property="og:type" content="website" />
                      <meta
                        property="og:url"
                        content={`${import.meta.env.VITE_FRONTEND_URI}/${
                          event.id
                        }`}
                      />
                      <meta property="og:image" content={event.image} />
                      <meta
                        property="og:description"
                        content={event.description}
                      />
                      <meta property="og:site_name" content="Eventure" />
                      <meta name="twitter:card" content={event.image} />
                      <meta name="twitter:title" content={event.name} />
                      <meta
                        name="twitter:description"
                        content={event.description}
                      />
                      <meta name="twitter:image" content={event.image} />
                    </Helmet>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold truncate">
                        {event.name}
                      </h3>
                      <p className="text-gray-500 truncate">
                        {formatDate(event.dates.start) === "Date TBA"
                          ? formatDate(event.dates.start)
                          : format(formatDate(event.dates.start), "MMM d")}
                        ·{" "}
                        {event.venues[0]?.length > 0
                          ? event.venues[0]
                          : event.location.split(", ")[0]}
                      </p>
                    </div>
                    <p className="text-gray-800">
                      {event.priceRange.min === null &&
                      event.priceRange.max === null
                        ? "Pricing TBD"
                        : `From ${getSymbolFromCurrency(
                            event.priceRange.currency
                          )}${event.priceRange.min} `}
                    </p>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default Slide;
