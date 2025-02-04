import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      mail,
      password,
    };
    const response = await axios.post(
      "http://localhost:8000/user/signin",
      userData
    );
    if (response.data.message === "ok") {
      localStorage.setItem("role",response.data.role )
      
      navigate("/");
    } else {
      alert(JSON.stringify(response.data.message));
      navigate("/signin");
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Mail
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                password
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
