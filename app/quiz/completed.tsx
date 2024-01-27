import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MyComponentProps {
  score: number;
}

const Completed: React.FC<MyComponentProps> = ({ score }) => {
  const router = useRouter();

  return (
    <div>
      <div className="mx-auto flex h-fit max-w-screen-sm flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Quiz Completed</h1>
          <p className="text-lg font-semibold md:text-2xl">
            Your score:{" "}
            <span className="font-semibold text-green-400">{score}</span> out of{" "}
            <span className="font-semibold text-blue-400">10</span>
          </p>
        </div>

        <div className="mx-7 text-center md:mx-0 md:mt-14">
          <Image
            src={"/arrow.svg"}
            height={3412 / 7}
            width={2376}
            alt=""
            className="h-48 w-48 md:h-72 md:w-72"
          />
          <p className="pt-6 text-sm md:text-lg">
            Practice lets you hit your targets.
          </p>
        </div>

        <div className="mt-8 grid gap-8 text-center">
          <p className="mx-auto text-xl md:text-3xl">
            Want to ace your next test? Keep practicing with more questions.
          </p>

          <Button
            onClick={() => {
              router.push(`/create`);
            }}
          >
            Generate another quiz.
          </Button>

          <p className="text-sm font-medium italic md:text-lg">
            Mastery is close.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Completed;
