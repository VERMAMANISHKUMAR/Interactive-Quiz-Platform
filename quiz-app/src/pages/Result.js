import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const Result = () => {
  const { score } = useContext(QuizContext);

  return (
    <div>
      <h1>Your Score: {score}</h1>
    </div>
  );
};

export default Result;
