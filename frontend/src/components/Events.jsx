import React from "react";
import { useState, useEffect } from "react";

import Eventcard from "./Eventcard";
import Catagories from "./Catagories";
export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await fetch("http://localhost:8000/event/");
        const data = await result.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {}
    };
    fetchEvents();
  }, []);
  useEffect(() => {
    setFilteredEvents(
      events.filter((event) => {
        return (
          event.title.toLowerCase().includes(searchQuery) ||
          event.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery)
          )
        );
      })
    );
  }, [searchQuery, events]);

  const handleCatagoryChange = (type) => {
    if (type === "") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          event.tags.some((tag) =>
            tag.toLowerCase().includes(type.toLowerCase())
          )
        )
      );
    }
  };
  const handleSortChange = (sortOption) => {
    let sortedEvents = [...filteredEvents];

    if (sortOption === "date") {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "time") {
      sortedEvents.sort((a, b) => a.time.localeCompare(b.time));
    } else if (sortOption === "date&time") {
      sortedEvents.sort((a, b) => a.time.localeCompare(b.time));
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredEvents(sortedEvents);
  };

  return (
    <div>
      <div>
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
        <div>
          <Catagories
            onSortChange={handleSortChange}
            onCatagoryChange={handleCatagoryChange}
          />
        </div>
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1  bg-black">
          {filteredEvents.length === 0 ? (
            <p className="">hi no events yet</p>
          ) : (
            filteredEvents.map((event, index) => (
              <Eventcard
                id={event._id}
                key={event._id || index}
                title={event.title}
                posterurl={event.posterurl}
                date={event.date}
                time={event.time}
                tags={event.tags}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
