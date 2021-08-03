import { useEffect } from "react";
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
export const useWindowScrolledTillEndListener = (func: Function) => {
  // func to be ran when window scrolled till end
  useEffect(() => {
    const cb = () => {
      if (window.scrollY + window.innerHeight === getDocHeight()) {
        func();
      }
    };
    window.addEventListener("scroll", cb);
    return () => {
      window.removeEventListener("scroll", cb);
    };
  }, []);
};
