import { Outlet, useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen h-full w-full bg-background flex flex-col shadow-2xl shadow-blue-50   font-walsheim overflow-hidden">
      {/* <Header /> */}
      {location.pathname === "/" ? (
        <div className="">
          {" "}
          <Hero />{" "}
        </div>
      ) : (
        <div className="z-[10] ">
          <Navbar />
        </div>
      )}
      <div className="px-2 md:px-4 lg:px-6 xl:px-8 py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
