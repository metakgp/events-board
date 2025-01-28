import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Eventcard({ id, title, posterurl, date, time, tags }) {
  const formatDate=(dateString)=>{
const dateObj=new Date(dateString)
return dateObj.toLocaleDateString("en-GB")
  }
  const navigate = useNavigate();
  // console.log("id in events card", id);
  const handleClick = async () => {
    navigate(`/event-page/${id}`);
  };

  return (
    <div>
      <div className="">
        <div className="flex-col p-2 m-4 h-90 w-50 bg-gray-800 rounded-lg hover:cursor-pointer " onClick={handleClick}>
          <div className="h-60">
            <img
              className="w-full h-full object-cover"
              src={posterurl}
              alt=""
            />
          </div>
          <div className="p-3 text-lg font-mono  text-gray-200">{title}</div>
          <div className="flex flex-justify-around ">
            <div className="p-2 text-gray-200 ">  📅Date: <br/>{formatDate(date)}</div>
            <div className="p-2 text-gray-200"> 🕒Time: <br/>{time}</div>
          </div>
          <div className="flex flex-wrap p-1 text-gray-200">
            {tags.length===0?(
               <p className="px-4 py-2 mb-2 mr-2  bg-black text-gray-200 rounded-full">no tags</p> 
            ):(
                tags.map((tag,index)=>{
                   return <Tag key={index} name={tag}/>
                })
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
