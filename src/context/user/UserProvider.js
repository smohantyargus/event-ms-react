// UserProvider.js
import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [user, setUser] = useState(JSON?.parse(localStorage.getItem("user")));
  const [userEnabled, setUserEnabled] = useState(
    JSON?.parse(localStorage.getItem("enabled"))
  );
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
    const existingDataJSON = localStorage.getItem("user");

    if (existingDataJSON) {
      // Step 2: Parse the JSON string to convert it into a JavaScript object
      const existingData = JSON.parse(existingDataJSON);

      // Step 3: Modify the needForPasswordChange property
      existingData.needForPasswordChange = false;

      // Step 4: Convert the updated object back to a JSON string
      const updatedDataJSON = JSON.stringify(existingData);

      // Step 5: Store the updated JSON string back into localStorage
      localStorage.setItem("user", updatedDataJSON);
    }
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
        userEnabled,
        updateNeedForPasswordChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
