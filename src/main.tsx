import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Splash from "./Routes/Splash"
import Home from "./Routes/Home"
import EmailRead from "./Routes/EmailRead"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/email/:subject/:sender/:body",
    element: <EmailRead/>
  }
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);