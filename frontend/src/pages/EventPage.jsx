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
    const urlRegex = /(?:https?:\/\/)?([\w.-]+\.[a-z]{2,}(?:\/[\w.-]*)*)/gi;
    return text.replace(urlRegex, (url) => {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600">${url}</a>`;
    });
  };
  

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex  bg-gradient-to-bl bg-[#212020] min-h-screen max-[500px]:flex-col">
      <div className="p-5 w-3/5  max-[500px]:w-full  ">
        <h1 className="text-5xl p-3 font-semibold text-white  max-[300px]:text-4xl">{eventDetails.title.charAt(0).toUpperCase()+eventDetails.title.slice(1)}</h1>
        <p
          className="text-xl p-4 font-poppins  text-white  animate-fadeIn max-[300px]:text-sm"
          dangerouslySetInnerHTML={{
            __html: makeLinksClickable(eventDetails.description).replace(/\n/g, "<br>").replace(/<script.*?>.*?<\/script>/gi, ""),
          }}
        ></p>
      </div>
      <div className=" m-3 pt-10 w-2/5  max-[500px]:w-[93%]   ">
        <img className="w-full" src={eventDetails.posterurl} alt="Event Poster" />
      </div>
      </div>
      
    </div>
  );
}
