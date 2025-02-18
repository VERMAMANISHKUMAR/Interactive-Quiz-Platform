import { useState, useEffect, useCallback } from "react";

// Quiz component receives a 'questions' prop, which defaults to an empty array if not provided
const Quiz = ({ questions = [] }) => {
  // State to track whether the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);
  // State to track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State to store the selected option for the current question
  const [selectedOption, setSelectedOption] = useState(null);
  // State to display feedback (Correct/Incorrect)
  const [feedback, setFeedback] = useState("");
  // State to keep track of the user's score
  const [score, setScore] = useState(0);
  // State to determine whether to show the final score
  const [showScore, setShowScore] = useState(false);
  // State to track the remaining time for each question
  const [timeLeft, setTimeLeft] = useState(30);
  // State to track the total time taken for the quiz
  const [totalTime, setTotalTime] = useState(0);
  // State to store the attempt history for each question
  const [attemptHistory, setAttemptHistory] = useState([]);

  // Function to move to the next question
  const handleNextQuestion = useCallback(() => {
    if (questions.length === 0) return; // If no questions are available, return early

    if (currentQuestion + 1 < questions.length) {
      // If there are more questions, move to the next one
      setCurrentQuestion((prev) => prev + 1);
      setFeedback(""); // Reset feedback message
      setSelectedOption(null); // Reset selected option
      setTimeLeft(30); // Reset the timer
    } else {
      // If no more questions, show the final score
      setShowScore(true);
    }
  }, [currentQuestion, questions.length]);

  // Effect to handle the countdown timer
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      // Reduce the timer every second
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      // Automatically move to the next question if time runs out
      handleNextQuestion();
    }

    // Cleanup function to clear the timer when component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, handleNextQuestion]);

  // Function to start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setTimeLeft(30);
    setTotalTime(0);
    setAttemptHistory([]);
  };

  // Function to handle answer selection and scoring
  const handleAnswer = () => {
    if (!questions.length) return; // If no questions exist, return early
    
    if (selectedOption === null) {
      setFeedback("Please select an answer.");
      return;
    }

    // Check if the selected option is correct
    const isCorrect = selectedOption === questions[currentQuestion]?.answer;

    // Update attempt history
    setAttemptHistory((prev) => [
      ...prev,
      {
        question: questions[currentQuestion]?.question,
        selected: selectedOption,
        correct: isCorrect,
      },
    ]);

    // Update score if the answer is correct
    if (isCorrect) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("Incorrect!");
    }

    // Move to the next question after a short delay
    setTimeout(() => handleNextQuestion(), 1000);
  };

  return (
    <div className="container">
      {/* Show start button if quiz hasn't started yet */}
      {!quizStarted ? (
        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : showScore ? (
        // Show final score and attempt history after the quiz ends
        <div className="scoreboard">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Total Time Taken: {totalTime} seconds</p>
          <h3>Attempt History:</h3>
          <ul>
            {attemptHistory.map((attempt, index) => (
              <li key={index}>
                <strong>Q:</strong> {attempt.question} <br />
                <strong>Your Answer:</strong> {attempt.selected} <br />
                <strong>Result:</strong>{" "}
                <span style={{ color: attempt.correct ? "green" : "red" }}>
                  {attempt.correct ? "Correct" : "Incorrect"}
                </span>
              </li>
            ))}
          </ul>
          {/* Restart the quiz */}
          <button onClick={startQuiz}>Restart Quiz</button>
        </div>
      ) : questions.length > 0 ? (
        // Show the quiz questions if they exist
        <div className="quiz-box">
          <h2>{questions[currentQuestion]?.question}</h2>
          <p className="timer">Time Left: {timeLeft} sec</p>
          {/* Render answer options */}
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === option ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
          {/* Submit button to check the answer */}
          <button onClick={handleAnswer}>Submit</button>
          {/* Show feedback after selecting an answer */}
          <p className={`feedback ${feedback === "Correct!" ? "correct" : "incorrect"}`}>
            {feedback}
          </p>
        </div>
      ) : (
        // Show a loading message if questions are not available
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
