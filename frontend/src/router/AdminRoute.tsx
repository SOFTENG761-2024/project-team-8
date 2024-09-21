import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

/**
 * This component is a wrapper for routes that require the user to be an admin.
 * It checks if the user is an admin and redirects them to the login page if they are not.
 *
 */
const AdminRoute = () => {
  const { currentUserData, loadingData } = useContext(AuthContext);

  if (loadingData) {
    return <Loader color="primary.5" />;
  }

  if (currentUserData === null && !loadingData) {
    return <Navigate to="/login" replace />;
  }

  if (currentUserData && currentUserData.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
