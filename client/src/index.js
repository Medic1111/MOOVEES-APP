import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ListsProvider from "./store/lists-ctx";
import UiCtxProvider from "./store/ui-ctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UiCtxProvider>
      <ListsProvider>
        <App />
      </ListsProvider>
    </UiCtxProvider>
  </React.StrictMode>
);
