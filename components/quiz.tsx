'use client';

import { useState, useEffect } from 'react';
import QuizQuestion from './quiz-question';
import { Button } from '@/components/ui/button';
import Chat from './chat-help';

const QuizFrame = ({
  questions: jsonQuestions,
  id
}: {
  questions: any;
  id: string;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQA, setShowQA] = useState(false);

  // Safely parse the questions
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionsStatus, setQuestionsStatus] = useState<string[]>([]);

  useEffect(() => {
    console.log('Received jsonQuestions:', jsonQuestions);
    try {
      const parsedQuestions = JSON.parse(jsonQuestions)?.questions;
      console.log('Parsed questions:', parsedQuestions);
      setQuestions(parsedQuestions || []);
      setQuestionsStatus(Array(parsedQuestions?.length || 0).fill(null));
    } catch (e) {
      console.error('Error parsing questions:', e);
    }
  }, [jsonQuestions]);

  // Handle the next button click
  const handleNext = (status: string) => {
    // Update the status of the current question
    const updatedStatus = [...questionsStatus];
    updatedStatus[currentQuestionIndex] = status;
    setQuestionsStatus(updatedStatus);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, navigate to the result page or show a completion message
      // Add logic for quiz completion here
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 p-5">
        <Button
          variant={'outline'}
          size={'lg'}
          className="z-50"
          onClick={() => setShowQA(!showQA)}
        >
          Help 🤔
        </Button>
      </div>
      <div className={`grid grid-cols-3 gap-4 px-16`}>
        <div className={`${showQA ? 'col-span-2' : 'col-span-3'} flex flex-col`}>
          {questions.length > 0 ? (
            <QuizQuestion
              question={questions[currentQuestionIndex]?.question}
              options={questions[currentQuestionIndex]?.options}
              correctAnswer={questions[currentQuestionIndex]?.correctAnswer}
              onNext={handleNext}
              questionsStatus={questionsStatus}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          ) : (
            <p>Loading questions...</p> // Placeholder for when questions are not yet loaded
          )}
        </div>
        {showQA && (
          <Chat
            id={id}
            currentQuestion={JSON.stringify(questions[currentQuestionIndex])}
          />
        )}
      </div>
    </div>
  );
};

export default QuizFrame;
