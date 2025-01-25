import React from 'react'
import { useState,useEffect } from 'react'

import Eventcard from './Eventcard'
export default function Events() {

const [events,setEvents]=useState("")


  useEffect( ()=>{
     
      const fetchEvents=async()=>{
        
        try{
          const result =await fetch("http://localhost:8000/event/");
          const data= await result.json();
          setEvents(data);

        }
        catch(err){

        }
       
        
      }
fetchEvents();


  },[])
  return (
    <div>
      <div>
        <div className='bg-black'>
        <input type="text" placeholder='search' className='w-full p-2 m-2'/>
        </div>
        <div className='grid grid-cols-5'>
{events.length===0?(
 <p>hi no events yet</p>
):(
  events.map((event,index)=>(
    <Eventcard 
    id={event._id }
    key={event._id|| index}
    title={event.title}
    posterurl={event.posterurl}
    date={event.date}
    time={event.time}
   
    />
    
  ))) 

  }

        </div>
      </div>
    </div>
  )
}
