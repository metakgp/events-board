import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate=useNavigate()
  const [role, setRole] = useState(null);
  const handleLogout=()=>{
    setRole(null);
    localStorage.removeItem("role")
    navigate("/")
  }
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <nav className="bg-black text-gray-300 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2 p-2">
        <span className="font-bold text-white text-lg">metaKGP</span>
      </div>
      <div className="flex space-x-8">
        <Link
          to="/register"
          className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
        >
          Register
        </Link>
        {!role && (
          <Link
            to="/signin"
            className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
          >
            Signin
          </Link>
        )}
        {role === "admin" && (
          <Link
            to="/adminpage"
            className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
          >
            AdminPage
          </Link>
        )}
        {(role === "society" || role==="admin" ) && (
          <Link
            to="/add"
            className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
          >
            Add Event
          </Link>
        )}

        <Link
          to="/"
          className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
        >
          Home
        </Link>
        {role &&(
          
        <Link
      onClick={handleLogout}
        className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
      >
        Logout
      </Link>
        )}
      </div>
    </nav>
  );
}
