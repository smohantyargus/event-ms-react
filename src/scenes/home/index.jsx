import UserContext from "context/user/UserContext";
import React, { useContext } from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useContext(UserContext);
  if (user.role === "admin") {
    return (
      <div>
        <AdminHome />
      </div>
    );
  } else {
    return (
      <div>
        <UserHome />
      </div>
    );
  }
};

export default Home;
