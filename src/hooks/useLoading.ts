import { useState } from "react";

const useLoading = (callback: (...args: any) => void, onError: (error: any) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const execute = () => {
    try {
      setIsLoading(true);
      callback();
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading };
};

export default useLoading;
