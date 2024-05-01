import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "../Context/Index";

export const UserPrivateRoute = ({ children }) => {
  const { isUserAuthenticated } = useContext(UserAuthContext);
  if (isUserAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
export default UserPrivateRoute;
