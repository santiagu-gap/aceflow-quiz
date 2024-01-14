interface Prompt {
  condense: string;
  qa: string;
}

export const prompts: { [key: string]: Prompt } = {
  quizGenerator: {
    condense: `
      Enhance the question: {question}
            `,
    qa: `
      You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:
          
      Step 1: You will receive the text 
      Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text and out of the choices make sure that only one of them is correct. Make the questions obvious if the person doing the test has read the text
      Step 3: You will put the questions in a JSON object array with each object being a question.
      
      {format_instructions}

      Quiz me on this topic: {question}

      <doc>
        {doc}
      </doc>

    `,
  },
};

// Each question object should be in the following format in json:
// {{
//   question: "THE_QUESTION_YOU_GENERATE",
//   options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
//   correctAnswer: "CORRECT_OPTION"
// }}

// I want the overall format of response to be in json like this:
// [
//   {{
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Paris",
//   }},
//   // Add more 9 questions here
// ];

// No explanation is needed for the correct answer, and the options should be shuffled.
// No explanation is needed for the correct answer, and the options should be shuffled.
// Make sure that the correctAnswer property is completely the same as one of the options
// Make sure that the correctAnswer property is completely the same as one of the options
// Step 4: You will return the JSON array to the user with no additional explanation
