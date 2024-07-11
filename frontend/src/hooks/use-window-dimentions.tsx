import { useEffect, useState } from "react";

export const useWindowDimentions = () => {
  const getWindowDimentions = () => {
    const { innerHeight: height, innerWidth: width } = window;
    return { height, width };
  };
  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimentions()
  );
  useEffect(() => {
    const handleDimentionsChange = () => {
      setWindowDimentions(getWindowDimentions());
    };
    window.addEventListener("resize", handleDimentionsChange);
    return () => window.removeEventListener("resize", handleDimentionsChange);
  }, []);
  return windowDimentions;
};
