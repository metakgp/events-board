import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";

import SocietyCard from "../../components/others/SocietyCard";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { SocCardType } from "../../types/cards";
export default function AdminPage() {
  const [pendingSocieties, setPendingSocieties] = useState<SocCardType[]|[]>([]);
  const [refresh,setRefresh]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const getPendingSocieties = async () => {

      try {
        
        const response = await api.get(
          "/society/pending"
        ,);

if(response.data.message==="ok"){
  setPendingSocieties(response.data.pendingSocieties);
 
}
else{
  console.log("Error fetching pending societies:");
  navigate("/signin");
}

        
      } catch (err) {
console.log(err);
      }
    };
    getPendingSocieties();
  }, [refresh]);


  
  return (
    <div className="bg-neutral-900 min-h-screen">
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
