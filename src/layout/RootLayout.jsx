import { Outlet } from "react-router-dom";
import Header from "./../components/header/Header";

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
