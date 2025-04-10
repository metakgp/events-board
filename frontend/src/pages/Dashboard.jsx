import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import UserSocCard from "../components/UserSocCard";
import { Navigate } from "react-router-dom";
import Error from "../components/Error";
import api from "../utils/api";
export default function Dashboard() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [userEvents, setuserEvents] = useState([]);
const [user,setUser]=useState([])


  useEffect(() => {
    const fetchuserEvents = async () => {
      try {
         const userData = await api.get("/user/me");
        setUser(userData.data)
     const userMail=userData.data.mail
        const response = await api.post("/event/user", {
          userMail,
        });

        if (response.data.message === "ok") {
          setuserEvents(response.data.userEvents || []);
        } else {
          navigate("/"); // redirect if failed
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchuserEvents();
  }, []);
  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <div>
        <Navbar />
        <div>{ErrorMessage && <Error ErrorMessage={ErrorMessage} />}</div>
      </div>
      <div className="flex space-x-2">
        {user.role === "admin" && (
          <div className="font-bold text-4xl p-2 m-4 ">Welcome Admin !</div>
        )}
      </div>
      {userEvents.length !== 0 && (
        <div className=" text-2xl font-semibold p-2 mx-4">
          Total Events: {userEvents.length}
        </div>
      )}
      <div className="min-h-screen">
        {userEvents.length === 0 ? (
          <p className="p-2 mx-4 text-xl">No events</p>
        ) : (
          userEvents.map((event,index) => (
            <UserSocCard
            key={index}
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
