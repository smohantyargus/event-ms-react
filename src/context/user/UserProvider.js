// UserProvider.js
import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [user, setUser] = useState(JSON?.parse(localStorage.getItem("user")));
  const [needForPasswordChange, setNeedForPasswordChange] = useState(
    JSON?.parse(localStorage.getItem("npc"))
  );

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const setVisibilityTrue = () => {
    setLoaderVisible(true);
  };

  const setVisibilityFalse = () => {
    setLoaderVisible(false);
  };

  const updateNeedForPasswordChange = () => {
    setNeedForPasswordChange(false);
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
        needForPasswordChange,
        setNeedForPasswordChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
