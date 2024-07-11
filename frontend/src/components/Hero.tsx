import Navbar from "./Navbar";

import {
  Command,
  CommandInput,
  // CommandEmpty,
  // CommandGroup,
  // CommandItem,
  // CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/mainCommand";
const Hero = () => {
  return (
    <div className="relative w-full h-full shadow-2xl shadow-[#CCCCCC] overflow-hidden bg-black">
      <div className="overflow-hidden">
        <img
          src={`src/assets/hero_background.webp`}
          alt=""
          className="max-w-[1200px] mx-auto object-cover object-bottom md:h-[500px] max-md:scale-[110%]  w-full h-[400px]"
        />
        <img
          src={`${
            import.meta.env.VITE_CLOUDINARY_ASSETS_URL
          }/background_overlay.webp`}
          alt=""
          className=" md:h-[500px] h-[400px] scale-125 max-w-[1300px] mx-auto  w-full absolute inset-0"
        />
      </div>
      {/* <div className="absolute inset-0 bg-black/70"> */}
      <div className="absolute inset-0 bg-black/60">
        {/* <img
          src={`${
            import.meta.env.VITE_CLOUDINARY_ASSETS_URL
          }/hero_background.jpg`}
          alt=""
          className=""
        /> */}
        <div className=" text-secondary">
          <div className="px-4 lg:py-2 pb-2 ">
            <Navbar />
          </div>
        </div>
        <h1 className="text-primary md:text-7xl 2xl:text-8xl text-5xl text-center px-6 pt-8 lg:pt-12 2xl:pt-8 font-bold tracking-tighter ">
          WHERE MOMENTS BECOME MEMORIES
        </h1>
        <div className="flex justify-center  px-6 2xl:mt-4 sm:mt-6 mt-4">
          <p className="text-white780 sm:text-xl tracking-tight max-w-[500px]  text-center w-full">
            From festivals to workshops, find events that make your heart race
            and your soul sing.
          </p>
        </div>
        <div className="max-w-3xl mx-auto z-[80] w-full sm:px-10 px-4 2xl:mt-10 lg:mt-16 mt-8 h-[50px] ">
          <Command className="h-full rounded-lg  shadow-2xl shadow-[#FA0C1A]/45  focus-within:shadow-[#FA0C1A]/60 border   ">
            <CommandInput placeholder="What's happening near you?" />
            {/* <CommandList className="">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList> */}
          </Command>
        </div>
      </div>
    </div>
  );
};

export default Hero;
