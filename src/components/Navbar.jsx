import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>
          Soccer<span style={{ color: "#3b82f6" }}>Hub</span>
        </Link>
      </div>
      <div style={styles.links}>
        <Link to="/" className="nav-link" style={styles.link}>Home</Link>
        <Link to="/player-search" className="nav-link" style={styles.link}>Player Search</Link>
        <Link to="/team-display" className="nav-link" style={styles.link}>Team Display</Link>
        <Link to="/team-search" className="nav-link" style={styles.link}>Team Search</Link>
      </div>
    </nav>
  );
}
const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "rgba(31, 41, 55, 0.8)",  
      backdropFilter: "blur(10px)", 
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    logoText: {
      textDecoration: "none",
      color: "#fff",
    },
    links: {
      display: "flex",
      gap: "2rem",
    },
    link: {
      textDecoration: "none",
      color: "#d1d5db",
      fontSize: "1rem",
      transition: "color 0.3s, transform 0.3s",
    },
  };

export default Navbar;