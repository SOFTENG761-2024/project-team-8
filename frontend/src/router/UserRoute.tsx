import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@mantine/core";

const UserRoute = () => {
  const { currentUserData } = useContext(AuthContext);

  if (currentUserData === null) {
    return <Loader color="primary.5" />;
  }

  if (!currentUserData) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRoute;
