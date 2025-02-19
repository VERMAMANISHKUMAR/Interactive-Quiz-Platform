import { useState, useEffect, useCallback } from "react";

const Quiz = ({ questions = [] }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [attemptHistory, setAttemptHistory] = useState([]);

  const handleNextQuestion = useCallback(() => {
    if (questions.length === 0) return;
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setFeedback("");
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion, questions.length]);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, handleNextQuestion]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setTimeLeft(30);
    setTotalTime(0);
    setAttemptHistory([]);
  };

  const handleAnswer = () => {
    if (!questions.length || selectedOption === null) return;
    const isCorrect = selectedOption === questions[currentQuestion]?.answer;
    setAttemptHistory((prev) => [
      ...prev,
      {
        question: questions[currentQuestion]?.question,
        selected: selectedOption,
        correct: isCorrect,
      },
    ]);
    if (isCorrect) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("Incorrect!");
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="container">
      {!quizStarted ? (
        <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
      ) : showScore ? (
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
          <button onClick={startQuiz}>Restart Quiz</button>
        </div>
      ) : questions.length > 0 ? (
        <div className="quiz-box">
          <h2>{questions[currentQuestion]?.question}</h2>
          <p className="timer">Time Left: {timeLeft} sec</p>
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === option ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
            >
              {optionLabels[index]}. {option}
            </button>
          ))}
          <button onClick={handleAnswer}>Submit</button>
          <p className={`feedback ${feedback === "Correct!" ? "correct" : "incorrect"}`}>
            {feedback}
          </p>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
