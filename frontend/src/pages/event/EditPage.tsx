import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/global/Navbar";
import axios from "axios";
import Error from "../../components/global/Error";
import crossMark from "../../assets/cross.png";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/api";
import Loader from "../../components/global/Loader";
import { UserType } from "../../types/user";
import { renderMarkdown } from "../../utils/markdown";
export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterOption, setPosterOption] = useState("url");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterurl, setPosterUrl] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [society, setSociety] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/event/page/${id}`);
        const event = response.data;

        setTitle(event.title);
        setDescription(event.description);
        setPosterUrl(event.posterurl);
        setDate(event.date);
        setTime(event.time);
        setSociety(event.society);
        setSelectedTags(event.tags || []);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    const updatedEventData = {
      title,
      description,
      posterurl: posterPath,
      date,
      time,
      society,
      createdBy: user?.mail,
      selectedTags,
    };

    try {
      const result = await api.patch(`/event/update/${id}`, updatedEventData);

      if (result.data.message === "ok") {
        navigate("/dashboard");
      } else {
        setErrorMessage(result.data.message);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setErrorMessage("Error updating event. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      {errorMessage && <Error ErrorMessage={errorMessage} />}
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="w-full max-w-md bg-neutral-800 shadow-md rounded-lg p-6 m-3">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              Edit Event
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title
                </label>
                <input
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                  type="text"
                  placeholder="Enter title"
                  value={title}
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
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  type="text"
                  placeholder="Enter Poster URL"
                  value={posterurl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                />
              )}

              {posterOption === "file" && (
                <input
                  className="w-full text-white px-4 py-2 border rounded-lg"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPosterFile(e.target.files[0]);
                    } else {
                      setPosterFile(null);
                    }
                  }}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Society
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  type="text"
                  placeholder="Enter society"
                  value={society}
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

              <div className="flex space-x-4 max-[360px]:flex-col max-[360px]:space-x-0">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Date
                  </label>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    type="date"
                    name="date"
                    value={date}
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
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-gray-400 text-xs">
                  Surround text in asterisks (*) for bold and underscores (_)
                  for italics.
                </p>
              </div>
              <div>
                <p className="block text-sm font-medium text-white mb-2">
                  Preview
                </p>
                <div className="bg-white p-4 rounded ugc-desc max-h-64 overflow-y-auto">
                  {renderMarkdown(description || "")}
                </div>
              </div>

              <button
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
