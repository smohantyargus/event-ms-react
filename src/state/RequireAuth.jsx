import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext, useEffect } from "react";

export function RequireAuth({ children }) {
  let { user, login } = useContext(UserContext);
  let location = useLocation();

  let paramToGo = `/new/${user?.email}`;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (user.enabled !== "true") {
    return <Navigate to={paramToGo} state={{ from: location }} replace />;
  } else {
    return children;
  }
}
