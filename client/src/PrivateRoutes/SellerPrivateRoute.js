import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SellerAuthContext } from "../Context/Index";

export const SellerPrivateRoute = ({ children }) => {
  const { isSellerAuthenticated } = useContext(SellerAuthContext);
  if (isSellerAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
};
export default SellerPrivateRoute;
