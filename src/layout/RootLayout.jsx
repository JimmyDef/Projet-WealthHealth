import { Outlet } from "react-router-dom";
import Header from "./../components/header/Header";

/**
 * RootLayout is a React component that serves as the main layout for the application.
 * It includes a header and a main content area where nested routes will be rendered.
 *
 * @returns {JSX.Element} The JSX rendered output of the RootLayout component.
 */

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
