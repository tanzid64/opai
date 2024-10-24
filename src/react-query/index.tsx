'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const client = new QueryClient();

export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  children,
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
