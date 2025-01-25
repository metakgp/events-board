import React from "react";
import Tag from "./Tag";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Eventcard({ id, title, posterurl, date, time, tags }) {
  const navigate = useNavigate();
  console.log("id in events card", id);
  const handleClick = async () => {
    navigate(`/event-page/${id}`);
  };

  return (
    <div>
      <div className="">
        <div className="flex-col p-2 m-4 h-90 w-50 bg-slate-300" onClick={handleClick}>
          <div className="h-60">
            <img
              className="w-full h-full object-cover"
              src={posterurl}
              alt=""
            />
          </div>
          <div className="p-3">{title}</div>
          <div className="flex">
            <div className="p-1">date:{date}</div>
            <div className="p-1">Time:{time}</div>
          </div>
          <div className="flex">
            {tags.length===0?(
               <p className="p-1">no tags</p> 
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
