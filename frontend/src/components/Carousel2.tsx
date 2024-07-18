import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Link } from "react-router-dom";
import { Heart, SquareArrowOutUpRight, X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import ShareButtons from "./ShareButtons";
import { toast } from "./ui/use-toast";

const Carousel2 = ({ events }: { events: any }) => {
  const { width } = useWindowDimentions();
  const [isOpen, setIsOpen] = useState(false);
  const url =
    "";

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
  const style =
    width > 1300 ? "basis-1/4" : width > 900 ? "basis-1/3" : "basis-1/2";

  return (
    <>
      {isOpen && (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center z-[60]">
          <div className="rounded-sm bg-white max-w-xl mx-auto h-fit flex flex-col relative shadow-2xl overflow-hidden">
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
                <div className="truncate flex items-center px-4 py-3 bg-white rounded-sm">
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
      <div className=" mx-auto w-full mt-4 rounded-sm">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {events.map((event, index) => (
              <CarouselItem key={index} className={`pl-1  ${style}`}>
                <div className="h-full w-full relative rounded-sm group ">
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
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all ease-in-out"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    to="/"
                    className="gap-2 p-2 flex flex-col justify-between rounded-b-lg group-hover:bg-primary/10"
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
                      <h3 className="text-xl font-semibold truncate">
                        {event.title}
                      </h3>
                      <p className="text-gray-500 truncate">
                        {event.date} · {event.venue}
                      </p>
                    </div>
                    <p className="text-gray-800">From ${event.price}</p>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Carousel2;
