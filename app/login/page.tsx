import CoolBlur from "@/components/cool-blur";
import LoginButton from "@/components/login";
import LogoutButton from "@/components/logout";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  console.log(session?.user);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-primary to-pink-600 text-secondary-foreground">
      <div className="px-4 md:px-10 py-40 md:w-[35%] text-white">
        <h3 className="px-1 text-center text-xl md:text-left md:text-xl lg:text-2xl">
          Welcome to Aceflow.
        </h3>
        <h1 className="text-center text-2xl font-semibold md:text-left md:text-3xl lg:text-4xl">
          Accelerate your learning, and unlock a new future.
        </h1>
      </div>

      <div
        className="flex flex-col items-center justify-center
            dark:bg-background/90 bg-background/95 text-secondary-foreground
            md:absolute 
            md:inset-y-0 
            md:right-0 
            md:w-[65%] 
            md:rounded-[3rem]
            hover:rounded-[rem]
            transition-all duration-1000 ease-in-out
            gap-y-20 my-4 mr-4 hover:my-2 hover:mr-2"
      >
        <div className="py-4 text-center text-xl font-bold px-24 md:text-5xl lg:text-6xl">
          Your next journey starts <span className="text-primary">here</span>
        </div>

        <div className="inline-flex justify-center px-24 w-full">
          {session?.user ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
}
