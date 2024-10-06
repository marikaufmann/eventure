import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Skeleton } from "./ui/skeleton";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import { FetchedEventType } from "../../../backend/src/shared/types";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "@/api-client";
import { format } from "date-fns";
import getSymbolFromCurrency from "currency-symbol-map";
import { formatDate } from "@/lib/utils";
import Tooltip from "./Tooltip";

const TrendingSlide = ({
  location,
  setIsOpen,
  setIsFetchedEventsForUsersLocation,
  setIsFetchedEventsForUsersCapitalLocation,
  setIsFetchedEventsForManualUsersLocation,
  setIsFetchedEventsForManualUsersCapitalLocation,
  setHasTrendingEvents,
  locationFetchStatus,
  setCurrentEventUrl,
  setCurrentEventTitle,
  setCurrentEventImage,
}: {
  location: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetchedEventsForUsersLocation: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setIsFetchedEventsForUsersCapitalLocation: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setIsFetchedEventsForManualUsersLocation: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setIsFetchedEventsForManualUsersCapitalLocation: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setHasTrendingEvents: React.Dispatch<React.SetStateAction<boolean>>;
  locationFetchStatus: string;
  setCurrentEventUrl: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEventTitle: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEventImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { width } = useWindowDimentions();
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );

  const {
    data: trendingEvents,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["trendingEvents", location],
    queryFn: () => apiClient.fetchEvents({ location, isTopEvents: true }),
    enabled: location !== "",
  });

  useEffect(() => {
    if (isError) {
      setHasTrendingEvents(false);
      if (locationFetchStatus === "initial") {
        setIsFetchedEventsForUsersLocation(false);
      } else if (
        locationFetchStatus !== "manualInitial" &&
        locationFetchStatus !== "manualCapital"
      ) {
        setIsFetchedEventsForUsersCapitalLocation(false);
      } else if (locationFetchStatus === "manualInitial") {
        setIsFetchedEventsForManualUsersLocation(false);
      } else if (locationFetchStatus === "manualCapital") {
        setIsFetchedEventsForManualUsersCapitalLocation(false);
      }
    } else if (isSuccess) {
      setHasTrendingEvents(trendingEvents.length > 0);
      if (locationFetchStatus === "initial") {
        setIsFetchedEventsForUsersLocation(trendingEvents.length > 0);
      } else if (
        locationFetchStatus !== "manualInitial" &&
        locationFetchStatus !== "manualCapital"
      ) {
        setIsFetchedEventsForUsersCapitalLocation(trendingEvents.length > 0);
      } else if (locationFetchStatus === "manualInitial") {
        setIsFetchedEventsForManualUsersLocation(trendingEvents.length > 0);
      } else if (locationFetchStatus === "manualCapital") {
        setIsFetchedEventsForManualUsersCapitalLocation(
          trendingEvents.length > 0
        );
      }
      const initialLoadingState = trendingEvents.reduce(
        (acc: Record<string, boolean>, event: FetchedEventType) => {
          acc[event.name] = true;
          return acc;
        },
        {}
      );
      setLoadingState(initialLoadingState);
    }
  }, [
    isError,
    isSuccess,
    locationFetchStatus,
    setHasTrendingEvents,
    setIsFetchedEventsForUsersLocation,
    setIsFetchedEventsForUsersCapitalLocation,
  ]);

  const handleImageLoad = (name: string) => {
    setLoadingState((prev) => ({
      ...prev,
      [name]: false,
    }));
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
      {isFetching || !trendingEvents
        ? [...Array(8)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="group rounded-sm h-[350px] border-white/50 border overflow-hidden hover:bg-white/5"
            >
              <div className="h-full w-full relative">
                <div className="absolute inset-0 flex flex-col space-y-3">
                  <Skeleton className="rounded-none h-[200px] w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full rounded-sm" />
                    <Skeleton className="h-5 w-[250px] rounded-sm" />
                    <Skeleton className="h-5 w-[100px] rounded-sm" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        : trendingEvents
            .slice(0, 8)
            .map((event: FetchedEventType, index: number) => (
              <SwiperSlide
                key={index}
                className="group rounded-sm h-[350px] border-white/50 border  hover:bg-white/5"
              >
                <div className="h-full w-full relative">
                  {loadingState[event.name] && (
                    <div className="absolute inset-0 flex flex-col space-y-3">
                      <Skeleton className="rounded-none h-[200px] w-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-full rounded-sm" />
                        <Skeleton className="h-5 w-[250px] rounded-sm" />
                        <Skeleton className="h-5 w-[100px] rounded-sm" />
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="absolute top-2 right-2 z-[30] transition-all ease-in-out">
                      <div className="flex gap-2">
                        <Tooltip text="Share event">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setCurrentEventUrl(
                                `${
                                  import.meta.env.VITE_FRONTEND_URI
                                }/event/${encodeURIComponent(
                                  event.location
                                )}/${encodeURIComponent(event.id)}`
                              );
                              setCurrentEventImage(event.image);
                              setCurrentEventTitle(event.name);
                            }}
                            className="p-2 rounded-full hover:bg-white bg-white/70"
                          >
                            <SquareArrowOutUpRight className="text-black w-5 h-5 hover:text-primary" />
                          </button>
                        </Tooltip>
                        <Tooltip text="Save event">
                          <button className="p-2 rounded-full hover:bg-white bg-white/70 hover:fill-primary">
                            <Heart className="w-5 h-5 text-black hover:fill-primary hover:text-primary" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <Link
                      to={`/event/${encodeURIComponent(
                        event.location
                      )}/${encodeURIComponent(event.id)}`}
                    >
                      <div className="h-[200px] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover rounded-t-sm group-hover:scale-110 transition-all ease-in-out"
                          loading="lazy"
                          onLoad={() => handleImageLoad(event.name)}
                        />
                      </div>
                    </Link>
                    <Link
                      to={`/event/${encodeURIComponent(
                        event.location
                      )}/${encodeURIComponent(event.id)}`}
                      className="gap-2 p-2 flex flex-col justify-between rounded-b-lg text-white"
                    >
                      <Helmet>
                        <title>{event.name}</title>
                        <meta property="og:title" content={event.name} />
                        <meta property="og:type" content="website" />
                        <meta
                          property="og:url"
                          content={`${
                            import.meta.env.VITE_FRONTEND_URI
                          }/event/${encodeURIComponent(
                            event.location
                          )}/${encodeURIComponent(event.id)}`}
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
                        <p className="truncate">
                          {formatDate(event.dates.start) !== "Date TBA"
                            ? format(formatDate(event.dates.start), "MMM d")
                            : formatDate(event.dates.start)}
                          ·{" "}
                          {event.venues[0]?.length > 0
                            ? event.venues[0]
                            : event.location[0]}
                        </p>
                      </div>
                      <p className="">
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

export default TrendingSlide;
