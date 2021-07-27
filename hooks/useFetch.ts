import { useEffect, useRef, useState } from "react";
export const deferrer = (func: Function, ...prevargs: any) => {
  return (...args: any) => {
    return func(...prevargs, ...args);
  };
};
export const useFetch = <T>(
  fetcher: Function,
  {
    deferred = false,
    numRetriesOnError = 0,
    retryMethodOnError = () => {},
    methodOnError = () => {},
  }: {
    deferred?: boolean; // useful for post requests
    numRetriesOnError?: number;
    retryMethodOnError?: Function;
    methodOnError?: Function;
  } = {}
) => {
  const [data, setData] = useState<T>();
  const [requestSent, setRequestSent] = useState(!deferred);
  const [loading, setLoading] = useState<boolean>(!deferred);
  const remainingTriesOnError = useRef(numRetriesOnError);

  const sendRequest = async (...args: any) => {
    setRequestSent(true);
    setLoading(true);
    const res = await fetcher(...args);
    if (res) {
      setData(res);
      setLoading(false);
    } else {
      if (remainingTriesOnError.current > 0) {
        remainingTriesOnError.current--;
        await retryMethodOnError();
        sendRequest();
      } else {
        setLoading(false);
        await methodOnError();
      }
    }
  };
  useEffect(() => {
    if (!deferred) {
      sendRequest();
    }
  }, []);
  return {
    data,
    loading,
    sendRequest,
    requestSent,
  };
};
