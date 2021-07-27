import { useEffect, useState } from "react";
export const deferrer = (func: Function, ...prevargs: any) => {
  return (...args: any) => {
    return func(...prevargs, ...args);
  };
};
export const useFetch = <T>(
  fetcher: Function,
  { deferred = false }: { deferred?: boolean } = {}
) => {
  const [data, setData] = useState<T>();
  const [requestSent, setRequestSent] = useState(!deferred);
  const [loading, setLoading] = useState<boolean>(!deferred);
  const sendRequest = async (...args: any) => {
    setRequestSent(true);
    setLoading(true);
    const res = await fetcher(...args);
    setData(res);
    setLoading(false);
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
