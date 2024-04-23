import trivia from "@models/trivia.json";

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
  answer: string;
};

// Redefining Quiz type to include both answer text and path
export type Quiz = {
  q: string; // The question text
  a: { text: string; path: string }; // Answer text and path for option a
  b: { text: string; path: string }; // Answer text and path for option b
  c: { text: string; path: string }; // Answer text and path for option c
};

// Function to get a random question and transform it into the Quiz type
export const getRandomQuestion = (): Quiz => {
  const randomIndex = Math.floor(Math.random() * trivia.length);
  const selectedQuestion = trivia[randomIndex];

  // Map options into the new structure
  const optionsMap: { [key: string]: { text: string; path: string } } = {};
  selectedQuestion.options.forEach((option) => {
    optionsMap[option.id] = {
      text: option.text,
      path: option.id === selectedQuestion.answer ? "/newboard" : "/trivia",
    };
  });

  // Construct the new question format using the Quiz type
  const formattedQuestion: Quiz = {
    q: selectedQuestion.question,
    a: optionsMap["a"],
    b: optionsMap["b"],
    c: optionsMap["c"],
  };

  return formattedQuestion;
};

// // Example Usage
// const randomQuestion = getRandomQuestion();
// console.log("Random Question:", randomQuestion);
