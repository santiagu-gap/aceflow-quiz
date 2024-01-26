import CoolBlur from "@/components/cool-blur";
import LoginButton from "@/components/login";
import LogoutButton from "@/components/logout";
import { getAuthSession } from "@/lib/auth";
import Navbar from "../components/Navbar";

export default async function Home() {
  const session = await getAuthSession();

  console.log(session?.user);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-primary to-pink-600 text-secondary-foreground">
      <Navbar session={null} bg/>
      <div className="relative flex flex-grow w-screen ">
        <div className="px-4 md:px-10 py-40 md:w-[35%] text-white">
          <h1 className="text-center text-2xl font-semibold md:text-3xl lg:text-4xl">
            Aceflow helps students succeed faster than ever{" "}
          </h1>
        </div>

        <div
          className="flex flex-col items-center justify-center
          dark:bg-background/90 bg-background/95 text-secondary-foreground
          md:absolute 
          md:inset-y-0 
          md:right-0 
          md:w-[62%] 
          md:rounded-[3rem]
          hover:rounded-[rem]
          transition-all duration-1000 ease-in-out
          gap-y-20 my-8 mr-8 hover:my-4 hover:mr-4"
        >
          <div className="py-4 text-center text-xl font-bold px-24 md:text-5xl lg:text-6xl">
            Your next journey starts <span className="text-primary">here</span>
          </div>

          <div className="inline-flex justify-center px-24 w-full">
            {session?.user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
