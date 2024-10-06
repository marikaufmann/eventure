import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import Slide from "./Slide";
import { FetchedEventType } from "../../../backend/src/shared/types";
import { UseQueryResult } from "@tanstack/react-query";
import ShareEvent from "./ShareEvent";

const Carousel = ({ data }: { data: UseQueryResult<FetchedEventType[]> }) => {
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
      <div className=" mx-auto w-full mt-4 rounded-sm">
        <Slide
          data={data}
          setIsOpen={setIsOpen}
          setCurrentEventUrl={setCurrentEventUrl}
          setCurrentEventTitle={setCurrentEventTitle}
          setCurrentEventImage={setCurrentEventImage}
        />
      </div>
    </>
  );
};

export default Carousel;
