import { Button } from "@/components/ui/button";
import Image from "next/image";

const QuizReady = () => {
    return ( <div className="h-screen text-center w-full flex flex-col items-center justify-center ">
    <div className="text-md md:text-xl font-bold">Your quiz is ready!</div>

    {/* <span className='text-xl font-medium'>Customize your quiz: </span> */}
    {/* <div className='flex flex-col items-center justify-center'> <Checkbox label="Timed Quiz" setProPrompt={setProPrompt} membership={membershipType}/></div> */}

    <div className="grid gap-4 justify-items-center">
      <div className="text-5xl md:text-6xl font-bold">Quiz title</div>

      <Image
        src={"/crown.svg"}
        height={3412 / 11}
        width={2376 / 11}
        alt=""
        className="px-6 md:px-0 md:h-52 md:w-52"
      />

      <Button className="mt-4 text-3xl font-semibold md:text-4xl md:font-medium rounded-md p-8 md:p-10  md:px-14">
        Let&apos;s do this
      </Button>
    </div>
  </div> );
}
 
export default QuizReady;