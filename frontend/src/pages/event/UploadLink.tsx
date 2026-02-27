import React, { useState } from "react";
import api from "../../utils/api"; // Assuming your axios instance is here
import Navbar from "../../components/global/Navbar"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
type Status = "idle" | "fetching" | "creating" | "success" | "error";


export default function UploadLink() {
  
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleScrapeAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      // Phase 1: Fetching
      setStatus("fetching");
      setMessage("Fetching post details...");

      setTimeout(() => {
        if (status !== "error" && status !== "success") {
          setStatus("creating");
          setMessage("Extracting data and creating event...");
        }
      }, 3500); 

      const response = await api.post("/upload/scrape-link", { url });

      if (response.status === 200) {
        setStatus("success");
        setMessage("Event created successfully!");
        setUrl("");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong. Please check the URL and try again.");
    }
  };

  return (
    <div className="bg-gradient-to-bl bg-neutral-900 min-h-screen text-white font-poppins flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center animate-fadeIn p-5">
        <div className="w-full max-w-lg bg-neutral-800 p-8 rounded-[10px] shadow-xl border border-neutral-700">
          <h1 className="text-3xl mb-6 font-semibold">Import from Instagram</h1>
          
          <form onSubmit={handleScrapeAndCreate} className="flex flex-col gap-4">
            <label className="text-sm text-neutral-300">Instagram Post URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === "fetching" || status === "creating"}
              placeholder="https://www.instagram.com/p/..."
              className="p-3 rounded-[5px] bg-neutral-900 border border-neutral-600 focus:outline-none focus:border-white text-white disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={status === "fetching" || status === "creating" || !url}
              className="mt-4 p-3 rounded-[5px] bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "idle" && "Fetch & Create Event"}
              {status === "fetching" && "Fetching Post..."}
              {status === "creating" && "Creating Event..."}
              {status === "success" && "Create Another"}
              {status === "error" && "Try Again"}
            </button>
          </form>

          {/* Status Messages & Spinners */}
          {status !== "idle" && (
            <div className={`mt-6 p-4 rounded-[5px] flex items-center gap-3 ${
              status === "error" ? "bg-red-900/50 text-red-200 border border-red-800" : 
              status === "success" ? "bg-green-900/50 text-green-200 border border-green-800" : 
              "bg-blue-900/30 text-blue-200 border border-blue-800"
            }`}>
              {(status === "fetching" || status === "creating") && (
                <div className="w-5 h-5 border-2 border-t-transparent border-blue-200 rounded-full animate-spin"></div>
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}