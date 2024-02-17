import Navbar from "../../components/Navbar";
import CoolBlur from "@/components/cool-blur";
import QuizFrame from "@/components/quiz";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Question } from "@/types";
// import Loading from "./loading";
// import { getSentMessagesTutor } from "@/util/users";

async function getQuiz(id: string) {
  "use server";

  const quiz = db.quiz.findUnique({
    where: {
      id: id,
    },
  });

  return quiz;
}

const Quiz = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const quiz = await getQuiz(params?.id);

  const questions = quiz?.questions;

  console.log(questions);

  return (
    <div>
      <Navbar />
      <CoolBlur />

      <div className="pt-8">
      <QuizFrame questions={questions} id={params?.id} />
        {/* {questions ?  />
        :<Loading />} */}
      </div>
    </div>
  );
};

export default Quiz;
