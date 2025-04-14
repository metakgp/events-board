import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import Loader from "./Loader";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        const user = res.data;
 
        if (allowedRoles.includes(user.role)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [allowedRoles]);

  if (loading)
    return <Loader/>;

  return authorized ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
