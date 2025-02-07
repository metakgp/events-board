import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import SocietyCard from "../components/SocietyCard";
export default function AdminPage() {
  const [pendingSocieties, setPendingSocieties] = useState([]);
  const [refresh,setRefresh]=useState(false);

  useEffect(() => {
    const getPendingSocieties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/society/pending"
        );
        setPendingSocieties(response.data);
        console.log(response.data);
        // console.log("hi i am geting pending societies!")
      } catch (err) {}
    };
    getPendingSocieties();
  }, [refresh]);


  
  return (
    <div>
      <div>
        <Navbar /> 
      </div>
      <div>
        <h1 className="p-4 text-3xl font-bold">
      Pending societies
        </h1>
      </div>
      <div>

        
        { (pendingSocieties.length===0)?(
          <p className="p-4">  No pending societies</p>
        ):(pendingSocieties.map((soc) => (
          <SocietyCard
          id={soc._id}
          key={soc._id}
            name={soc.name}
            mail={soc.mail}
            phone={soc.phone}
            description={soc.description}
            onApprove={()=>setRefresh((prev)=>!prev)}
          />
        )))}
      
        
        </div>
        
    </div>
  );
}
