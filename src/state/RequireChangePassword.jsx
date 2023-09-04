import { useLocation, Navigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export function RequirePasswordChange({ children }) {
  let { needForPasswordChange } = useContext(UserContext);
  let location = useLocation();

  if (needForPasswordChange === true) {
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
