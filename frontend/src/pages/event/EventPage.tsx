import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/global/Loader";
import Navbar from "../../components/global/Navbar";
import api from "../../utils/api";
import { EventType } from "../../types/event";
import { renderMarkdown } from "../../utils/markdown";

export default function EventPage() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/event/page/${id}`);
        setEventDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <Loader />
      ) : (
        eventDetails && (
          <div className="flex  bg-gradient-to-bl bg-neutral-900 min-h-screen max-[700px]:flex-col animate-fadeIn">
            <div className="p-5 w-3/5  max-[700px]:w-full  ">
              <h1 className="text-5xl py-3  text-white  max-[400px]:text-4xl">
                {eventDetails.title.charAt(0).toUpperCase() +
                  eventDetails.title.slice(1)}
              </h1>
              <div className=" my-3 pt-1 w-2/5  max-[700px]:w-[93%] max-[700px]:block hidden ">
                <img
                  className="w-full rounded-[10px]"
                  src={eventDetails.posterurl}
                  alt="Event Poster"
                />
              </div>

              <div className="text-xl py-2 px-2 font-poppins text-white animate-fadeIn max-[300px]:text-sm ugc-desc">
                {renderMarkdown(eventDetails.description ?? "")}
              </div>
            </div>
            <div className=" m-3 pt-10 w-2/5  max-[700px]:hidden  block">
              <img
                className="w-full rounded-[10px]"
                src={eventDetails.posterurl}
                alt="Event Poster"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
