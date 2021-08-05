import { useEffect, useRef, useState } from "react";
function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}
export const useWindowScrolledTillEndListener = (
  func: Function,
  offset: number = 0
) => {
  // offset is the number of pixels we want to listen document end early
  // func to be ran when window scrolled till end
  const fetchingRef = useRef(false);
  useEffect(() => {
    const cb = async () => {
      if (
        window.scrollY + window.innerHeight >= getDocHeight() - offset &&
        !fetchingRef.current
      ) {
        fetchingRef.current = true;
        await func();
        fetchingRef.current = false;
      }
    };
    window.addEventListener("scroll", cb);
    return () => {
      window.removeEventListener("scroll", cb);
    };
  }, []);
};
