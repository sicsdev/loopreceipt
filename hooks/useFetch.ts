import router from "next/router";
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
  const [error, setError] = useState<any>();
  const remainingTriesOnError = useRef(numRetriesOnError);

  const sendRequest = async (...args: any): Promise<T | undefined> => {
    setRequestSent(true);
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      const res = await fetcher(...args);
      setData(res);
      setLoading(false);
      return res;
    } catch (error) {
      // console.log(error);
      setError(error);
      if (remainingTriesOnError.current > 0) {
        remainingTriesOnError.current--;
        await retryMethodOnError();
        return sendRequest(...args);
      } else {
        setLoading(false);
        await methodOnError();
        // if (error.message === "Access denied no token provided.") {
        //   router.push("/login");
        // }
        // can handle the error here but we are using axios intercepter
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
    error,
  };
};
