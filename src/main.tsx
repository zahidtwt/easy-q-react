import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
