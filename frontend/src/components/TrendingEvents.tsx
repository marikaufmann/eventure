import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import TrendingSlide from "./TrendingSlide";
import ShareEvent from "./ShareEvent";

const TrendingEvents = ({
  location,
  setIsFetchedEventsForUsersLocation,
  setIsFetchedEventsForUsersCapitalLocation,
  setIsFetchedEventsForManualUsersLocation,
  setIsFetchedEventsForManualUsersCapitalLocation,
  setHasTrendingEvents,
  locationFetchStatus,
}: {
  location: string;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEventUrl, setCurrentEventUrl] = useState("");
  const [currentEventImage, setCurrentEventImage] = useState("");
  const [currentEventTitle, setCurrentEventTitle] = useState("");

  return (
    <>
      <ShareEvent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentEventUrl={currentEventUrl}
        currentEventImage={currentEventImage}
        currentEventTitle={currentEventTitle}
      />

      <div className=" mx-auto w-full mt-4 ">
        <TrendingSlide
          location={location}
          setIsOpen={setIsOpen}
          setIsFetchedEventsForUsersLocation={
            setIsFetchedEventsForUsersLocation
          }
          setIsFetchedEventsForUsersCapitalLocation={
            setIsFetchedEventsForUsersCapitalLocation
          }
          setIsFetchedEventsForManualUsersLocation={
            setIsFetchedEventsForManualUsersLocation
          }
          setIsFetchedEventsForManualUsersCapitalLocation={
            setIsFetchedEventsForManualUsersCapitalLocation
          }
          setHasTrendingEvents={setHasTrendingEvents}
          locationFetchStatus={locationFetchStatus}
          setCurrentEventUrl={setCurrentEventUrl}
          setCurrentEventTitle={setCurrentEventTitle}
          setCurrentEventImage={setCurrentEventImage}
        />
      </div>
    </>
  );
};

export default TrendingEvents;
