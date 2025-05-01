import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home"; 
import PlayerSearch from "./components/PlayerSearch.jsx"; 
import TeamSearch from "./components/TeamSearch.jsx"; 
import TeamDisplay from "./components/TeamDisplay.jsx"; 
import "./App.css"; 



export default function App() {
  let a = 'abhijeet'
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player-search" element={<PlayerSearch />} />
            <Route path="/team-search" element={<TeamSearch />} />
            <Route path="/team-display" element={<TeamDisplay />} />
          </Routes>
        </main>

        <footer style={styles.footer}>
          <p>&copy; {new Date().getFullYear()} SoccerHub. All rights reserved. (Made By Abhijeet 😇)</p>
        </footer>
      </div>
    </Router>
  );
}






const styles = {
  mainContent: {
    padding: "2rem",
    minHeight: "80vh",
  },
  footer: {
    backgroundColor: "#1f2937",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    marginTop: "2rem",
  },
};
