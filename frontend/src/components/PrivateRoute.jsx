import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("userData");
  if(!token){
    return <Navigate to="/signin" />;
  }
  const user=jwtDecode(token);

  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
