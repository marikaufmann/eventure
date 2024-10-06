import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import * as apiClient from "@/api-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { useState } from "react";
import { addOrdinalSuffix } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  AlarmClockCheck,
  AlarmClockOff,
  ArrowLeft,
  CalendarClock,
  CalendarPlus,
  Heart,
  MapPin,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";
import { format, parse } from "date-fns";
import Tooltip from "@/components/Tooltip";
import ShareEvent from "@/components/ShareEvent";

const EventPage = () => {
  const { pathname } = useLocation();
  const location = pathname.split("/")[2];
  const eventId = pathname.split("/")[3];
  const {
    data: eventData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["fetchEventDetails", location, eventId],
    queryFn: () =>
      apiClient.fetchEventDetails({
        location,
        eventId,
      }),
  });
  const [showPreloader, setShowPreloader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentEventUrl, setCurrentEventUrl] = useState("");
  const [currentEventImage, setCurrentEventImage] = useState("");
  const [currentEventTitle, setCurrentEventTitle] = useState("");
  const styles = showPreloader ? "flex w-full h-full" : "hidden";
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  return (
    <div className="bg-background w-full min-h-screen h-full text-black">
      {isError ? (
        <>
          <div className="bg-background w-full min-h-screen h-full text-black max-w-[1000px] md:mt-20 mt-10 mx-auto">
            <div className="flex md:flex-row flex-col gap-8 justify-between items-center px-4">
              <div className="flex flex-col gap-4 text-lg">
                <h1 className="text-3xl font-semibold">Event not found</h1>
                <p className="max-w-md ">
                  It looks like the page or event you are trying to reach cannot
                  be found.
                </p>
                <Link
                  to="/organize/create-event"
                  className="flex  items-center gap-2 bg-primary/70 rounded-sm w-[250px] py-2 px-4 justify-center font-medium shadow-lg shadow-primary/25 hover:bg-primary/80 hover:shadow-2xl outline outline-2 outline-primary"
                >
                  <CalendarPlus className="w-5 h-5" />
                  Create an Event
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-2 bg-white rounded-sm w-[250px] py-2 px-4 justify-center font-medium shadow-lg outline outline-2  hover:bg-primary/40 hover:shadow-2xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go back home
                </Link>
              </div>
              <div className="max-w-[400px] lg:max-w-[500px]">
                <img
                  src={`${
                    import.meta.env.VITE_CLOUDINARY_ASSETS_URL
                  }/NotFound.webp`}
                  alt=""
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ShareEvent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentEventUrl={currentEventUrl}
            currentEventImage={currentEventImage}
            currentEventTitle={currentEventTitle}
          />
          <div className="absolute inset-0 lg:mt-24 mt-20">
            <div
              className="absolute inset-0 bg-black h-[400px]   lg:-mt-2 -mt-1
       "
            />
            <div
              className="overflow-hidden h-[400px] w-full relative lg:-mt-2 -mt-1
             "
            >
              <div className={styles}>
                <Skeleton className={styles} />
              </div>

              {eventData && (
                <img
                  src={eventData.image}
                  alt=""
                  className="mx-auto max-w-[1100px]  w-full h-full object-cover object-center"
                  onLoad={() => setShowPreloader(false)}
                />
              )}
            </div>
          </div>
          {isFetching && (
            <div className="max-w-[1700px] mx-auto mt-[400px] flex laptop:gap-20 gap-8 laptop:flex-row flex-col">
              <div className="flex flex-col w-full  gap-8">
                {" "}
                <Skeleton className="h-[60px] w-[80%] rounded" />
                <Skeleton className="h-[100px] w-[50%] rounded" />
                <Skeleton className="h-[200px] w-full rounded" />
                <Skeleton className="h-[200px] w-full rounded" />
                <Skeleton className="h-[100px] w-[40%] rounded" />
                <Skeleton className="h-[60px] w-[50%] rounded" />
                <Skeleton className="h-[160px] w-[50%] rounded" />
              </div>
              <div className="flex flex-col laptop:w-[40%] gap-8 ">
                <Skeleton className="h-[130px] w-full rounded" />
                <Skeleton className="h-[150px] w-full rounded" />
              </div>
            </div>
          )}
          {eventData && (
            <div className="max-w-[1700px] mx-auto mt-[400px] flex laptop:gap-20 gap-8 laptop:flex-row flex-col">
              <div className="flex flex-col w-full  gap-8">
                <h1 className="text-5xl font-bold">{eventData.name}</h1>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">The When and Where</h2>
                  {(eventData.address || eventData.location) && (
                    <div className="flex items-center text-gray-700 gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                      <p className="">
                        {eventData.address} {eventData.location}
                      </p>
                    </div>
                  )}
                  {eventData.dates.localStartDate && (
                    <div className="flex items-center text-gray-700 gap-2 mt-2 text-lg ">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      <p>
                        {format(eventData.dates.localStartDate, "MMMM") +
                          " " +
                          addOrdinalSuffix(
                            Number(format(eventData.dates.localStartDate, "d"))
                          ) +
                          ", " +
                          format(eventData.dates.localStartDate, "yyyy")}

                        {eventData.dates.localStartTime && (
                          <span>
                            {" "}
                            •{" "}
                            {format(
                              parse(
                                eventData.dates.localStartTime,
                                "HH:mm:ss",
                                new Date()
                              ),
                              "h:mmaaa"
                            )}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
                {eventData.description && (
                  <div className="flex flex-col gap-2">
                    {" "}
                    <h2 className="text-2xl font-semibold">
                      About this event
                    </h2>{" "}
                    <p className=" text-lg  text-justify">
                      {eventData.description}
                    </p>
                  </div>
                )}
                {eventData.additionalInfo && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Info</h2>
                    <p className=" text-lg  text-justify">
                      {" "}
                      {eventData.additionalInfo}
                    </p>
                  </div>
                )}
                {eventData.sales.public.start && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Sales</h2>
                    <div className="flex gap-2 text-gray-700  text-lg">
                      <h2 className="font-semibold text-gray-800 flex gap-2 items-center">
                        {" "}
                        <AlarmClockCheck className="w-5 h-5 text-primary" />{" "}
                        Start:
                      </h2>
                      <span>
                        {format(eventData.sales.public.start, "MMMM") +
                          " " +
                          addOrdinalSuffix(
                            Number(format(eventData.sales.public.start, "d"))
                          ) +
                          ", " +
                          format(eventData.sales.public.start, "yyyy") +
                          " • " +
                          format(eventData.sales.public.start, "h:mmaaa")}
                      </span>
                    </div>

                    <div className="flex gap-2 text-gray-700  text-lg">
                      <h2 className="font-semibold text-gray-800 flex gap-2 items-center">
                        {" "}
                        <AlarmClockOff className="w-5 h-5 text-primary" />
                        End:
                      </h2>
                      <span>
                        {format(eventData.sales.public.end, "MMMM") +
                          " " +
                          addOrdinalSuffix(
                            Number(format(eventData.sales.public.end, "d"))
                          ) +
                          ", " +
                          format(eventData.sales.public.end, "yyyy") +
                          " • " +
                          format(eventData.sales.public.end, "h:mmaaa")}
                      </span>
                    </div>
                  </div>
                )}
                {eventData.promoters.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold ">Promoters</h2>
                    <p className="flex gap-2 items-center  text-lg">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {eventData.promoters[0]}
                    </p>
                  </div>
                )}
                {eventData.seatmap && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold ">Seatmap</h2>
                    <img
                      src={eventData.seatmap}
                      alt=""
                      className="w-[400px] h-full outline outline-2 rounded-sm shadow-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col laptop:w-[40%] gap-8 ">
                <div className="flex gap-4 justify-end w-full">
                  <Tooltip text="Share event">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setCurrentEventUrl(
                          `${
                            import.meta.env.VITE_FRONTEND_URI
                          }/event/${encodeURIComponent(
                            eventData.location
                          )}/${encodeURIComponent(eventData.id)}`
                        );
                        setCurrentEventImage(eventData.image);
                        setCurrentEventTitle(eventData.name);
                      }}
                      className="p-2 rounded-sm outline hover:bg-black/15  bg-white/70 z-20"
                    >
                      <SquareArrowOutUpRight className="text-black w-6 h-6 hover:text-primary" />
                    </button>
                  </Tooltip>
                  <Tooltip text="Save event">
                    <button className="p-2 rounded-sm outline hover:bg-black/15  z-20">
                      <Heart className="w-6 h-6 text-black hover:fill-primary hover:text-primary" />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex max-laptop:fixed max-laptop:inset-x-0 max-laptop:bottom-0 max-laptop:z-50  items-center justify-center flex-col outline outline-2 laptop:rounded-sm shadow-lg text-lg bg-white w-full">
                  <p className="border-b-2 w-full border-black p-4 text-center max-laptop:p-6">
                    {eventData.priceRange.min === null ? (
                      "Pricing TBD"
                    ) : (
                      <span>
                        From{" "}
                        <span className="font-semibold">
                          {getSymbolFromCurrency(eventData.priceRange.currency)}
                          {eventData.priceRange.min}
                        </span>
                      </span>
                    )}
                  </p>
                  <a
                    href={eventData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50 p-1 bg-primary w-full text-center text-white hover:text-black max-laptop:p-4"
                  >
                    Get tickets
                  </a>
                </div>

                <MapContainer
                  center={[
                    Number(eventData.coordinates.latitude),
                    Number(eventData.coordinates.longitude),
                  ]}
                  zoom={13}
                  attributionControl={false}
                  className="
                    border-2 border-primary rounded-sm shadow-lg w-full laptop:h-[150px] h-[200px] z-40"
                >
                  <FullscreenControl position="topright" />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      Number(eventData.coordinates.latitude),
                      Number(eventData.coordinates.longitude),
                    ]}
                    icon={redIcon}
                  >
                    <Popup>Event Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
