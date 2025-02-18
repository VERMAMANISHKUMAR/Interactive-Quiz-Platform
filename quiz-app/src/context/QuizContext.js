// Import necessary modules from React
import { createContext, useState } from "react";

// Create a new context named QuizContext
export const QuizContext = createContext();

// Define a context provider component named QuizProvider
export const QuizProvider = ({ children }) => {
  // Create a state variable 'score' with an initial value of 0
  // 'setScore' is the function to update 'score'
  const [score, setScore] = useState(0);
  
  return (
    // Provide the 'score' state and 'setScore' function to all child components
    <QuizContext.Provider value={{ score, setScore }}>
      {children} {/* Render child components inside the provider */}
    </QuizContext.Provider>
  );
};
