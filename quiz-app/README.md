# Quiz App

A React-based Quiz component that allows users to answer multiple-choice questions, tracks their score, and displays feedback. It includes a countdown timer for each question and shows a summary of attempts after completion.

## Features
- Start and restart the quiz
- Answer multiple-choice questions
- Timed questions (30 seconds per question)
- Tracks score and attempt history
- Provides feedback on correct/incorrect answers
- Displays total time taken

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quiz-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd quiz-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Import the `Quiz` component into your React application:
   ```javascript
   import Quiz from "./Quiz";
   ```
2. Pass a `questions` prop to the component:
   ```javascript
   const questions = [
     {
       question: "What is the capital of France?",
       options: ["Paris", "London", "Berlin", "Madrid"],
       answer: "Paris",
     },
     {
       question: "What is 2 + 2?",
       options: ["3", "4", "5", "6"],
       answer: "4",
     },
   ];

   <Quiz questions={questions} />;
   ```

## Props
- `questions` (Array) - An array of question objects, each containing:
  - `question` (String) - The quiz question.
  - `options` (Array) - A list of possible answers.
  - `answer` (String) - The correct answer.

## Styling
- The component uses class names like `container`, `quiz-box`, `option-btn`, `start-btn`, and `scoreboard`.
- Add your own CSS styles to customize the look and feel.



### Step 1: Create the Project Folder
mkdir quiz-platform
cd quiz-platform

### Step 2: Initialize a React Project
npx create-react-app quiz-app
cd quiz-app

### Step 3: Install Dependencies
npm install react-router-dom indexeddb hooks

### Step 4: Set Up Folder Structure
mkdir -p src/components src/pages src/context src/utils src/assets src/hooks

### Step 5: Create Essential Files

# Create Context for Quiz State Management
touch src/context/QuizContext.js

# Create Utility Functions
touch src/utils/indexedDB.js src/utils/quizUtils.js

# Create Components
touch src/components/Quiz.js src/components/Question.js src/components/Timer.js src/components/Scoreboard.js

# Create Pages
touch src/pages/Home.js src/pages/QuizPage.js src/pages/Result.js

### Step 6: Initialize Git and Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main

### Step 8: Deploy to Vercel or Netlify
# Install Vercel CLI
npm install -g vercel
vercel

# OR for Netlify
npm install -g netlify-cli
netlify deploy

## Author
Developed by [Manish Kumar Verma](https://github.com/yourusername).

