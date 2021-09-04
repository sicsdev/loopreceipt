import { useEffect, useState } from "react";

export const useWaiter = (delay: number) => {
  const [wait, setWait] = useState(true);
  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        setWait(false);
      }, delay);
      // when delay is zero we don't use setTimeout
      // this makes this hook usable to wait just for useEffect to run
      // solving our usecase for TabBase
    } else {
      setWait(false);
    }
  }, [delay]);
  return {
    wait,
    setWait,
  };
};
