import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import EmployeeList from "./pages/EmployeeList";
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
        index: "/employee-list",
        element: <EmployeeList />,
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
