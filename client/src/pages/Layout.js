import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
            <Link to="/">Home</Link>      |
            <Link to="/ride">Ride</Link>      |
            <Link to="/booking">Booking</Link>      |
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
