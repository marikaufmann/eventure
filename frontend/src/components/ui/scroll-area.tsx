import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = React.useState(0);

  const handleScrollRight = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (viewportRef.current) {
      const scrollLeft = viewportRef.current.scrollLeft;
      const scrollWidth = viewportRef.current.scrollWidth;
      const clientWidth = viewportRef.current.clientWidth;

      setScrollPosition(scrollLeft);
      setMaxScrollWidth(scrollWidth - clientWidth);
    }
  };

  React.useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (viewportRef.current) {
        viewportRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden h-full", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className="h-full w-full rounded-[inherit]"
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation="horizontal" />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
      {scrollPosition > 0 && (
        <button
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary/90 hover:bg-primary text-white rounded-full shadow-2xl  z-10"
        >
          <ArrowLeft className="w-5 h-5"/>
        </button>
      )}
      {scrollPosition < maxScrollWidth && (
        <button
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary/90 hover:bg-primary text-white rounded-full shadow-2xl  z-10"
        >
          <ArrowRight className="w-5 h-5"/>
        </button>
      )}
    </div>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
