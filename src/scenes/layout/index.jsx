import Navbar from "components/Navbar";
import UserContext from "context/user/UserContext";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user, login, logout } = useContext(UserContext);
  if (user) {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    );
  }
  // return (
  //   <div>
  //     <Navbar />
  //     <Outlet />
  //   </div>
  // );
};

export default Layout;
