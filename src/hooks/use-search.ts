"use client";

import { searchUsers } from "@/actions/user";
import { ChangeEvent, useEffect, useState } from "react";
import { useQueryData } from "./use-query-data";

export function useSearch(key: string, type: "USERS") {
  const [query, setQuery] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    /*
     * This effect will wait for the user to stop typing for 1 second, then
     * update the `debounce` state with the current `query` value. This is used
     * to debounce the search so we don't make too many requests to the server.
     */
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => {
      clearTimeout(delayInputTimeoutId);
    };
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) setOnUsers(users.data);
      }
    },
    false,
  );

  // Trigger the query function when the `debounce` state changes
  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);
    return () => {
      debounce;
    };
  }, [debounce]);
  
  return { onSearchQuery, query, isFetching, onUsers };
}
