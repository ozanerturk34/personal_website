import { useEffect, useRef, useState } from "react";
const NAVBAR_HEIGHT = 64;

const useScrollNavbar = () => {
  const [top, setTop] = useState<number>(0);
  const previousScroll = useRef<number>(0);
  const scrollUpStartPoint = useRef<number>(0);
  const scrollDownStartPoint = useRef<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      if (previousScroll.current > window.scrollY) {
        setTop((state) => {
          scrollDownStartPoint.current = 0;
          if (!scrollUpStartPoint.current) {
            scrollUpStartPoint.current =
              NAVBAR_HEIGHT + state + previousScroll.current;
          }

          return Math.min(
            scrollUpStartPoint.current - window.scrollY - NAVBAR_HEIGHT,
            0
          );
        });
      } else {
        setTop((state) => {
          scrollUpStartPoint.current = 0;
          if (!scrollDownStartPoint.current) {
            scrollDownStartPoint.current = previousScroll.current + state;
          }
          return -Math.min(
            window.scrollY - scrollDownStartPoint.current,
            NAVBAR_HEIGHT
          );
        });
      }
      previousScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [top]);
  const display = Math.abs(top) < NAVBAR_HEIGHT ? "block" : "hidden";
  const closeDisclosure = display === "hidden" ? true : false;
  return {
    top,
    display,
    closeDisclosure,
  };
};

export default useScrollNavbar;
