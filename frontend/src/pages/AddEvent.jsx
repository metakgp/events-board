import React, { useState } from "react";
import Navbar from "../components/Navbar";

import axios from "axios"

import { useNavigate } from "react-router-dom";
export default function AddEvent() {


const navigate=useNavigate();
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [date,setDate]=useState("");
const [time,setTime]=useState("");
const [posterurl,setPosterurl]=useState("");
const [tags, setTags]=useState([])


const handleSubmit = async (e)=>{
  e.preventDefault();
  const eventData={
    title,
    description,
    date,
    posterurl,  
    time,
    tags,
  }

  
const result=await  axios.post("http://localhost:8000/event/add",eventData)
  if(result.data.message ==="ok"){
    navigate("/")
  }
  else{
    navigate("/add")
  }
}

const handleTagChange=async (e)=>{
  const inputTags=e.target.value.split(" ").map((tag)=>tag.trim()).filter((tag)=>tag!=="")
  setTags(inputTags);
  console.log(tags);
}
  return (
    

    
    <>
      <div>
        <Navbar/>
        <div className="flex  justify-center items-center min-h-screen ">
          <form action="" className="" >
            <div className="flex-col  ">
              <div className="mt-4 ">
                <input className=" p-4 " type="text" placeholder="Title "   name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
              </div>
              <div className="mt-4" name="">
                <input className="p-4 " type="text" placeholder="poster-url" onChange={(e)=>{setPosterurl(e.target.value)}} />
              </div>
              <div className="mt-4" name="">
                <input className="p-4 " type="text" placeholder="add-tags" onChange={handleTagChange} />
              </div>
              <div className="mt-4 " >
                
                <textarea className="p-4" type="text" placeholder="description" name="description" onChange={(e)=>{setDescription(e.target.value)}}/>
              </div>
           
              <div className="mt-4" >
              <input className="p-4 m-4" type="date" name="date"  onChange={(e)=>{setDate(e.target.value)}}/>
                <input className="p-4" type="time" name="time" onChange={(e)=>{setTime(e.target.value)}} />
              </div>
              <div className="mt-4" >
                <button className="bg-yellow-300 rounded-xl p-3" onClick={handleSubmit}>
                  submit
                  </button>  
               </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
