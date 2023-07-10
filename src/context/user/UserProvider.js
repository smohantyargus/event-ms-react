// UserProvider.js
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  // const userLoginData = JSON.parse(localStorage.getItem("userLoginData"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userLoginData"))
  );

  const login = (userData) => {
    // Logic to perform login and set the user state
    setUser(userData);
  };

  const logout = () => {
    // Logic to perform logout and clear the user state
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
