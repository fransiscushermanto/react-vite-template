import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <main id="page-content">
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
