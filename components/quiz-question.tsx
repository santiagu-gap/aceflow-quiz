'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type QuizQuestionProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  questionsStatus: string[];
  onNext: (status: string) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  questionsStatus,
  onNext,
  currentQuestionIndex,
  setCurrentQuestionIndex
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
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
    onNext(selectedOption === correctAnswer ? 'correct' : 'incorrect');
  };

  const tryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setButtonDisabled(false);
  };

  const submitAnswer = () => {
    setIsCorrect(selectedOption === correctAnswer);
    setShowFeedback(true);
    setButtonDisabled(true);
  };

  console.log(question);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h2 className="w-2/3 text-center text-2xl font-bold">{question}</h2>
      <div className="flex w-3/5 flex-col gap-4">
        {options?.map(option => (
          <Button
            key={option}
            onClick={() => setSelectedOption(option)}
            onFocus={() => setSelectedOption(option)}
            variant={'outline'}
            className={`py-6 ${
              selectedOption === option ? 'ring-2 ring-primary' : ''
            }`}
            disabled={buttonDisabled}
          >
            {option}
          </Button>
        ))}
        <Button
          onClick={submitAnswer}
          disabled={selectedOption === null || buttonDisabled}
          className="w-min"
        >
          Submit
        </Button>
      </div>
      {showFeedback && (
        <div className="flex gap-4">
          {isCorrect ? (
            <Button onClick={handleNext} variant={'secondary'}>
              Next
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleNext} variant={'destructive'}>
              Next
            </Button>
          )}
        </div>
      )}
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
                  ? 'bg-primary'
                  : 'bg-gray-200'
                : status == 'correct' && currentQuestionIndex !== i
                  ? 'bg-green-500'
                  : status == 'incorrect' && currentQuestionIndex !== i
                    ? 'bg-red-500'
                    : 'bg-primary'
            } transition duration-200 ease-in-out hover:cursor-pointer hover:brightness-75`}
            style={{ width: '33.33%' }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
