import Quiz from "../components/Quiz";
import sampleQuestions from "../assets/questions.json";

const QuizPage = () => {
  return (
    <div>
      <h1> Quiz</h1>
      <Quiz questions={sampleQuestions} />
    </div>
  );
};

export default QuizPage;
