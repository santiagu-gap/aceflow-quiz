'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CreateForm from '@/components/Create';
import { Session } from 'next-auth';
import Link from 'next/link';

export const fileTypes = [
  {
    id: 'pdf',
    name: 'PDF',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png',
    description: 'Upload a PDF file to be quizzed on'
  },
  {
    id: 'yt',
    name: 'YouTube',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052',
    description: 'Upload a YouTube link to be quizzed on'
  },
  {
    id: 'url',
    name: 'URL',
    icon: 'https://cdn-icons-png.flaticon.com/512/5220/5220478.png',
    description: 'Upload a URL to be quizzed on'
  }
];

const CreateCarousel = ({ session }: { session: Session | null }) => {
  const [step, setStep] = useState(1);
  const [selectedFileType, setSelectedFileType] = useState('pdf');
  const [question, setQuestion] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  console.log("Quizzes Answered : " + session?.user.quizzesAnswered ?? 'session undefined');

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 mt-12 flex justify-center text-xl font-semibold leading-10 md:text-6xl">
        <span className="inline-block bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 bg-clip-text py-4 text-transparent">
          Imagine Anything
        </span>
      </div>
      <div className="flex w-full flex-col items-start justify-center px-4 md:flex-row lg:gap-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="mb-8 w-full md:w-2/3"
          >
            {session ? (
              <>
              <div>
              <Textarea
                      className="h-36 w-full rounded-md border p-4"
                      placeholder="What would you like to be quizzed on?"
                      name="question"
                      id="question"
                      rows={10}
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                    <Button onClick={handleNextStep} className="mt-4">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
              </div>
                {/* {session.user.quizzesAnswered < 1 ? ( */}
                  {/* <>
                    <Textarea
                      className="h-36 w-full rounded-md border p-4"
                      placeholder="What would you like to be quizzed on?"
                      name="question"
                      id="question"
                      rows={10}
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                    <Button onClick={handleNextStep} className="mt-4">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </> */}
                {/* ) : ( */}
                  {/* <div> */}
                    {/* Display a message or alert for the user */}
                    {/* <p> */}
                      {/* Limit reached for free user. Please consider upgrading */}
                      {/* your account. */}
                    {/* </p> */}
                    {/* You can also use a modal or another UI component to display this message */}
                  {/* </div> */}
                {/* )} */}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-8">
                <span className="text-3xl font-semibold text-primary">
                  Sign in to continue
                </span>
                <Link href={'/login'} className="mb-8">
                  <Button size={'lg'} className="scale-110">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="mb-8"
          >
            <div className="flex flex-row items-center">
              <Tabs defaultValue="pdf">
                <TabsList className="h-56 w-[85vw]">
                  {fileTypes.map(type => (
                    <TabsTrigger
                      key={type.id}
                      value={type.id}
                      onClick={() => setSelectedFileType(type.id)}
                      className={`flex h-full w-full flex-col items-center justify-center gap-6 transition duration-500 ${
                        type.id !== selectedFileType ? 'grayscale' : ''
                      }`}
                      style={{
                        filter:
                          type.id !== selectedFileType
                            ? 'grayscale(100%)'
                            : 'none'
                      }}
                    >
                      <Image
                        src={type.icon}
                        alt={type.name}
                        width={64}
                        height={64}
                        className="select-none"
                        draggable={false}
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-2xl font-semibold">
                          {type.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {type.description}
                        </span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            {/* {session ? (
              <div className="flex flex-row items-center">
                <Tabs defaultValue="pdf">
                  <TabsList className="h-56 w-[85vw]">
                    {fileTypes.map(type => (
                      <TabsTrigger
                        key={type.id}
                        value={type.id}
                        onClick={() => setSelectedFileType(type.id)}
                        className={`flex h-full w-full flex-col items-center justify-center gap-6 transition duration-500 ${type.id !== selectedFileType ? 'grayscale' : ''
                          }`}
                        style={{
                          filter:
                            type.id !== selectedFileType
                              ? 'grayscale(100%)'
                              : 'none'
                        }}
                      >
                        <Image
                          src={type.icon}
                          alt={type.name}
                          width={64}
                          height={64}
                          className="select-none"
                          draggable={false}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-2xl font-semibold">
                            {type.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {type.description}
                          </span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-8">
                <span className="text-3xl font-semibold text-primary">
                  Sign in to continue
                </span>
                <Link href={'/login'} className='mb-8'>
                  <Button size={"lg"} className='scale-110'>Join Now</Button>
                </Link>
              </div>
            )} */}

            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={handlePreviousStep} variant="secondary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNextStep} disabled={!session}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="mb-8 flex w-full flex-col items-center justify-center md:w-2/3"
          >
            <CreateForm
              session={session}
              selectedFileType={selectedFileType}
              question={question}
            />

            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={handlePreviousStep} variant="secondary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      <div className="mt-4 flex h-2 w-full gap-1.5 rounded-full md:w-2/3">
        <div
          className={`h-1.5 rounded-full ${
            step > 0 ? 'bg-primary' : 'bg-gray-200'
          }`}
          style={{ width: '33.33%' }}
        />
        <div
          className={`h-1.5 rounded-full ${
            step > 1 ? 'bg-primary' : 'bg-gray-200'
          }`}
          style={{ width: '33.33%' }}
        />
        <div
          className={`h-1.5 rounded-full ${
            step > 2 ? 'bg-primary' : 'bg-gray-200'
          }`}
          style={{ width: '33.33%' }}
        />
      </div>
      <p className="mt-4 text-center text-sm text-secondary-foreground/70">
        Step {step}/3
      </p>
    </div>
  );
};

export default CreateCarousel;
