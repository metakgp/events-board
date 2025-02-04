import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Navbar from "../components/Navbar";
export default function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  
  
  
  const navigate=useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const SocietyData={
      name,
      mail,
      phone,
      description,
      status:"pending",
      password,

    }
    const response=await axios.post("http://localhost:8000/society/create",SocietyData);
    if(response.data.message==="ok"){
      navigate("/")
    }
    else{
      navigate("/register")
        }


  };
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Register Society
            </h2>
            <form >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Society Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Mail
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " onChange={(e)=>{
                  setDescription(e.target.value)
                }}></textarea>
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
    </div>
  );
}
