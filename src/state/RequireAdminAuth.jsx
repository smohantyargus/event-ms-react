import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export function RequireAdminAuth({ children }) {
  let { user } = useContext(UserContext);
  let location = useLocation();

  if (user.role !== "ADMIN") {
    toast.warning("Access Denied!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
