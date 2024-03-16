import Madrasas from "./components/madrasas";
import QuestionPapers from "./components/question-papers";

const Home = () => {
  return (
    <div className="py-2 text-center space-y-8 overflow-x-scroll">
      <Madrasas />

      <QuestionPapers />
    </div>
  );
};

export default Home;
