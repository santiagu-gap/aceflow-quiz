import QuizFrame from "@/components/quiz";
import practiceQuestions from "./practiceQuestions.json";

const Home = () => {
    return ( <div>
        <QuizFrame questions={practiceQuestions} id={"hi"}/>
    </div> );
}
 
export default Home;