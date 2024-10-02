import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NoEventsFound from "./NoEventsFound";
import { FetchedEventType } from "../../../backend/src/shared/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as apiClient from "@/api-client";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import getSymbolFromCurrency from "currency-symbol-map";

const ExpandedEvents = ({
  location,
  category,
  date,
  sortBy = "Sort by",
  handleIsFetching,
}: {
  location: string;
  category?: string;
  date?: Date | undefined;
  sortBy?: string;
  handleIsFetching: (value: boolean) => void;
}) => {
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );
  const lastPostRef = useRef(null);

  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    isError,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["infinite-query", location, category, date],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.fetchEvents({
        location,
        category,
        date:
          date &&
          new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          ),
        pageParam: pageParam.toString(),
        isTopEvents: false,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isFetchingNextPage) {
      handleIsFetching(true);
    } else {
      handleIsFetching(false);
    }
  }, [handleIsFetching, isFetchingNextPage, isSuccess, isError]);

  useEffect(() => {
    if (data) {
      const initialLoadingState = data.pages
        .flatMap((page) => page.events)
        .reduce<Record<string, boolean>>((acc, event) => {
          if (event.name && !(event.name in loadingState)) {
            acc[event.name] = true;
          }
          return acc;
        }, {});
      setLoadingState((prevState) => ({
        ...prevState,
        ...initialLoadingState,
      }));
    }
  }, [data]);

  const handleImageLoad = (name: string) => {
    setLoadingState((prev) => {
      return { ...prev, [name]: false };
    });
  };
  const events = useMemo(() => {
    const events = data?.pages.flatMap((page) => page.events) || [];
    if (events.length > 0 && sortBy !== "Sort by") {
      const sortedEvents = events
        .filter(
          (event) =>
            formatDate(event.dates.start) !== "Date TBA" &&
            formatDate(event.dates.start) !== "Invalid Date"
        )
        .sort((a, b) =>
          sortBy === "Upcoming First"
            ? new Date(a.dates.start).getTime() -
              new Date(b.dates.start).getTime()
            : new Date(b.dates.start).getTime() -
              new Date(a.dates.start).getTime()
        );
      const unsortedEvents = events.filter(
        (event) =>
          formatDate(event.dates.start) === "Date TBA" ||
          formatDate(event.dates.start) === "Invalid Date"
      );
      return [...sortedEvents, ...unsortedEvents];
    }
    return events;
  }, [data, sortBy]);

  return (
    <>
      {(isSuccess && (!events || events.length < 1)) || isError ? (
        <>
          <NoEventsFound />
        </>
      ) : (
        <div className="flex flex-col gap-4 border-t border-gray-100">
          {isFetching && !isFetchingNextPage && !data
            ? [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center md:py-2 px-4 hover:shadow-xl outline outline-2 rounded-sm "
                >
                  <div className="flex gap-4 py-4 w-full">
                    <Skeleton className="w-[170px] xl:w-[240px] max-md:w-[120px] min-h-full  rounded-sm" />
                    <div className="flex flex-col justify-between gap-1 w-full">
                      <div className="flex flex-col xsm:gap-2 gap-1">
                        <Skeleton className="xsm:h-7 h-6 xsm:w-[350px]" />
                        <Skeleton className="xsm:h-6 h-5 w-[200px]" />
                      </div>
                      <Skeleton className="xsm:h-5 h-4 w-[100px]" />
                      <Skeleton className="xsm:hidden h-8 w-[120px] mt-1" />
                    </div>
                  </div>
                </div>
              ))
            : events &&
              events?.map((event: FetchedEventType, index: number) => {
                const isLoading = loadingState[event.name] ?? false;
                if (index === events.length - 1) {
                  return (
                    <div
                      key={event.id}
                      ref={ref}
                      className="flex justify-between items-center md:py-2 px-4 hover:shadow-xl outline outline-2 rounded-sm "
                    >
                      <div className="flex gap-4 py-4 w-full ">
                        {isLoading && (
                          <div className="flex gap-4 w-full">
                            <Skeleton className="w-[170px] xl:w-[240px] max-md:w-[120px] min-h-full  rounded-sm" />
                            <div className="flex flex-col justify-between gap-1 ">
                              <div className="flex flex-col xsm:gap-2 gap-1 ">
                                <Skeleton className="xsm:h-7 h-6 xsm:w-[350px]" />
                                <Skeleton className="xsm:h-6 h-5 w-[200px]" />
                              </div>
                              <Skeleton className="xsm:h-5 h-4 w-[100px]" />
                              <Skeleton className="xsm:hidden h-8 w-[120px] mt-1" />
                            </div>
                          </div>
                        )}
                        <div
                          className={`${
                            isLoading ? "invisible" : "visible"
                          } w-[170px] xl:w-[240px] max-md:w-[120px] h-full rounded-sm outline outline-2  `}
                        >
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full rounded-sm"
                            onLoad={() => handleImageLoad(event.name)}
                            style={{
                              display: loadingState[event.name]
                                ? "none"
                                : "block",
                            }}
                          />
                        </div>
                        <div
                          className={`${
                            isLoading ? "hidden" : "block"
                          }  flex flex-col justify-between truncate w-full   `}
                        >
                          <div className="flex flex-col">
                            <p className="font-medium text-lg truncate">
                              {event.name}
                            </p>
                            <p className="text-black/50 truncate">
                              {formatDate(event.dates.start) !== "Date TBA"
                                ? format(formatDate(event.dates.start), "MMM d")
                                : formatDate(event.dates.start)}
                              ·{" "}
                              {event.venues[0]?.length > 0
                                ? event.venues[0]
                                : event.location[0]}
                            </p>
                          </div>
                          <p>
                            {event.priceRange.min === null &&
                            event.priceRange.max === null
                              ? "Pricing TBD"
                              : `From ${getSymbolFromCurrency(
                                  event.priceRange.currency
                                )}${event.priceRange.min} `}
                          </p>
                          <div className="xsm:hidden flex flex-col justify-between mt-2">
                            <Link
                              to={`/`}
                              className={`${
                                isLoading ? "invisible" : "visible"
                              } bg-black font-medium text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow`}
                            >
                              View Event
                            </Link>
                          </div>
                        </div>
                        <div className="xsm:flex hidden flex-col justify-between py-4 gap-4">
                          <Link
                            to={`/`}
                            className={`${
                              isLoading ? "invisible" : "visible"
                            } bg-black font-semibold text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow max-md:text-sm max-md:w-[100px]`}
                          >
                            View Event
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center md:py-2 px-4 hover:shadow-xl outline outline-2 rounded-sm "
                    >
                      <div className="flex gap-4 py-4 xl:items-center w-full">
                        {isLoading && (
                          <div className="flex gap-4 w-full">
                            <Skeleton className="w-[170px] xl:w-[240px] max-md:w-[120px] min-h-full  rounded-sm" />
                            <div className="flex flex-col justify-between gap-1">
                              <div className="flex flex-col xsm:gap-2 gap-1">
                                <Skeleton className="xsm:h-7 h-6 xsm:w-[350px]" />
                                <Skeleton className="xsm:h-6 h-5 w-[200px]" />
                              </div>
                              <Skeleton className="xsm:h-5 h-4 w-[100px]" />
                              <Skeleton className="xsm:hidden h-8 w-[120px] mt-1" />
                            </div>
                          </div>
                        )}
                        <div
                          className={`${
                            isLoading ? "invisible" : "visible"
                          } w-[170px] xl:w-[240px] max-md:w-[120px] h-full rounded-sm outline outline-2  `}
                        >
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full rounded-sm"
                            onLoad={() => handleImageLoad(event.name)}
                            style={{
                              display: loadingState[event.name]
                                ? "none"
                                : "block",
                            }}
                          />
                        </div>
                        <div
                          className={`${isLoading ? "hidden" : "block"} 
                            flex flex-col justify-between truncate w-full `}
                        >
                          <div className="flex flex-col">
                            <p className="font-medium text-lg truncate">
                              {event.name}
                            </p>
                            <p className="text-black/50 truncate">
                              {formatDate(event.dates.start) !== "Date TBA"
                                ? format(formatDate(event.dates.start), "MMM d")
                                : formatDate(event.dates.start)}
                              ·{" "}
                              {event.venues[0]?.length > 0
                                ? event.venues[0]
                                : event.location[0]}
                            </p>
                          </div>
                          <p>
                            {event.priceRange.min === null &&
                            event.priceRange.max === null
                              ? "Pricing TBD"
                              : `From ${getSymbolFromCurrency(
                                  event.priceRange.currency
                                )}${event.priceRange.min} `}
                          </p>
                          <div className="xsm:hidden flex flex-col justify-between mt-2 ">
                            <Link
                              to={`/`}
                              className={`${
                                isLoading ? "invisible" : "visible"
                              } bg-black font-medium text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow `}
                            >
                              View Event
                            </Link>
                          </div>
                        </div>
                        <div className="xsm:flex hidden flex-col justify-between py-4 gap-4">
                          <Link
                            to={`/`}
                            className={`${
                              isLoading ? "invisible" : "visible"
                            } bg-black font-semibold text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow max-md:text-sm max-md:w-[100px]`}
                          >
                            View Event
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      )}
    </>
  );
};

export default ExpandedEvents;
