import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-5">
        <h1>{eventDetails.title}</h1>
        <p>{eventDetails.description}</p>
      </div>
      <div className="flex justify-end">
        <img className="w-2/5" src={eventDetails.posterurl} alt="Event Poster" />
      </div>
    </div>
  );
}
