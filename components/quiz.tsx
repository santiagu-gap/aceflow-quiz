'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import QuizQuestion from './quiz-question';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import { Input } from './ui/input';
import Chat from './chat-help';

const QuizFrame = ({
  questions: jsonQuestions,
  id
}: {
  questions: any;
  id: string;
}) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQA, setShowQA] = useState(false);

  const questions = typeof jsonQuestions === 'string' ? JSON.parse(jsonQuestions)?.questions || [] : jsonQuestions;

  //const questions = JSON.parse(jsonQuestions)?.questions;

  const [questionsStatus, setQuestionsStatus] = useState(
    Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(0);

  // console.log(questions);

  // Handle the next button click

  const correctTheAnswer = (status: string) => {
    // Update the status of the current question
    if (status == 'correct') {
      questionsStatus[currentQuestionIndex] = 'correct';
      setScore(score+1);
    } else if (status == 'incorrect') {
      questionsStatus[currentQuestionIndex] = 'incorrect';
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, navigate to the result page or show a completion message

      setIsCompleted(true);

      // router.push(`/quiz/${questions[0].quizId}/result`);
      // router.push(`/completed`);

    }
  };

  return (
    <div>
      {/* <div className="fixed bottom-0 right-0 p-5">
        <Button
          variant={'outline'}
          size={'lg'}
          className="z-50"
          onClick={() => setShowQA(!showQA)}
        >
          Help 🤔
        </Button>
      </div> */}
      <div className={`grid grid-cols-3 gap-4 px-8 md:px-16`}>
        <div
          className={`${showQA ? 'col-span-2' : 'col-span-3'} flex flex-col`}
        >
          {questions ? (
            <QuizQuestion
              question={questions[currentQuestionIndex]?.question}
              options={questions[currentQuestionIndex]?.options}
              correctAnswer={questions[currentQuestionIndex]?.correctAnswer}
              onNext={handleNext}
              correctTheAnswer={correctTheAnswer}
              questionsStatus={questionsStatus}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              isCompleted={isCompleted}
              score={score}
              showQA={showQA}
              setShowQA={setShowQA}
            />
          ) : null}
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
