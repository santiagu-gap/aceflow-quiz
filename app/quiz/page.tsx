"use client";

import QuizFrame from "@/components/quiz";
import practiceQuestions from "./practiceQuestions.json";
import CoolBlur from "@/components/cool-blur";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar session={null}  />
      <CoolBlur />

      <div className="pt-8">
        <QuizFrame questions={practiceQuestions} id={"hi"} />
      </div>
    </div>
  );
};

export default Home;
