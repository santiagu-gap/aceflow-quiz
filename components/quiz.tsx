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
import toast from 'react-hot-toast';

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

  console.log(jsonQuestions);
  const questions = JSON.parse(jsonQuestions)?.questions || [];

  // let questions = [];

  // try {
  //   questions = JSON.parse(jsonQuestions)?.questions;
  //   toast.success('hi!');
  // } catch (error: any) {
  //   if (error.message.startsWith('Unterminated string in JSON at position')) {
  //     console.warn('JSON issue!');
  //     toast.error(
  //       'There has been an error generating your quiz. Please make another quiz.'
  //     );
  //   }
  //   toast.success('hi!');
  //   console.log(error.message);
  // }

  const [questionsStatus, setQuestionsStatus] = useState(
    Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(0);

  console.log(questions);

  // Handle the next button click

  const correctTheAnswer = (status: string) => {
    // Update the status of the current question
    if (status == 'correct') {
      questionsStatus[currentQuestionIndex] = 'correct';
      setScore(score + 1);
    } else if (status == 'incorrect') {
      questionsStatus[currentQuestionIndex] = 'incorrect';
    }
  };

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
      {questions.length === 0 ? (
        <div className="flex flex-col items-center gap-4 text-center">
          There was an error generating your quiz. Please make another one.{' '}
          <Button
            onClick={() => {
              router.push(`/create`);
            }}
          >
            Create another quiz.
          </Button>
        </div>
      ) : (
        <div className={`grid px-8 md:px-16`}>
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
        </div>
      )}
    </div>
  );
};

export default QuizFrame;
