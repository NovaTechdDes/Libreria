import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { Estadistica, NotFound } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Estadistica />,
      },
    ],
  },
]);
