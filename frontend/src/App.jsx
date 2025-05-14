import { useState } from "react";

import Events from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Events />
    </div>
  );
}

export default App;
