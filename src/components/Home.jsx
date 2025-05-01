
import React from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="src/Gallery/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to SoccerHub!</h1>
        <p style={styles.subtitle}>Your one-stop app to search for football players and teams.</p>
      </div>
    </div>
  );
}

const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      margin: 0,
      padding: 0,


    },
    video: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      objectFit: "cover",
      zIndex: 1,
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)", 
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#ffffff",
      padding: "2rem",
    },
    title: {
      fontSize: "3.5rem",
      marginBottom: "1rem",
      fontWeight: "bold",
      fontFamily: 'Kenyan',
    },
    subtitle: {
      fontSize: "1.5rem",
      maxWidth: "600px",
    },
  };
  