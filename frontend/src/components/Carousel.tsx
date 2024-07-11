import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useWindowDimentions } from "@/hooks/use-window-dimentions";
import { useState } from "react";
import ShareButtons from "./ShareButtons";
import { toast } from "./ui/use-toast";

import Slide from "./Slide";
import { X } from "lucide-react";

const Carousel = ({ events }: { events: any }) => {
  const { width } = useWindowDimentions();
  const styles = `flex w-full ${
    width > 1300 ? "basis-1/4" : width > 900 ? "basis-1/3" : "basis-1/2"
  }  gap-2`;
  const [isOpen, setIsOpen] = useState(false);
  const url =
    "https://www.eventbrite.com/e/cafe-and-walk-every-friday-in-cafe-c";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({ description: "URL copied to clipboard", variant: "default" });
      },
      (err) => {
        toast({ description: err.message, variant: "destructive" });
      }
    );
  };
  return (
    <>
      {isOpen && (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center z-[60]">
          <div className="rounded-lg bg-white max-w-xl mx-auto h-fit flex flex-col relative shadow-2xl overflow-hidden">
            <button
              className="absolute top-4 right-4 rounded-full bg-gray-200 shadow-2xl p-1 hover:bg-gray-300"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X className=" text-black" />
            </button>
            <h1 className="font-medium text-2xl border-b border-gray-200 p-4">
              Share with friends
            </h1>
            <div className="mt-6">
              <ShareButtons
                url=""
                title=""
                styles="flex justify-center py-2 gap-4 items-center"
                image=""
              />
              <div className="flex items-center mt-6 py-8 px-6 w-full bg-gray-200">
                <div className="truncate flex items-center px-4 py-3 bg-white rounded-lg">
                  <a href={url} className="text-gray-700 truncate block ">
                    {url}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 py-2 font-medium px-8 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" mx-auto w-full mt-4 rounded-lg">
        <Slide events={events} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Carousel;
