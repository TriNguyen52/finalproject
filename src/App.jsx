import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Gallery from "./pages/Gallery";
import Details from "./pages/Details";
import Edit from "./pages/Edit";

import "./App.css";

function App() {
  const [crew, setCrew] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data logic here
  }, []);

  return (
    <div className="app-wrapper">
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route
            path="/gallery"
            element={<Gallery crew={crew} searchTerm={searchTerm} />}
          />
          <Route path="/post/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route
            path="*"
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
