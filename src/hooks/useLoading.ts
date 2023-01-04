import { useState } from "react";

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

  return { execute, isLoading } as { execute: (...args: any) => Promise<void>; isLoading: boolean };
};

export default useLoading;
