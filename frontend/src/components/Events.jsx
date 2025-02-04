import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Eventcard from "./Eventcard";
import Catagories from "./Catagories";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  const CurrentDate = new Date();

  const getCurrentEvents = (event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate > CurrentDate;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await fetch("http://localhost:8000/event/");
        const data = await result.json();
        setEvents(data);
        const upcomingEvents = data.filter(getCurrentEvents);
        setCurrentEvents(upcomingEvents);
        setFilteredEvents(upcomingEvents);
      } catch (err) {
        console.error(err);
      }

    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      currentEvents.filter((event) => {
        return (
          event.title.toLowerCase().includes(searchQuery) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
        );
      })
    );
  }, [searchQuery, currentEvents]);

  const handleCatagoryChange = (type) => {
    if (type === "") {
      setFilteredEvents(currentEvents);
    } else {
      setFilteredEvents(
        currentEvents.filter((event) =>
          event.tags.some((tag) =>
            tag.toLowerCase().includes(type.toLowerCase())
          )
        )
      );
    }
  };

  const handleSortChange = (sortOption) => {
    let sortedEvents = [...filteredEvents];

    if (sortOption === "time") {
      sortedEvents.sort((a, b) => {
        const timeA = new Date(`${a.date}T${a.time}`);
        const timeB = new Date(`${b.date}T${b.time}`);
        return timeA - timeB;
      });
    }

    setFilteredEvents(sortedEvents);
  };

  return (
    <div>
      <div>
      <h1 className="text-3xl font-bold p-4 text-white bg-black">LATEST EVENTS</h1>
        <div className="bg-black p-2 ">
          <input
            type="text"
            placeholder="search"
            className="w-full rounded-lg  p-2 mr-3"
            onChange={(e) => {
              setSearchQuery(e.target.value.toLowerCase());
            }}
          />
        </div>
        <div className="flex justify-between items-center bg-black p-3">
 
        <Link
  to="/archive"
  className="p-3 px-4 font-medium rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-700 transition duration-300"
  state={{ events: events }}
>
  Archive
</Link>


  <Catagories
    onSortChange={handleSortChange}
    onCatagoryChange={handleCatagoryChange}
  />
</div>
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[380px]:grid-cols-1 max">
        
          {filteredEvents.length === 0 ? (
            <p className="p-4">hi no events yet</p>
          ) : (
            filteredEvents.map((event, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
