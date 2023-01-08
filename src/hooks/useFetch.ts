import useLoading from "./useLoading";
import { useState } from "react";

type TUseFetchResponse = [(...args: any) => Promise<void>, boolean, any];

/**
 * Custom hook to send fetch requests to server
 * @param callback - async function to be executed  when useFetch hook  is called
 * @returns TUseFetchResponse - [execute, isLoading, error]
 */
const useFetch = (callback: (...args: any) => void) => {
  const [error, setError] = useState<any>(null);

  const { execute, isLoading } = useLoading(
    async (...args) => {
      callback(...args);
    },
    (error) => {
      setError(error);
    }
  );

  return [execute, isLoading, error] as TUseFetchResponse;
};

export default useFetch;
