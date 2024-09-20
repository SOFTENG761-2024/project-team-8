import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

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
