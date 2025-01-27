import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './LandingPage.css'; // Optional: for styling

const topics = ["Groups", "Semigroups", "Isomorphism"];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar title="Discrete Mathematics Game" showBackButton={false} />
      <div className="container">
        <h1>Welcome to the Discrete Mathematics Game!</h1>
        <p>Select a topic to get started:</p>
        <div className="topic-button">
          {topics.map((topic) => (
            <button key={topic} onClick={() => navigate(`/how-to-play/${topic}`)}>
              How to Play {topic}
            </button>
          ))}
        </div>
        <div className="topic-button">
          {topics.map((topic) => (
            <button key={topic} onClick={() => navigate(`/game/${topic}`)}>
              Play Game on {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
