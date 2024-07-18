import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { useWindowDimentions } from "../hooks/use-window-dimentions";
import { Skeleton } from "./ui/skeleton";
import { allCategories } from "@/lib/config";
import { handleLinkFormat } from "@/lib/utils";

const CategoriesSlider = () => {
  const { width } = useWindowDimentions();
  const [loadingState, setLoadingState] = useState(
    allCategories.reduce((acc, cat) => {
      acc[cat.category] = true;
      return acc;
    }, {})
  );
  const getCloudImageLink = (string: string) => {
    const slashArray = string.split(" / ");
    const ampersandArray =
      string.split(" & ").length > 1 ? string.split(" & ") : string.split("&");
    const spaceArray = string.split(" ");
    let link = "";
    if (slashArray.length > 1) {
      link = slashArray[2]
        ? `${slashArray[0]}_${slashArray[1]}_${slashArray[2]}`
        : `${slashArray[0]}_${slashArray[1]}`;
    } else if (ampersandArray.length > 1) {
      link = `${ampersandArray[0]}_${ampersandArray[1]}`;
    } else if (spaceArray.length > 1) {
      link = `${spaceArray[0]}%20${spaceArray[1]}`;
    } else {
      link = string;
    }
    return link;
  };
  const handleImageLoad = (category) => {
    setLoadingState((prev) => {
      return { ...prev, [category]: false };
    });
  };
  return (
    <Swiper
      cssMode={true}
      spaceBetween={20}
      slidesPerView={
        width > 1500
          ? 7
          : width > 1300
          ? 6
          : width > 900
          ? 5
          : width > 700
          ? 4
          : width > 400
          ? 3
          : 2
      }
      navigation={true}
      modules={[Navigation, Mousewheel, Keyboard]}
      className="flex gap-2 h-[270px] max-w-[1700px] categories-slider sm:px-10 px-6"
    >
      {allCategories.map((cat, index) => (
        <SwiperSlide
          key={index}
          className="group rounded-sm overflow-hidden border-2 border-black"
        >
          <Link
            to={`/categories/${handleLinkFormat(cat.category)}`}
            key={cat.category}
            className="rounded-sm w-full h-[170px] relative overflow-hidden shadow-xl group/image"
          >
            {loadingState[cat.category] && (
              <Skeleton className="flex w-full h-full absolute inset-0 bg-muted" />
            )}
            <img
              src={`${
                import.meta.env.VITE_CLOUDINARY_ASSETS_URL
              }/${getCloudImageLink(cat.category)}.webp`}
              alt="category"
              className="object-cover object-center w-full h-full transition-all ease-in-out group-hover/image:scale-110"
              onLoad={() => handleImageLoad(cat.category)}
            />
            {!loadingState[cat.category] && (
              <div className="bg-black/40 group-hover/image:bg-transparent w-full h-full absolute inset-0 transition-all ease-in-out" />
            )}
            <h1 className="absolute bottom-4 left-4 font-bold text-xl text-white tracking-wide">
              {cat.category}
            </h1>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSlider;
