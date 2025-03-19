import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import SocietyCard from "../components/SocietyCard";

import { useNavigate } from "react-router-dom";
export default function AdminPage() {
  const [pendingSocieties, setPendingSocieties] = useState([]);
  const [refresh,setRefresh]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const getPendingSocieties = async () => {

      try {
        const token=localStorage.getItem("userData")
        const authHeader = token ? `Bearer ${token}` : "";
        const response = await axios.get(
          "http://localhost:8000/society/pending"
        ,{
          headers:{
            Authorization:authHeader
          },
        });

if(response.data.message==="ok"){
  setPendingSocieties(response.data.pendingSocieties);
  console.log(response.data);
  // console.log("hi i am geting pending societies!")
}
else{
  console.log("Error fetching pending societies:", err);
  navigate("/signin");
}

        
      } catch (err) {
console.log(err);
      }
    };
    getPendingSocieties();
  }, [refresh]);


  
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      <div>
        <Navbar /> 
      </div>
      <div>
        <h1 className="p-4 text-3xl font-bold  text-white">
      Pending societies
        </h1>
      </div>
      <div className="flex-col flex">

        
        { (pendingSocieties.length===0)?(
          <p className="p-4 text-white">  No pending societies</p>
        ):(pendingSocieties.map((soc) => (
          <SocietyCard
          id={soc._id}
          key={soc._id}
            name={soc.name}
            mail={soc.mail}
            phone={soc.phone}
            description={soc.description}
            onApprove={()=>setRefresh((prev)=>!prev)}
            onDecline={()=>setRefresh((prev)=>!prev)}
          />
        )))}
      
        
        </div>
        
    </div>
  );
}
