import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

const UserRoute = () => {
  const { currentUserData, loadingData } = useContext(AuthContext);

  if (loadingData) {
    return <Loader color="primary.5" />;
  }

  if (currentUserData === null && !loadingData) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default UserRoute;
