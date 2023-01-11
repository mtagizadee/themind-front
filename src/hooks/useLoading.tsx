import { useState } from "react";

type TReturn = { execute: (...args: any) => Promise<void>; isLoading: boolean };

/**
 * Custom hook to handle loading state for async functions
 * @param callback - async function to be executed
 * @param onError - function to be executed when an error occurs
 * @returns TReturn - { execute: (...args: any) => Promise<void>; isLoading: boolean }
 */
const useLoading = (callback: (...args: any) => Promise<void>, onError: (error: any) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: any) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading } as TReturn;
};

export default useLoading;
