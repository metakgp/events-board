import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
