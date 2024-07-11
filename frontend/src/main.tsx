import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);
