import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import EventPage from "./pages/EventPage.jsx";
import ArchivedEvents from "./pages/ArchivedEvents.jsx";
import Register from "./pages/Register.jsx";
import Signin from "./pages/Signin.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditPage from "./pages/EditPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/add"
          element={
            <PrivateRoute allowedRoles={["admin","society"]}>
              <AddEvent />
            </PrivateRoute>
          }
        />
          <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin","society"]}>
              
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/event-page/:id" element={<EventPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/archive" element={<ArchivedEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/adminpage"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
