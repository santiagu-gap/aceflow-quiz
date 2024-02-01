'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChatRequestOptions } from 'ai';
import { useChat } from 'ai/react';
import { FormEvent, useRef, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';

export default function Chat({
  id,
  currentQuestion
}: {
  id: string;
  currentQuestion: string;
}) {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
    api: '/api/chat',
    body: {
      id: id,
      question: currentQuestion
    },
    onError: err => {
      console.log(err);
    },
    onResponse: res => {
      console.log('onRes', res);
      setIsStreaming(true);
    },
    onFinish: msg => {
      console.log('msg', msg);
      setIsStreaming(false);
      setIsThinking(false);
    }
  });

  const handleThinking = (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => {
    setIsThinking(true);
    handleSubmit(e, chatRequestOptions);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="relative lg:w-full mb-10">
      <CardHeader>
        <CardTitle>Acebot</CardTitle>
        <CardDescription>Try asking Acebot a question.</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full overflow-y-scroll h-[50vh]">
        <div className={`flex w-full flex-col gap-5 pb-8 h-full`}>
          {messages.map(message => (
            <div
              ref={
                message === messages[messages.length - 1]
                  ? messagesEndRef
                  : null
              }
              key={message.id}
              className={cn(
                'lg:w-sm lg:m flex flex-col gap-2 rounded-lg px-4 py-3',
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground shadow-xl shadow-primary/20'
                  : 'bg-muted shadow-xl shadow-muted/20'
              )}
            >
              <span
                className={`transition-all ${
                  message.role === 'assistant' && 'prose dark:prose-invert'
                }`}
              >
                <Markdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </Markdown>
              </span>
            </div>
          ))}
        </div>
        <form
          className="sticky bottom-0 z-20 flex w-full flex-row justify-between gap-4"
          onSubmit={handleThinking}
        >
          <Input
            name=""
            id=""
            value={input}
            onChange={handleInputChange}
            placeholder="Try asking a question"
            className="bg-background/50 backdrop-blur-md"
            tabIndex={1}
          />
          <Button type="submit" tabIndex={2}>
            {isStreaming && isThinking ? (
              <span className="inline-flex animate-pulse gap-2">
                Going <p>🚀</p>
              </span>
            ) : isThinking && !isStreaming ? (
              <span className="inline-flex animate-pulse gap-2">
                Thinking <p>🧠</p>
              </span>
            ) : (
              <span className="inline-flex gap-2">
                Ask <p>⚡️</p>
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
