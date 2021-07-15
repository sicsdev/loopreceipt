import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  useEffect(() => {
    const cb = () => {
      setDimensions({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    cb();
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);
  return {
    windowDimensions: dimensions,
  };
};
