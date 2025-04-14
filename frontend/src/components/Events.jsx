import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Eventcard from "./Eventcard";
import Catagories from "./Catagories";
import api from "../utils/api";
import Loader from "./Loader";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const CurrentDate = new Date();
  const [visibleCount, setVisibleCount] = useState(15);
  const eventsPerPage = 15;
  const getCurrentEvents = (event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate > CurrentDate;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await api.get("/event/");
       
        setEvents(result.data);
        const upcomingEvents = result.data.filter(getCurrentEvents);
        setCurrentEvents(upcomingEvents);
        setFilteredEvents(upcomingEvents);
      
      } catch (err) {
        console.error(err);
      }finally {
        setIsLoading(false); 
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
    setVisibleCount(eventsPerPage);
  }, [searchQuery, currentEvents]);

  const handleCategoryChange = (type) => {
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
    setVisibleCount(eventsPerPage); 
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
    setVisibleCount(eventsPerPage);
  };

  
  const loadMoreEvents = () => {
    setVisibleCount((prev) => prev + eventsPerPage);
  };
  const visibleEvents = filteredEvents.slice(0, visibleCount);


  return (
    <div>
     { isLoading?
     (
      <Loader/>
     ):(

     
      <div>
      <h1 className="text-3xl  font-normal p-4    text-white bg-neutral-900">Latest Events</h1>
        <div className="bg-neutral-900 p-2 ">
          <input
            type="text"
            placeholder="Search your event "
            className="w-full rounded-lg  p-2 mr-3"
            onChange={(e) => {
              setSearchQuery(e.target.value.toLowerCase());
            }}
          />
        </div>
        <div className="flex justify-between items-center bg-neutral-900 p-3">
 
        <Link
  to="/archive"
  className="p-3 px-4 font-medium rounded-lg bg-neutral-800  text-white shadow-md hover:bg-white max-[580px]:text-sm max-[580px]:p-2 hover:text-black transition duration-300"
  state={{ events: events }}
>
  Archive
</Link>


  <Catagories
    onSortChange={handleSortChange}
    onCategoryChange={handleCategoryChange}
  />
</div>
        <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 bg-neutral-900 min-h-screen max-sm:grid-cols-2 max-[380px]:grid-cols-1 max">
        
          {visibleEvents.length === 0 ? (
            <p className="p-4 text-white">Hi no events yet</p>
          ) : (
            visibleEvents.map((event, index) => (
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
        {visibleCount < filteredEvents.length && (
            <div className="flex justify-center pb-3  bg-neutral-900">
              <button
                className="px-5 py-2  bg-white  rounded-md  text-black transition"
                onClick={loadMoreEvents}
              >
                Load More
              </button>
            </div>
          )}
      </div>
        )}
    </div>
  );
}
