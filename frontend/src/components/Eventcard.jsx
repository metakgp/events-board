import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Eventcard({ id, title, posterurl, date, time,society, tags }) {
  const formatDate=(dateString)=>{
const dateObj=new Date(dateString)
return dateObj.toLocaleDateString("en-GB")
  }
  const formatTime = (time) => {
    if (!time) return "";
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const navigate = useNavigate();
  // console.log("id in events card", id);
  const handleClick = async () => {
    navigate(`/event-page/${id}`);
  };

  return (
    <div>
      <div className=" ">
        <div className="flex-col p-2 m-4 h-90 w-[90%] bg-neutral-800  rounded-lg hover:cursor-pointer   " onClick={handleClick}>
          <div className="h-60">
            <img
              className="w-full h-full object-cover"
              src={posterurl}
              alt=""
            />
          </div>
          <div className="p-2 text-2xl font-bold font-roboto  text-gray-200 truncate overflow-hidden whitespace-nowrap">{title.charAt(0).toUpperCase()+title.slice(1)}</div>
          <div className="p-2  text-md font-sans font-semibold text-gray-200">Society: {society}</div>
          <div className="flex-col flex-justify-around ">
            <div className="px-2 py-1 text-gray-200 ">  📅Date: {formatDate(date)}</div>
            <div className="px-2 py-1 text-gray-200"> 🕒Time: {formatTime(time)}</div>
          </div>
          <div className="flex flex-nowrap p-1  overflow-hidden text-gray-200 ">
            {tags.length===0?(
               <p className="px-4 py-2 mb-2 mr-2  bg-black text-gray-200 rounded-full">No tags</p> 
            ):(
                tags.slice(0,2).map((tag,index)=>{
                   return <Tag key={index} name={tag}/>
                })
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
