import { useEffect } from "react";
import useSWR from "swr";

import { identify } from "../lib/api";

import useLocalStorage from "./useLocalStorage";

const useIdentify = () => {
  const [userId, setUserId] = useLocalStorage("demo-user-id", undefined);
  const { data, error } = useSWR(
    ["/api/identify", userId],
    () => identify({ id: userId }),
    { revalidateOnFocus: false, revalidateOnMount: false },
  );

  useEffect(() => {
    if (!userId && data?.user && userId !== data?.user.id) {
      setUserId(data?.user?.id);
    }
  }, [userId, data, setUserId]);

  return {
    userId: userId,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useIdentify;
