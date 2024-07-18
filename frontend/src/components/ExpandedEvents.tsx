import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import NoEventsFound from "./NoEventsFound";

const ExpandedEvents = ({ events }: { events: any }) => {
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
    <>
      {events.length < 1 ? (
        <>
          <NoEventsFound />
        </>
      ) : (
        <div className="flex flex-col gap-4 border-t border-gray-100">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center md:py-2 px-4 hover:shadow-xl outline outline-2 rounded-sm"
            >
              <div className="flex gap-4 py-4">
                {loadingState[event.title] && (
                  <div className="flex gap-4 ">
                    <Skeleton className="xsm:w-[170px] w-[120px] h-[70px] xsm:h-[100px]  rounded-sm" />
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
                    loadingState[event.title] ? "invisible" : "visible"
                  } w-[170px] max-md:w-[120px] h-full rounded-sm outline outline-2  `}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full rounded-sm"
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
                    <p className="font-medium text-lg truncate">
                      {event.title}
                    </p>
                    <p className="text-black/50 truncate">
                      {event.date} · {event.venue}
                    </p>
                  </div>
                  <p>From {event.price}</p>
                  <div className={`xsm:hidden flex flex-col justify-between mt-2 `}>
                <Link
                  to={`/`}
                  className="bg-black font-medium text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow "
                >
                  View Event
                </Link>
              </div>
                </div>
              </div>
              <div className={`xsm:flex hidden flex-col justify-between py-4 gap-4`}>
                <Link
                  to={`/`}
                  className="bg-black font-semibold text-white flex justify-center items-center h-[40px] w-[120px] rounded-sm  hover:shadow-black/40 hover:shadow max-md:text-sm max-md:w-[100px]"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ExpandedEvents;
