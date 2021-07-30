import { DependencyList, useEffect } from "react";

export const useWindowKeyDownListener = (
  events: {
    [key: string]: Function;
  },
  deps?: DependencyList
) => {
  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      // console.log(event.key);
      events[event.key]?.();
    };
    window.addEventListener("keydown", cb);
    return () => {
      window.removeEventListener("keydown", cb);
    };
  }, deps);
};
