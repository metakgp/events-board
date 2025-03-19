import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Error from "../components/Error";
import Navbar from "../components/Navbar";
export default function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

const emailRegx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegx=/^\+?[1-9]\d{1,14}$/;

  
  const navigate=useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const SocietyData={
      name,
      mail,
      phone,
      description,
      status:"pending",
      password,

    }
    if(!emailRegx.test(mail)){
      setErrorMessage("Invalid email")
      window.scrollTo(0,0);
      return;
    }
    if(!phoneRegx.test(phone)){
      setErrorMessage("Invalid phone no")
      window.scrollTo(0,0);
      return;
    }
    try{
      const response=await axios.post("http://localhost:8000/society/create",SocietyData);
      if(response.data.message==="ok"){
        navigate("/")
      }
      else{
        setErrorMessage(response.data.message)
   
        window.scrollTo(0, 0);
          }
  
    }
    catch(err){
      console.log(err)
    }
  

  };
  return (
    <div>
      <div>
        <Navbar />
        {errorMessage && <Error ErrorMessage={errorMessage} />}
      </div>

      <div>
        <div className="bg-[#0b0b0b] flex items-center justify-center min-h-screen">
          <div className="bg-[#212020] p-6 m-3 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl text-white  font-bold mb-4 text-center">
              Register Society
            </h2>
            <form >
              <div className="mb-4 ">
                <label className="block text-white font-semibold mb-2">
                  Society Name
                </label>
                <input
                  type="text"
                  className="w-full text-black p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter society name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">
                  Mail
                </label>
                <input
                  type="email"
                  className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white  font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea className="w-full p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Enter society description" onChange={(e)=>{
                  setDescription(e.target.value)
                }}></textarea>
              </div>

              <button
                type="submit"
                className="w-full  bg-black text-white  p-2 rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300"
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
