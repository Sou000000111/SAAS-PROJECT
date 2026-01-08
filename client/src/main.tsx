import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <NotificationProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </NotificationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
