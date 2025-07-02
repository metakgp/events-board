import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Eventcard from "../../components/event/Eventcard";
import Catagories from "../../components/event/Catagories";
import api from "../../utils/api";
import Loader from "../../components/global/Loader";
import { EventType } from "../../types/event";
export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [currentEvents, setCurrentEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const CurrentDate = new Date();
  const [visibleCount, setVisibleCount] = useState(15);
  const eventsPerPage = 15;
  const getCurrentEvents = (event:EventType) => {
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
      } finally {
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

  const handleCategoryChange = (type:string) => {
    if (type === "") {
      setFilteredEvents(currentEvents);
    } else {
      setFilteredEvents(
        currentEvents.filter((event) =>
          event.tags.some((tag:string) =>
            tag.toLowerCase().includes(type.toLowerCase())
          )
        )
      );
    }
    setVisibleCount(eventsPerPage);
  };

  const handleSortChange = (sortOption:string) => {
    let sortedEvents = [...filteredEvents];

    if (sortOption === "time") {
      sortedEvents.sort((a, b) => {
        const timeA = new Date(`${a.date}T${a.time}`);
        const timeB = new Date(`${b.date}T${b.time}`);
        return timeA.getTime() - timeB.getTime();
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
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div >
          <h1 className="text-3xl  font-normal p-4    text-white bg-neutral-900">
            Latest Events
          </h1>
          <div className="bg-neutral-900 p-2 w-full md:hidden">
            <input
              type="text"
              placeholder="Search your event "
              className="w-full rounded-lg  p-3 mr-3"
              onChange={(e) => {
                setSearchQuery(e.target.value.toLowerCase());
              }}
            />
          </div>
          <div className="flex justify-between items-center bg-neutral-900 px-4">
            <Link
              to="/archive"
              className="p-3 px-4 font-medium rounded-lg bg-neutral-800  text-white shadow-md hover:bg-white max-[580px]:text-sm max-[580px]:p-3 max-[580px]:mt-2 hover:text-black transition duration-300"
              state={{ events: events }}
            >
              Archive
            </Link>
            <div className="flex items-center max-md:justify-end w-[50%]">
              <div className="bg-neutral-900 p-2 w-full max-md:hidden">
                <input
                  type="text"
                  placeholder="Search your event "
                  className="w-full rounded-lg  p-3 mr-3"
                  onChange={(e) => {
                    setSearchQuery(e.target.value.toLowerCase());
                  }}
                />
              </div>
              <Catagories
                onSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
              />
            </div>
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
