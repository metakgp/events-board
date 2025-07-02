import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import UserSocCard from "../../components/others/UserSocCard";
import { Navigate, useNavigate } from "react-router-dom";
import Error from "../../components/global/Error";
import api from "../../utils/api";
import Loader from "../../components/global/Loader"; 
import { EventType } from "../../types/event";
import { UserType } from "../../types/user";

export default function Dashboard() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const [userEvents, setuserEvents] = useState<EventType[]|[]>([]);
  const [user, setUser] = useState<UserType|null>(null);
  const [isLoading, setIsLoading] = useState(true);
const [currentPage,setCurrentPage]=useState(1);
  const eventsPerPage = 5;
  const navigate=useNavigate()
  useEffect(() => {
    const fetchuserEvents = async () => {
      try {
        const userData = await api.get("/user/me");
        setUser(userData.data);
        const userMail = userData.data.mail;

        const response = await api.post("/event/user", {
          userMail,
        });

        if (response.data.message === "ok") {
          setuserEvents(response.data.userEvents || []);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchuserEvents();
  }, []);

  const LastEventIndex=currentPage*eventsPerPage;
  const FirstEventIndex=LastEventIndex-eventsPerPage;
  const currentEvents=userEvents.slice(FirstEventIndex,LastEventIndex);
  const totalPages=Math.ceil(userEvents.length/eventsPerPage) 
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);


  return (
    <div className="bg-neutral-900 min-h-screen text-white">
        <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
        
          {ErrorMessage && <Error ErrorMessage={ErrorMessage} />}
          <div className="flex space-x-2">
            {user?.role === "admin" && (
              <div className="font-bold text-4xl p-2 m-4">Welcome Admin!</div>
            )}
            
          </div>
          {userEvents.length !== 0 && (
            <div className="text-2xl font-semibold p-2 mx-4">
              Total Events: {userEvents.length}
            </div>
          )}
          <div className="min-h-screen flex-col flex justify-between">
            <div>
            {userEvents.length === 0 ? (
              <p className="p-2 mx-4 text-xl">No events</p>
            ) : (
              currentEvents.map((event, index) => (
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
            
            <div className="flex justify-end mr-3">
            {totalPages > 1 && (
            <div className="flex justify-center my-4 space-x-2">
         
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded bg-neutral-800 disabled:opacity-50"
            >
              &larr;
            </button>
          
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (num) =>
                  num === 1 ||
                  num === totalPages ||
                  Math.abs(currentPage - num) <= 1
              )
              .map((num, idx, arr) => {
            
                const prev = arr[idx - 1];
                return (
                  <React.Fragment key={num}>
                    {prev && num - prev > 1 && <span className="px-2">...</span>}
                    <button
                      onClick={() => paginate(num)}
                      className={`px-4 py-2 rounded ${
                        currentPage === num ? "bg-neutral-500" : "bg-neutral-800"
                      }`}
                    >
                      {num}
                    </button>
                  </React.Fragment>
                );
              })}
          
    
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded bg-neutral-800 disabled:opacity-50"
            >
              &rarr;
            </button>
          </div>
          )}
            </div>
  
          </div>
        
        </>
      )}
    </div>
  );
}
