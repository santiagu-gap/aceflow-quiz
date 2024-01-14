'use client';

import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';
import { ArrowUpRight, BookOpenCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { scrapeSite } from '@/utils/scrapeSite';

const CreateForm = ({
  session,
  selectedFileType,
  question
}: {
  session: Session | null;
  selectedFileType: string;
  question: string;
}) => {
  const [fileInfo, setFileInfo] = useState<File>();
  const [file, setFile] = useState<Blob | null>(null);
  const [buttonStatus, setButtonStatus] = useState({
    text: 'Make Quiz',
    disabled: false,
    pulse: false
  });
  const [ytLink, setYtLink] = useState('');
  const [urlLink, setUrlLink] = useState('');

  const router = useRouter();
  const { toast } = useToast();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      try {
        const file = event.target.files?.[0];
        if (file) {
          const arrayBuffer = await file.arrayBuffer();
          const blob = new Blob([new Uint8Array(arrayBuffer)], {
            type: file.type
          });
          const fileSize = file.size;
          console.log('File size:', fileSize);
          console.log('File type:', file.type);
          console.log('File name:', file.name);

          setFileInfo(file);
          setFile(blob);
        }
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const getTranscript = async () => {
    setButtonStatus({
      text: 'Getting youtube link...',
      disabled: true,
      pulse: true
    });

    const transcript = await axios.post(`/api/yt`, {
      data: {
        link: ytLink
      }
    });

    console.log(transcript.data);

    return transcript.data.docs;
  };

  async function getSources() {
    if (!file) {
      return;
    }

    if (file) {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 3000,
        chunkOverlap: 250,
        separators: ['\n', '\n\n', '\t']
      });

      const loader = new PDFLoader(file as Blob);
      let pdfDocs = await loader.loadAndSplit(splitter);

      // Remove null characters from each document in pdfDocs
      pdfDocs = pdfDocs.map(doc => {
        doc.pageContent = doc.pageContent.replace(/\0/g, '');
        return doc;
      });

      console.log(pdfDocs);

      return pdfDocs;
    }
  }

  async function getUrlSources() {
    const siteText = await scrapeSite([urlLink]);

    // console.log(siteText);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 8000,
      chunkOverlap: 250,
    });

    const siteDocs = await splitter.createDocuments([siteText]);

    return siteDocs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let docs: any = [];

    if (selectedFileType === 'pdf') {
      docs = await getSources();
    } else if (selectedFileType === 'yt') {
      const transcript = await getTranscript();
      docs = transcript;
    } else if (selectedFileType === 'url') {
      docs = await getUrlSources();
    }

    setButtonStatus({
      text: 'Uploading...',
      disabled: true,
      pulse: true
    });

    await axios
      .post(`/api/create`, {
        data: {
          title: 'another',
          docs: docs,
          userId: session?.user.id
        }
      })
      .then(res => {
        const quizId = res.data.quiz.id;

        axios
          .post(`/api/quiz`, {
            data: {
              id: quizId,
              question: question
            }
          })
          .then(res => {
            console.log(res.data);
            setButtonStatus({
              text: 'Quiz created 🎉',
              disabled: true,
              pulse: false
            });

            router.push(`/quiz/${quizId}`);
          })
          .catch(err => {
            console.log(err);
          });

        setButtonStatus({
          text: 'Creating quiz...',
          disabled: true,
          pulse: true
        });
      })
      .catch(err => {
        setButtonStatus({
          text: 'Error creating quiz',
          disabled: false,
          pulse: false
        });
        console.log(err);
      });
  }

  const ytMutation = useMutation({
    mutationFn: (link: string) => {
      setYtLink(link);

      return axios
        .post(`/api/yt/info`, {
          data: {
            link: link
          }
        })
        .then(response => response.data.basic_info);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Error getting video info',
        variant: 'destructive'
      });

      return null;
    }
  });

  const { data: ytInfo, isPending: ytIsPending, error: ytError } = ytMutation;

  console.log(ytInfo);

  return (
    <div className="flex w-full select-none flex-col gap-6">
      <h1 className="text-2xl font-semibold text-accent-foreground/70">
        {
          {
            pdf: 'Create with a PDF',
            yt: 'Create with a YouTube video',
            url: 'Create with a URL'
          }[selectedFileType]
        }
      </h1>
      <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
        <div className="flex flex-col gap-3">
          {selectedFileType === 'pdf' ? (
            <div className="relative w-full items-center rounded-lg border bg-background tracking-normal transition duration-1000 ease-in-out hover:scale-[1.02]">
              <label
                htmlFor="dropzone-file"
                className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg transition duration-500 ease-in-out hover:bg-secondary/30"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <FileText className="my-4 h-6 w-6 text-accent-foreground/70" />
                  <p className="mb-2 text-sm text-accent-foreground/70">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-accent-foreground/70">
                    Only PDFs are supported
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                  accept=".pdf" // Restricts file selection to PDFs
                  multiple={false} // Ensures only one file can be selected
                />
              </label>

              {file && (
                <div className="py-4 text-sm text-secondary-foreground">
                  <p className="font-bold">You uploaded 👇</p>
                  <p className="text-lg text-primary">{fileInfo!.name}</p>
                </div>
              )}
            </div>
          ) : selectedFileType === 'yt' ? (
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Link to YouTube video"
                type="text"
                name="ytLink"
                onChange={e => ytMutation.mutate(e.target.value)}
              />
              {ytInfo ? (
                <Card className="text-start">
                  <CardHeader className="flex flex-row gap-8">
                    <Link
                      href={`https://youtu.be/${ytInfo?.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-lg transition duration-500 ease-in-out hover:scale-105"
                    >
                      <div className="aspect-video h-28">
                        <Image
                          src={ytInfo?.thumbnail[0].url}
                          alt={ytInfo?.title}
                          fill
                          className="transform overflow-hidden rounded-lg border transition-all duration-500 ease-in-out group-hover:brightness-50"
                        />
                      </div>
                      <div className="absolute inset-0 hidden group-hover:flex group-hover:items-center group-hover:justify-center">
                        <span className="inline-flex items-center text-sm font-semibold text-white">
                          Open <ArrowUpRight className="ml-1 h-5 w-5" />
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-col space-y-2">
                      <CardTitle>{ytInfo?.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {ytInfo?.author}
                      </span>
                      <div>
                        <Badge className="text-xs">
                          <p>{ytInfo?.category}</p>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-ellipsis text-sm text-muted-foreground">
                      {ytInfo?.short_description}
                    </p>
                  </CardContent>
                </Card>
              ) : ytIsPending ? (
                <Card className="text-start">
                  <CardHeader className="flex flex-row gap-8">
                    <Skeleton className="aspect-video h-28 rounded-lg" />{' '}
                    {/* Replace the Image component */}
                    <div className="flex w-full flex-col space-y-2">
                      <Skeleton className="h-6 w-full rounded-lg" />{' '}
                      {/* Replace the CardTitle */}
                      <Skeleton className="h-4 w-3/4 rounded-lg" />{' '}
                      {/* Replace the author */}
                      <Skeleton className="h-4 w-1/4 rounded-lg" />{' '}
                      {/* Replace the Badge */}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full rounded-lg" />{' '}
                    {/* Replace the description */}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          ) : selectedFileType === 'url' ? (
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Link to URL"
                type="text"
                name="urlLink"
                onChange={e => setUrlLink(e.target.value)}
              />
            </div>
          ) : null}
          <Button
            type="submit"
            disabled={
              selectedFileType === 'pdf'
                ? !file
                : selectedFileType === 'yt'
                  ? !ytLink || !!ytError || ytIsPending
                  : selectedFileType === 'url'
                    ? !urlLink
                    : true
            }
          >
            <span
              className={
                cn(
                  buttonStatus.pulse && 'animate-pulse',
                  buttonStatus.disabled && 'cursor-not-allowed'
                ) + 'inline-flex items-center gap-2'
              }
            >
              {buttonStatus.text}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
