import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  
  useEffect(() => { 
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data);
       
      } catch (err) {
        console.log("Not authenticated");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-black text-gray-300 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2 p-2">
        <span className="font-bold text-white text-lg">metaKGP</span>
        
      </div>

      <button
        className="min-[430px]:hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <div
        className={`flex min-[430px]:space-x-8 transition-all duration-500 max-[430px]:space-y-2  max-[430px]:absolute bg-black max-[430px]:w-full max-[430px]:bg-opacity-100 max-[430px]:top-14 max-[430px]:right-0 ${
          isOpen ? "max-[430px]:flex-col" : "max-[430px]:hidden"
        }`}
      >
        {!user && (
          <Link
            to="/register"
            className="hover:text-black hover:bg-[#f5f3f3]  rounded-md cursor-pointer p-2  transition duration-400"
          >
            Register
          </Link>
        )}
        {!user && (
          <Link
            to="/signin"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            Signin
          </Link>
        )}

        {(user?.role === "society" || user?.role === "admin") && (
          <Link
            to="/add"
            className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
          >
            Add Event
          </Link>
        )}

        <Link
          to="/"
          className="hover:text-black hover:bg-[#f5f3f3] rounded-md cursor-pointer p-2 transition duration-400"
        >
          Home
        </Link>
        {user?.role && (
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
