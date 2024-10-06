import React, { useRef } from "react";
import ShareButtons from "./ShareButtons";
import { X } from "lucide-react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { toast } from "@/components/ui/use-toast";

const ShareEvent = ({
  isOpen,
  setIsOpen,
  currentEventUrl,
  currentEventImage,
  currentEventTitle,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentEventUrl: string;
  currentEventImage: string;
  currentEventTitle: string;
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const copyToClipboard = (url: string) => {
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
    <div
      className={`inset-0 fixed bg-black/80 flex items-center justify-center z-[60] transition-opacity ease-in-out duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={ref}
        className={`rounded-sm bg-white max-w-xl mx-auto h-fit flex flex-col relative shadow-2xl overflow-hidden outline outline-2 transition-all ease-in-out duration-500   ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } 
            `}
      >
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
            url={currentEventUrl}
            title={currentEventTitle}
            styles="flex justify-center py-2 gap-4 px-2 items-center sm:px-10"
            image={currentEventImage}
          />
          <div className="flex items-center mt-8 py-4 sm:px-10 px-2 w-full bg-black/20 ">
            <div className="truncate flex items-center px-4 py-3 bg-white  outline outline-2 rounded-sm justify-center">
              <a
                href={currentEventUrl}
                className="text-gray-700 truncate block "
              >
                {currentEventUrl}
              </a>
              <button
                onClick={() => copyToClipboard(currentEventUrl)}
                className="sm:ml-2 py-2 rounded-sm text-black hover:text-white font-medium px-8   outline outline-2 hover:bg-primary "
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareEvent;
