import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LogInForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tasks/add",
        element: <Add />,
      },
      {
        path: "/tasks/edit/:id",
        element: <Add />,
      },
      {
        path: "/users/login",
        element: <LogInForm />,
      },
      {
        path: "/users/register",
        element: <RegisterForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
