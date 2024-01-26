import QuizFrame from "@/components/quiz";
import practiceQuestions from "./practiceQuestions.json";
import CoolBlur from "@/components/cool-blur";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
          <Navbar session={null} />
          <CoolBlur />
    
          <div className="pt-8">
          <QuizFrame questions={practiceQuestions} id={"hi"}/>
          </div>
        </div>
      );
}
 
export default Home;