import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext, useEffect } from "react";

export function RequireAuth({ children }) {
  let { user, login } = useContext(UserContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (user.enabled !== "true") {
    return <Navigate to="/new" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
