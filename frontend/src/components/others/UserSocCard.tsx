import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { EventType } from "../../types/event";
import { UserSocCardType } from "../../types/event";
export default function UserSocCard({
  id,
  title,
  description,
  tags,
  setErrorMessage,
  setuserEvents,
}: UserSocCardType) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/event/delete/${id}`);
      if (response.data.message === "ok") {
        setuserEvents((prevEvents: EventType[]) =>
          prevEvents.filter((event) => event._id != id),
        );
        navigate("/dashboard");
      } else {
        setErrorMessage(response.data.message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goTopage = () => {
    navigate(`/event-page/${id}`);
  };
  const handleEdit = async () => {
    try {
      navigate(`/edit/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-neutral-900 ">
      <div
        className="bg-neutral-800    text-white rounded-lg m-4 p-4 cursor-pointer "
        onClick={goTopage}
      >
        <div className="font-semibold text-2xl mb-2 w-[100%]">{title}</div>

        <div className="overflow-hidden flex items-center justify-between max-[500px]:flex-col">
          <div className="w-[100%] max-[500px]:my-4">
            {description.split(" ").slice(0, 40).join(" ") +
              (description.split(" ").length > 20 ? "..." : "")}
          </div>
          <div className="flex max-[500px]:w-full  max-[500px]:justify-between">
            <div
              className=" text-white font-md bg-black px-6 py-2 min-[500px]:mr-5  rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              Edit
            </div>

            <div
              className=" hover:text-white font-md hover:bg-black px-4 py-2 rounded-lg cursor-pointer bg-white text-black transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
