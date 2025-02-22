import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const userData = {
      mail,
      password,
    };
    try{
      const response = await axios.post(
        "http://localhost:8000/user/signin",
        userData
      );
      if (response.data.message==="ok") {
        localStorage.setItem("role",response.data.role )
        
        navigate("/");
      } else {
        console.log("hi this is the message",response.data.message)
        // alert(JSON.stringify(response.data.message));
      setErrorMessage(response.data.message);    
        window.scrollTo(0,0);
       
      }
    }
    catch(err){
      console.log(err)
      setErrorMessage("Something went wrong");
      window.scrollTo(0, 0);
    }
    
  };
  return (
    <div>
      <div>
        <Navbar />
        {errorMessage && <Error ErrorMessage={errorMessage} />}
      </div>
      <div className="bg-[#0b0b0b] flex text-white items-center justify-center min-h-screen">
        
        <div className="bg-[#212020] p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
          <form>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Mail
              </label>
              <input
                type="text"
                placeholder="Enter mail"
                className="w-full  p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                type="email"
                placeholder="Enter password"
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-2 font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300"
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
