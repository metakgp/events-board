import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import Eventcard from '../components/Eventcard';
export default function ArchivedEvents() {
  const location = useLocation();
  const {events} = location.state || [];

  const CurrentDate = new Date();

  const CheckExpiry = (event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate < CurrentDate;
  };

  const pastEvents = events.filter(CheckExpiry);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-3xl font-bold">Archived Events</h2>
        {pastEvents.length === 0 ? (
          <p>No past events to show.</p>
        ) : (
          <div className="grid grid-cols-5 gap-4">
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
