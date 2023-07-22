import UserContext from "context/user/UserContext";
import React, { useContext } from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import Footer from "components/Footer";

const Home = () => {
  const { user } = useContext(UserContext);
  if (user.role === "ADMIN") {
    return (
      <div>
        <AdminHome />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <UserHome />
        {/* <Footer /> */}
      </div>
    );
  }
};

export default Home;
