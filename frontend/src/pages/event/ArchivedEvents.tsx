import React, { useState, useEffect } from "react";
import Navbar from "../../components/global/Navbar";
import Eventcard from "../../components/event/Eventcard";
import api from "../../utils/api";
import Loader from "../../components/global/Loader";
import { EventType } from "../../types/event";
export default function ArchivedEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const eventsPerPage = 15;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await api.get("/event/");
        setEvents(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const CurrentDate = new Date();

  const CheckExpiry = (event: EventType) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate < CurrentDate;
  };

  const pastEvents = events.filter(CheckExpiry);
  const visibleEvents = pastEvents.slice(0, visibleCount);

  const loadMoreEvents = () => {
    setVisibleCount((prev) => prev + eventsPerPage);
  };

  return (
    <div className="bg-neutral-900">
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="p-4  min-h-screen">
            <h2 className="text-3xl font-sans  text-white">Archived Events</h2>
            {visibleEvents.length === 0 ? (
              <p className="text-white my-4">No past events to show.</p>
            ) : (
              <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[380px]:grid-cols-1">
                {visibleEvents.map((event, index) => (
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
          {visibleCount < pastEvents.length && (
            <div className="flex justify-center pb-3 mt-4 bg-neutral-900">
              <button
                className="px-5 py-2 bg-white rounded-md text-black transition"
                onClick={loadMoreEvents}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
