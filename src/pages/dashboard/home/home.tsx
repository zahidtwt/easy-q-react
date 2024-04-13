import { useState } from "react";
import Madrasas from "./components/madrasas";
import QuestionPapers from "./components/question-papers";

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="text-center space-y-6 relative h-full">
      <div className="grid grid-cols-2 gap-4 justify-between p-1 mx-0 sm:mx-10 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <button
          onClick={() => {
            setActiveTab(1);
          }}
          className={`rounded-full p-1 ${activeTab === 1 ? "bg-gradient-to-r  from-indigo-500 to-indigo-500 text-slate-50" : ""}`}>
          All Madrasa
        </button>
        <button
          onClick={() => {
            setActiveTab(2);
          }}
          className={`rounded-full p-1 ${activeTab === 2 ? "bg-gradient-to-l from-pink-500 to-pink-500 text-slate-50" : ""}`}>
          Your work
        </button>
      </div>

      <button
        className="self-center rounded-full absolute bottom-5 right-3 bg-slate-950 p-2 text-white"
        onClick={() => {}}>
        Add Madrasa
      </button>

      {activeTab === 1 && <Madrasas />}
      {activeTab === 2 && <QuestionPapers />}
    </div>
  );
};

export default Home;
