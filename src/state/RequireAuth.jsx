import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext } from "react";

export function RequireAuth({ children }) {
  let { user } = useContext(UserContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
