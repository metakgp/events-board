import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SocietyCard({ id, name, mail, phone, description ,onApprove}) {
  const navigate=useNavigate();

  const handleApprove=async ()=>{
const response=await axios.post("http://localhost:8000/society/approve",{id}); 
    if(response.data.message==="ok"){
      onApprove();
    }

}
  return (
    <div>
      <div className="bg-gray-800 text-white rounded-lg m-4 p-4">
        <div className="font-semibold text-2xl mb-2">Society: {name}</div>
        
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-poppins font-md">Mail: {mail}</div>
            <div className="font-poppins font-md">Phone: {phone}</div>
            <div className="font-poppins font-md">Note: {description}</div>
          </div>

          <div className=" text-white font-md bg-green-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500" onClick={handleApprove}>
            Approve
          </div>
        </div>
      </div>
    </div>
  );
}
