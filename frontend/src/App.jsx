import { useState } from "react";

import Events from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <Navbar />
      <Events />
    </div>
  );
}

export default App;
