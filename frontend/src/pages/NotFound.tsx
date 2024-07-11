import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-background w-full min-h-screen h-full text-black max-w-[1000px] md:mt-20 mt-10 mx-auto">
      <div className="flex md:flex-row flex-col gap-8 justify-between items-center px-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Page not found</h1>
          <p className="max-w-md">
            The page you are looking for was moved, removed, renamed or might
            never have existed. If you’re still lost try using our search in the
            top menu or return to the homepage.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 bg-primary/70 rounded-lg w-[180px] py-2 px-4 justify-center font-medium shadow-lg shadow-primary/25 hover:bg-primary/80 hover:shadow-2xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back home
          </Link>
        </div>
        <div className="max-w-[400px] lg:max-w-[500px]">
          <img src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/NotFound.webp`} alt="" className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
