import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function HowToPlayPage() {
  const { topicName } = useParams();

  // Instructions specific to Groups
  const instructions = [
    "Understand the concept of Groups in Discrete Mathematics.",
    "Learn about group operations and properties.",
    "Explore examples of groups and their elements.",
    "Practice solving problems related to groups.",
    "Each correct answer gives you +1 point.",
    "There is no negative marking for incorrect answers."
  ];

  return (
    <div>
      <Navbar title={`How to Play: ${topicName}`} /> {/* Show back button */}
      <div className="container">
        <h2>How to Play {topicName}</h2>
        <p>Here are the instructions for playing the {topicName} game:</p>
        <ul className="instructions-list">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HowToPlayPage;
