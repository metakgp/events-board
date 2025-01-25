import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
export default function Eventcard({id,title,posterurl,date,time}) {
const navigate=useNavigate();
console.log("id in events card",id)
    const handleClick=async ()=>{
        navigate(`/event-page/${id}`);
    
    }
    
    



  return (
    <div>
        
        <div className=''>
        <div className='flex-col p-2 m-4   bg-slate-300' onClick={handleClick}>
        <div className='h-80'>
            <img className='w-full h-full object-cover'src={posterurl} alt=""/>
        </div>
        <div className='p-3'>
            {title}
        </div>
        <div className='flex'>
            <div className='p-3'>
                date:{date}
            </div>
            <div className='p-3'>
                Time:{time}
            </div>
        </div>
      </div>
        
        </div>
        
     
    </div>
  )
}
