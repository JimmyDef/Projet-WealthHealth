import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import EmployeeDB from "./pages/EmployeeDB";
import Home from "./pages/Home";

import NotFound from "./pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: "/",
        element: <Home />,
      },
      {
        path: "/employee-database",
        element: <EmployeeDB />,
      },
      {
        path: "/index.html",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "NotFound",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
