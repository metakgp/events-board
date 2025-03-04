import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import { useNavigate } from "react-router-dom";
export default function Navbar() {
 
  const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const handleLogout=()=>{
    setUser(null);
    localStorage.removeItem("userData")
    navigate("/")
  }
  useEffect(() => {
    
    const token=localStorage.getItem("userData")
    
    if(token){
      try{
        const userData=jwtDecode(token);
        console.log(userData);
        setUser(userData)
      }
      catch(err){
        console.error("invalid token")
        localStorage.removeItem("userData")
        setUser(null);
      }

    }
    
    
  }, []);

  return (
    <nav className="bg-black text-gray-300 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2 p-2">
        <span className="font-bold text-white text-lg">metaKGP</span>
      </div>
      <div className="flex space-x-8">
       { !user && (<Link
          to="/register"
          className="hover:text-black hover:bg-[#f5f3f3]  rounded-md cursor-pointer p-2 transition duration-400"
        >
          Register
        </Link>)}
        {!user && (
          <Link
            to="/signin"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            Signin
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            to="/adminpage"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            AdminPage
          </Link>
        )}
        {(user?.role === "society" || user?.role==="admin" ) && (
          <Link
            to="/add"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            Add Event
          </Link>
        )}
        {(user?.role === "society" || user?.role==="admin" ) && (
          <Link
            to="/dashboard"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            Dashboard
          </Link>
        )}

        <Link
          to="/"
          className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
        >
          Home
        </Link>
        {user?.role &&(
          
        <Link
      onClick={handleLogout}
        className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
      >
        Logout
      </Link>
        )}
      </div>
    </nav>
  );
}
