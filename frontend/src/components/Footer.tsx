import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full border-t-2 border-black">
      <div className="max-w-[1700px] mx-auto flex xsm:flex-row flex-col max-xsm:gap-6 justify-between py-10 px-2 md:px-4 lg:px-6 xl:px-8 text-gray-700">
        <div className="lg:flex-row flex flex-col lg:gap-8">
          <Link to="/" className="text-lg text-primary font-bold">
            EVENTURE
          </Link>
          <p className="">
            © {new Date().getFullYear()} Eventure. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/terms">Terms of service</Link>
          <Link to="/privacy">Privacy policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
