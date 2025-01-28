import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function EventPage() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/event/page/${id}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);


  const makeLinksClickable = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600">${url}</a>`);
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex ">
      <div className="p-5 w-3/5">
        <h1 className="text-5xl p-3 font-semibold">{eventDetails.title.charAt(0).toUpperCase()+eventDetails.title.slice(1)}</h1>
        <p
          className="text-xl p-4 font-poppins"
          dangerouslySetInnerHTML={{
            __html: makeLinksClickable(eventDetails.description).replace(/\n/g, "<br>"),
          }}
        ></p>
      </div>
      <div className=" m-4 pt-10 w-2/5 ">
        <img className="w-full" src={eventDetails.posterurl} alt="Event Poster" />
      </div>
      </div>
      
    </div>
  );
}
