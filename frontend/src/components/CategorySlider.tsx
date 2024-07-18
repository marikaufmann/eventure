import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Skeleton } from "./ui/skeleton";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import ShareButtons from "./ShareButtons";
import { toast } from "./ui/use-toast";
import { X } from "lucide-react";

const CategorySlider = ({
  events,
  redTheme,
  grayTheme,
}: {
  events: any;
  redTheme?: boolean;
  grayTheme?: boolean;
}) => {
  const { width } = useWindowDimentions();
  const [isOpen, setIsOpen] = useState(false);
  const url = "";

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
      {isOpen && (
        <div className="inset-0 fixed bg-black/70 flex items-center justify-center z-[60]">
          <div className="rounded-sm bg-white max-w-xl mx-auto h-fit flex flex-col relative shadow-2xl overflow-hidden outline outline-2 ">
            <button
              className="absolute top-4 right-4 rounded-full shadow-2xl p-1 hover:bg-primary outline outline-2"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X className=" text-black hover:text-white" />
            </button>
            <h1 className="font-medium text-2xl border-b border-black/20 p-4 ">
              Share with friends
            </h1>
            <div className="mt-6">
              <ShareButtons
                url=""
                title=""
                styles="flex justify-center py-2 gap-4 items-center"
                image=""
              />
              <div className="flex items-center mt-8 py-8 px-4 w-full bg-black/20">
                <div className="truncate flex items-center px-4 py-3 bg-white  outline outline-2 rounded-sm">
                  <a href={url} className="text-gray-700 truncate block ">
                    {url}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 py-2 rounded-sm text-black hover:text-white font-medium px-8 outline-black  outline outline-2 hover:bg-primary "
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" mx-auto w-full mt-4 ">
        <Swiper
          cssMode={true}
          spaceBetween={20}
          slidesPerView={
            width > 1300 ? 4 : width > 900 ? 3 : width > 500 ? 2 : 1
          }
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className={`flex gap-2 h-[300px] w-full  category-slider max-w-[1700px] sm:px-10 px-8 ${
            redTheme ? "red-slider" : grayTheme ? "gray-slider" : ""
          }`}
        >
          {events.map((event, index) => (
            <SwiperSlide
              key={index}
              className={`group h-[270px] rounded-sm overflow-hidden border-2 bg-white border-black ${
                grayTheme ? "border-white/30" : ""
              }`}
            >
              <div className="h-full w-full relative rounded-sm">
                <div
                  className={`${
                    loadingState[event.title]
                      ? "absolute inset-0 flex flex-col space-y-3"
                      : "hidden"
                  }`}
                >
                  <Skeleton className="h-[140px] w-full rounded-none" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-4 w-[100px] mt-1" />
                  </div>
                </div>
                <div
                  className={`${
                    loadingState[event.title] ? "opacity-0" : "opacity-100"
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
                  <Link to="/">
                    <div className="h-[150px] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover  group-hover:scale-110 transition-all ease-in-out"
                        loading="lazy"
                        onLoad={() => handleImageLoad(event.title)}
                      />
                    </div>
                  </Link>
                  <Link
                    to="/"
                    className="gap-2 p-2 flex flex-col justify-between rounded-b-lg "
                  >
                    <Helmet>
                      <title>{event.title}</title>
                      <meta property="og:title" content={event.title} />
                      <meta property="og:type" content="website" />
                      <meta property="og:url" content={event.url} />
                      <meta property="og:image" content={event.image} />
                      <meta
                        property="og:description"
                        content={event.description}
                      />
                      <meta
                        property="og:site_name"
                        content="Your Website Name"
                      />
                      <meta name="twitter:card" content="summary_large_image" />
                      <meta name="twitter:title" content={event.title} />
                      <meta
                        name="twitter:description"
                        content={event.description}
                      />
                      <meta name="twitter:image" content={event.image} />
                    </Helmet>
                    <div className="flex flex-col">
                      <h3 className={`text-xl font-semibold truncate `}>
                        {event.title}
                      </h3>
                      <p className={` truncate ${"text-gray-500"}`}>
                        {event.date} · {event.venue}
                      </p>
                    </div>
                    <p className={` ${"text-gray-800"}`}>From ${event.price}</p>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CategorySlider;
