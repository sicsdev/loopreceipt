import { useState, useEffect, useRef } from "react";

export const useDelayed = <T>(value: T, delay: number) => {
  const [copy, setCopy] = useState(value);
  const renderedRef = useRef(true);
  useEffect(() => {
    setTimeout(() => {
      if (renderedRef.current) setCopy(value);
    }, delay);
    return () => {
      renderedRef.current = false;
    };
  }, [value]);
  return copy;
};
