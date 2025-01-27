import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function GamePage() {
  const { topicName } = useParams();

  // Define questions for the Groups topic based on main.py
  const questions = {
    Groups: [
      {
        question: "What is a group in mathematics?",
        options: ["A set with a binary operation", "A collection of numbers", "A type of function", "An ordered pair"],
        correctAnswer: "A set with a binary operation",
        type: "multipleChoice",
      },
      {
        question: "Which of the following is an example of a group?",
        options: ["Integers under addition", "Real numbers under multiplication", "Natural numbers under addition", "All of the above"],
        correctAnswer: "All of the above",
        type: "multipleChoice",
      },
      {
        question: "In a group, what is the identity element?",
        answer: "An element that does not change others",
        correctAnswer: "An element that does not change others",
        type: "fillInTheBlank",
      },
      {
        question: "What is the inverse of an element 'a' in a group?",
        options: ["An element that combines with 'a' to give the identity", "An element that is always zero", "An element that is always one", "An element that can be any number"],
        correctAnswer: "An element that combines with 'a' to give the identity",
        type: "multipleChoice",
      },
      {
        question: "Which of the following properties must a group satisfy?",
        options: ["Closure", "Associativity", "Identity", "All of the above"],
        correctAnswer: "All of the above",
        type: "multipleChoice",
      },
    ],
  };

  // Game states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [timer, setTimer] = useState(30); // Timer for each question
  const [intervalId, setIntervalId] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers for later feedback

  // Fetch current questions based on topic
  const currentQuestions = questions[topicName] || [];

  // Start timer
  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id); // Cleanup interval on unmount
    }
    if (timer === 0) {
      handleAnswer(null); // Time's up, move to next question
    }
  }, [gameState, timer]);

  // Handle answer selection
  const handleAnswer = (answer) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect =
      (currentQuestion.type === "multipleChoice" && answer === currentQuestion.correctAnswer) ||
      (currentQuestion.type === "fillInTheBlank" && answer.trim() === currentQuestion.correctAnswer);

    // Save user answer (for later feedback)
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, isCorrect, answer },
    ]);

    // Update score if the answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or end game
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(30); // Reset timer
      }, 1000); // Delay before showing next question
    } else {
      setGameState("ended"); // End game after last question
    }
  };

  // Reset the game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(30);
    setGameState("playing");
    setUserAnswers([]); // Clear previous answers
  };

  return (
    <div>
      <Navbar title={`Game: ${topicName}`} />
      <div className="container">
        <h2>{topicName} Game</h2>
        {gameState === "playing" && (
          <div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p>{currentQuestions[currentQuestionIndex]?.question}</p>
            {currentQuestions[currentQuestionIndex]?.type === "multipleChoice" ? (
              <div>
                {currentQuestions[currentQuestionIndex]?.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="game-button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Your answer"
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="game-input"
                />
              </div>
            )}
            <p>Time Left: {timer}s</p>
          </div>
        )}
        {gameState === "ended" && (
          <div>
            <p>Game Over! Your score: {score}/{currentQuestions.length}</p>
            <div>
              <h3>Feedback:</h3>
              <ul className="instructions-list">
                {userAnswers.map((answer, index) => (
                  <li key={index}>
                    <strong>{answer.question}</strong>
                    <br />
                    Your answer: {answer.answer}
                    <br />
                    {answer.isCorrect ? "Correct!" : "Incorrect"}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={resetGame} className="game-button">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
