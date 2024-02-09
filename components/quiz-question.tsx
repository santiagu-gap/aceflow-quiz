'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
// import Completed from '@/app/quiz/completed';
import Link from 'next/link';
import Chat from './chat-help';

type QuizQuestionProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  questionsStatus: string[];
  onNext: () => void;
  correctTheAnswer: (status: string) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  isCompleted: boolean;
  score: number;
  showQA: boolean;
  setShowQA: (showQA: boolean) => void;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  questionsStatus,
  onNext,
  correctTheAnswer,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  isCompleted,
  score,
  showQA,
  setShowQA
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(true);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  // const [questionNumber, setQuestionNumber] = useState<number>(0);

  console.log(questionsStatus);

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setButtonDisabled(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    onNext();
  };

  const tryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setButtonDisabled(false);
  };

  const submitAnswer = () => {
    console.log(questionsStatus);
    console.log(questionsStatus[currentQuestionIndex]);
    setIsCorrect(selectedOption === correctAnswer);
    correctTheAnswer(
      selectedOption === correctAnswer ? 'correct' : 'incorrect'
    );
    setShowFeedback(true);
    setButtonDisabled(true);
  };

  //console.log(question);

  return (
    <div>
      {isCompleted ? (
        <Completed score={score} />
      ) : (
        <div className="flex w-full flex-col lg:flex-row gap-8">
          <div className='flex w-full flex-col items-center gap-6'>
          <h2 className=" text-center text-xl font-bold md:w-2/3 md:text-2xl">
            {question}
          </h2>
          <div className="flex w-3/5 flex-col items-center gap-4">
            {options?.map(option => (
              <Button
                key={option}
                onClick={() => setSelectedOption(option)}
                onFocus={() => setSelectedOption(option)}
                variant={'outline'}
                className={`w-full border-gray-300 py-6 disabled:opacity-100 ${
                  selectedOption === option
                    ? `ring-2 ring-primary 
                ${
                  questionsStatus[currentQuestionIndex] !== null
                    ? `${
                        questionsStatus[currentQuestionIndex] === 'correct' &&
                        questionsStatus[currentQuestionIndex] !== null
                          ? 'bg-green-400 ring-green-400'
                          : 'bg-red-400 ring-red-400'
                      }`
                    : ''
                }
              `
                    : ''
                }`}
                disabled={buttonDisabled}
              >
                {option}
              </Button>
            ))}

            {questionsStatus[currentQuestionIndex] === null ? (
              <Button
                onClick={submitAnswer}
                disabled={selectedOption === null || buttonDisabled}
                className={`w-min `}
              >
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} variant={'secondary'}>
                Next
              </Button>
            )}
          </div>

          <div className="text-center">
            {showQA ? '' : 'Stuck? '}
            <button
              onClick={() => setShowQA(!showQA)}
              className="font-bold text-blue-500 underline"
            >
              {showQA ? 'Close AI tutor ' : 'Ask your AI tutor for help'}
            </button>
          </div>

          <div className="mt-4 flex h-2 w-full gap-4 rounded-full md:w-1/2">
            {questionsStatus.map((status, i) => (
              <div
                key={i}
                onClick={() => {
                  if (status !== null) {
                    setCurrentQuestionIndex(i);
                  }
                }}
                className={`h-2 rounded-full ${
                  status === null
                    ? currentQuestionIndex === i
                      ? 'bg-gray-500'
                      : 'bg-gray-200'
                    : status == 'correct' && currentQuestionIndex !== i
                      ? 'bg-green-500'
                      : status == 'incorrect' && currentQuestionIndex !== i
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                } transition duration-200 ease-in-out hover:cursor-pointer hover:brightness-75`}
                style={{ width: '33.33%' }}
              />
            ))}
          </div>
          </div>

          {showQA && <Chat id={'id'} currentQuestion={question} />}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;