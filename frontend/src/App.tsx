import { useState } from "react";

import Home from "./pages/user/Home";
import Navbar from "./components/global/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
