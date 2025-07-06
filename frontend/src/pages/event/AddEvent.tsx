import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../../components/global/Error";
import crossMark from "../../assets/cross.png";
import api from "../../utils/api";
import { UserType } from "../../types/user";

export default function AddEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterOption, setPosterOption] = useState("url");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [posterurl, setPosterUrl] = useState("");
  const [society, setSociety] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  //predefined tags
  const availableTags = [
    "Cultural",
    "Lecture",
    "Tech",
    "Selection",
    "Hall",
    "Competition",
    "Club",
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t != tag));
    }
  };
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t != tag));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let posterPath = posterurl;

    if (posterOption === "file" && posterFile) {
      const formData = new FormData();
      formData.append("poster", posterFile);

      try {
        const uploadRes = await api.post("/event/upload", formData);
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
      createdBy: user?.mail,
      selectedTags,
    };

    const result = await api.post("/event/add", eventData);
    if (result.data.message === "ok") {
      navigate("/");
    } else {
      setErrorMessage(result.data.message);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        {errorMessage && <Error ErrorMessage={errorMessage} />}
        <div className="flex justify-center  items-center min-h-screen bg-neutral-900">
          <form className="w-full max-w-md bg-neutral-800 shadow-md rounded-lg p-6  m-3">
            <h2 className="text-2xl font-bold mb-6  text-white text-center">
              Add Event
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title
                </label>
                <input
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Poster Option
                </label>
                <div className="flex space-x-4 text-white">
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
                    <span className="ml-2 text-white">Upload File</span>
                  </label>
                </div>
              </div>

              {posterOption === "url" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
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
                  <label className="block text-sm font-medium text-white mb-2">
                    Upload Poster
                  </label>
                  <input
                    className="w-full text-white px-4 py-2 border rounded-lg"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPosterFile(
                        e.target.files && e.target.files[0]
                          ? e.target.files[0]
                          : null,
                      )
                    }
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Society
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  type="text"
                  placeholder="Enter society"
                  onChange={(e) => setSociety(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? "bg-orange-500/60 text-white"
                          : "bg-gray-600 text-white hover:bg-gray-400"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-medium text-white mt-4">
                  Selected
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedTags.length === 0 ? (
                    <p className="text-white text-sm "> No tags selected</p>
                  ) : (
                    selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-600 text-white hover:bg-white hover:text-black transiton duration-300 cursior-pointer px-3 py-1 rounded-full text-sm flex items-center cursor-pointer"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-white hover:text-black focus:outline-none "
                        >
                          <img
                            src={crossMark}
                            alt="Remove"
                            className="w-5 inline"
                          />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  placeholder="Enter description"
                  name="description"
                  rows={8}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-4 max-[360px]:flex-col max-[360px]:space-x-0">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Date
                  </label>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    type="date"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-white mb-2  ">
                    Time
                  </label>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    type="time"
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-300 "
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
