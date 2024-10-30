import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

import { App } from "@/components/App.tsx";
import ErrorBoundaryAdapter from "@/shared/ui/ErrorBoundaryAdapter/ErrorBoundaryAdapter";

import { ThemeProvider } from "./ThemeProvider/ThemeProvider";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      refetchOnMount: false,
    },
  },
});

export const Root: React.FC = () => {
  const debug = useLaunchParams().startParam === "debug";

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then(lib => lib.default.init());
    }
  }, [debug]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={client}>
        <ErrorBoundaryAdapter>
          <SDKProvider acceptCustomStyles debug={debug}>
            <App />
          </SDKProvider>
        </ErrorBoundaryAdapter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
