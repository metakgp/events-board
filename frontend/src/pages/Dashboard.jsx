import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import UserSocCard from "../components/UserSocCard";
import { Navigate } from "react-router-dom";
import Error from "../components/Error";
export default function Dashboard() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [userEvents, setuserEvents] = useState([]);

  const token = localStorage.getItem("userData");
  const user = jwtDecode(token);
  const userMail = user.mail;
  const role = user.role;
  const authHeader = token ? `Bearer ${token}` : "";

  useEffect(() => {
    const fetchuserEvents = async () => {
      const response = await axios.post(
        "http://localhost:8000/event/user",
        { userMail },
        {
          headers: { Authorization: authHeader },
        }
      );
      if (response.data.message === "ok") {
        setuserEvents(response.data.userEvents || []);
      } else {
        Navigate("/"); //need to imrove later
      }
    };

    fetchuserEvents();
  }, []);

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white">
      <div>
        <Navbar />
        <div>{ErrorMessage && <Error ErrorMessage={ErrorMessage} />}</div>
      </div>
      <div className="flex space-x-2">
        {role === "admin" && (
          <div className="font-bold text-4xl p-2 m-4 ">Welcome Admin !</div>
        )}
      </div>
      {userEvents.length !== 0 && (
        <div className=" text-2xl font-semibold p-2 mx-4">
          Total Events: {userEvents.length}
        </div>
      )}
      <div>
        {userEvents.length === 0 ? (
          <p className="p-2 mx-4 text-xl">No events</p>
        ) : (
          userEvents.map((event) => (
            <UserSocCard
              id={event._id}
              title={event.title}
              description={event.description}
              tags={event.tags}
              setErrorMessage={setErrorMessage}
              setuserEvents={setuserEvents}
            />
          ))
        )}
      </div>
    </div>
  );
}
