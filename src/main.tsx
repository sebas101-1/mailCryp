import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Splash from "./Routes/Splash"
import CreateAccount from "./Routes/CreateAccount"
import Home from "./Routes/Home"
import EmailRead from "./Routes/EmailRead"
import NotFound from "./Routes/NotFound"
import Send from "./Routes/Send";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from "./Routes/Info";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/email/:emailPath",
    element: <EmailRead/>
  },
  {
    path: "/CreateAccount",
    element: <CreateAccount/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
  {
    path: "Send",
    element: <Send/>
  },
  {
    path: "Info",
    element: <Info/>
  }
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);