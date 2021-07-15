import { useState, useEffect } from "react";

export const useDelayed = <T>(value: T, delay: number) => {
  const [copy, setCopy] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setCopy(value);
    }, delay);
  }, [value]);
  return copy;
};
