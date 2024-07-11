import { Skeleton } from "./ui/skeleton";

const CarouselSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <Skeleton className="w-full h-40 mb-4" />
      <Skeleton className="w-full h-6 mb-2" />
      <Skeleton className="w-3/4 h-6" />
    </div>
  );
};

export default CarouselSkeleton;
