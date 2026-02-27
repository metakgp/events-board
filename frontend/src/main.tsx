import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AddEvent from "./pages/event/AddEvent";
import EventPage from "./pages/event/EventPage";
import ArchivedEvents from "./pages/event/ArchivedEvents";
import Register from "./pages/auth/Register";
import Signin from "./pages/auth/Signin.js";
import AdminPage from "./pages/user/AdminPage";
import PrivateRoute from "./components/util/PrivateRoute.js";
import Dashboard from "./pages/user/Dashboard";
import EditPage from "./pages/event/EditPage.js";
import Footer from "./components/global/Footer.js";
import UploadLink from "./pages/event/UploadLink"
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/add"
            element={
              <PrivateRoute allowedRoles={["admin", "society"]}>
                <AddEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "society"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/event-page/:id" element={<EventPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/archive" element={<ArchivedEvents />} />
          <Route path="/upload-link" element={<UploadLink />} />
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
        <Footer />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  throw new Error('Root element with id "root" not found');
}
