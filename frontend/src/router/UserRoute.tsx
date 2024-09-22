import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

/**
 * This component is a wrapper for routes that require the user to be logged in.
 * It checks if the user is logged in and redirects them to the login page if they are not.
 *
 */
const UserRoute = () => {
  const { currentUserData, loadingData } = useContext(AuthContext);

  if (loadingData) {
    return <Loader color="primary.5" />;
  }

  if (currentUserData === null && !loadingData) {
    sessionStorage.removeItem("sessionToken");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default UserRoute;
