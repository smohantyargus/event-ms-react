// UserProvider.js
import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  // const userLoginData = JSON.parse(localStorage.getItem("userLoginData"));
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [user, setUser] = useState(JSON?.parse(localStorage.getItem("user")));

  const login = (userData) => {
    // Logic to perform login and set the user state
    setUser(userData);
  };

  const logout = () => {
    // Logic to perform logout and clear the user state
    setUser(null);
  };

  const setVisibilityTrue = () => {
    setLoaderVisible(true);
  };

  const setVisibilityFalse = () => {
    setLoaderVisible(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loaderVisible,
        setVisibilityTrue,
        setVisibilityFalse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
