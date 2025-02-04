import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [role, setRole] = useState(null); 

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
        <Link
          to="/signin"
          className="hover:text-black hover:bg-cyan-400 rounded-md cursor-pointer p-2 transition duration-400"
        >
          Signin
        </Link>

        {role === "society" && (
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
      </div>
    </nav>
  );
}
