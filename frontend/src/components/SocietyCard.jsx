import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SocietyCard({ id, name, mail, phone, description ,onApprove,onDecline}) {
  const navigate=useNavigate();

  const handleApprove=async ()=>{
const response=await axios.post("http://localhost:8000/society/approve",{id}); 
    if(response.data.message==="ok"){
      onApprove();
    }

}
const handleDecline=async ()=>{
  const response=await axios.post("http://localhost:8000/society/decline",{id}); 
      if(response.data.message==="ok"){
        onDecline();
      }
  
  }
  return (
    <div>
      <div className="bg-[#212020] text-white rounded-lg m-4 p-4  ">


        <div className="font-semibold text-2xl mb-2   ">Society: {name}</div>
        
        
        <div className="flex   max-[500px]:flex-col justify-between min-[500px]:items-end">
          <div className="my-2">
            <div className="font-poppins font-md">Mail: {mail}</div>
            <div className="font-poppins font-md">Phone: {phone}</div>
            <div className="font-poppins font-md">Note: {description}</div>
          </div>
          <div className="flex  h-1/5 max-[500px]:w-full  max-[500px]:justify-between ">
          <div className=" text-white font-md bg-black px-4 py-2 min-[500px]:mr-5  rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-300" onClick={handleDecline}>
            Decline
          </div>
          <div className=" hover:text-white font-md hover:bg-black px-4 py-2 rounded-lg cursor-pointer bg-white text-black transition duration-300" onClick={handleApprove}>
            Approve
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
