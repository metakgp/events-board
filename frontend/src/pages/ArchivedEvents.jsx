import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import Eventcard from '../components/Eventcard';
import api from '../utils/api';
import { useState,useEffect } from 'react';
export default function ArchivedEvents() {
 
  const [events,setEvents]=useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await api.get("/event/");
        setEvents(result.data);
      } catch (err) {
        console.log("hi bro");
        console.error(err);
      }
    };
    fetchEvents();
  }, []);
  

  const CurrentDate = new Date();

  const CheckExpiry = (event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate < CurrentDate;
  };

  const pastEvents = events.filter(CheckExpiry);

  return (
    <div>
      <Navbar />
      <div className="p-4 bg-neutral-900 min-h-screen">
        <h2 className="text-3xl font-bold text-white ">Archived Events</h2>
        {pastEvents.length === 0 ? (
          <p className='text-white my-4'>No past events to show.</p>
        ) : (
          <div className="grid grid-cols-5  max-lg:grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2 max-[380px]:grid-cols-1">
            {pastEvents.map((event, index) => (
               <Eventcard
                              id={event._id}
                              key={event._id || index}
                              title={event.title}
                              posterurl={event.posterurl}
                              date={event.date}
                              time={event.time}
                              society={event.society}
                              tags={event.tags}
                            />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
