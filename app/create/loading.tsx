import Image from "next/image";
import { Button } from '@/components/ui/button';

interface LoadingProps {
  currentState?: string;
  feedback?: string;
  setFeedback?: React.Dispatch<React.SetStateAction<string>>;
  feedbackSubmit?: () => void;
}

const Loading: React.FC<LoadingProps> = ({
  currentState,
  feedback,
  setFeedback,
  feedbackSubmit,
}) => {
  return (
    <div className="flex w-screen flex-col items-center pt-10 text-center">
      <h1 className="mx-2 mb-4 text-3xl font-bold md:mx-0 md:text-5xl">
        Are you ready to level up?
      </h1>
      <p className="mx-6 mb-6 text-sm md:mx-0 md:text-lg">
        Your practice questions will generate in less than 60 seconds
      </p>

      <div className="spinning-container">
        <Image
          src={"/icon-removebg.png"}
          height={3412 / 10}
          width={2376 / 10}
          alt=""
          className="px-6 md:px-0"
        />
        {/* <Image src={"/earth-removebg.png"} height={3412/10} width={2376/10} alt="" className="animate-spin px-6 md:px-0"/> */}
      </div>
      <div className="flex flex-col items-center justify-center pt-4 ">
        <div className="flex items-end text-lg font-bold md:text-2xl">
          <Image
            src={"/bulb.svg"}
            height={2000 / 18}
            width={1000 / 18}
            alt=""
            className="w-12 md:w-14"
          />
          <span className="pb-3 pl-2">Did you know?</span>
        </div>
        <div className="mx-4 text-base font-light md:mx-[22%] md:text-xl">
          <span>
            Research shows that doing practice questions increases test results,
            while re-reading notes is shown to be ineffective.
          </span>
          <br />
          <span> Aceflow lets you practice infinitely to ace school.</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-5 pt-10 md:px-0 md:pt-20">
        <label
          htmlFor="feedback"
          className="block text-base font-semibold md:text-2xl"
        >
          In the meantime, help your classmates by sharing Aceflow!{" "}
        </label>

        <div className="mt-8 flex justify-center gap-4">
              <Button className="h-14 text-2xl font-semibold md:h-16 md:text-3xl md:font-medium rounded-md px-8" >
                Boost your friends ⚡
              </Button>
            </div>

        {/* <p className="mt-2 text-sm text-gray-600 md:text-lg">
          Your feedback helps us build better tools for you.
        </p> */}
      </div>
    </div>
  );
};

export default Loading;
