import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterOption, setPosterOption] = useState("url");
  const [posterFile, setPosterFile] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [posterurl, setPosterUrl] = useState("");
  const [society, setSociety] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let posterPath = posterurl;

    if (posterOption === "file" && posterFile) {
      const formData = new FormData();
      formData.append("poster", posterFile);

      try {
        const uploadRes = await axios.post(
          "http://localhost:8000/event/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        posterPath = uploadRes.data.imageUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    const eventData = {
      title,
      description,
      date,
      posterurl: posterPath,
      time,
      society,
      tags,
    };

    const result = await axios.post(
      "http://localhost:8000/event/add",
      eventData
    );
    if (result.data.message === "ok") {
      navigate("/");
    } else {
      navigate("/add");
    }
  };

  const handleTagChange = async (e) => {
    const inputTags = e.target.value
      .split(" ")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setTags(inputTags);
    console.log(tags);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Add Event
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poster Option
                </label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="posterOption"
                      value="url"
                      checked={posterOption === "url"}
                      onChange={() => setPosterOption("url")}
                    />
                    <span className="ml-2">Use URL</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="posterOption"
                      value="file"
                      checked={posterOption === "file"}
                      onChange={() => setPosterOption("file")}
                    />
                    <span className="ml-2">Upload File</span>
                  </label>
                </div>
              </div>

              {posterOption === "url" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poster URL
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg"
                    type="text"
                    onChange={(e) => setPosterUrl(e.target.value)}
                  />
                </div>
              )}

              {posterOption === "file" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Poster
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPosterFile(e.target.files[0])}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Society
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  type="text"
                  placeholder="Enter society"
                  onChange={(e) => setSociety(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  type="text"
                  placeholder="Enter tags separated by spaces"
                  onChange={handleTagChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  placeholder="Enter description"
                  name="description"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    type="date"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    type="time"
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  className="w-full bg-yellow-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
