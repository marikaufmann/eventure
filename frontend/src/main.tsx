import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 25 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const syncStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: syncStoragePersister }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider
        theme={{
          components: {
            Dropdown: {
              controlItemBgHover: "#fcc9d4",
              colorText: "#08111F",
              paddingBlock: 8,
            },
            Menu: {
              itemHoverBg: "#FA0C1A",
              itemSelectedBg: "transparent",
              itemActiveBg: "#e2e2e2",
              fontSize: 22,
              itemHeight: 60,
            },
          },
          token: {
            colorPrimary: "#FA0C1A",
            borderRadius: 6,
            controlHeightLG: 50,
            colorBgBase: "#ffffff",
            controlOutline: "none",
          },
        }}
      >
        <BrowserRouter>
          <AppContextProvider>
            <SearchContextProvider>
              <App />
            </SearchContextProvider>
          </AppContextProvider>
        </BrowserRouter>
      </ConfigProvider>
    </PersistQueryClientProvider>
  </React.StrictMode>
);
