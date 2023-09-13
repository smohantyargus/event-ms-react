import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export function RequireAuth({ children }) {
  let { user, userEnabled, needForPasswordChange } = useContext(UserContext);
  let location = useLocation();

  let paramToGo = `/new/${user?.email}`;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (user.enabled === "false") {
    return <Navigate to={paramToGo} state={{ from: location }} replace />;
  } else if (user.needForPasswordChange === true) {
    toast.warning("Password Expired, Please Change Password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return <Navigate to="/changepassword" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
