import { useState } from "react";
import Madrasas from "./components/madrasas";
import QuestionPapers from "./components/question-papers";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="relative max-h-full h-full px-2">
      <div className="absolute top-2 right-1 left-1 z-10">
        <div className="grid grid-cols-2 gap-4 justify-between p-1 mx-0 sm:mx-10 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200">
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
      </div>

      <button
        className="self-center rounded-full absolute bottom-3 right-2 bg-slate-950 px-3 py-2 text-white"
        onClick={() => {
          {
            activeTab === 1 ? navigate("/add-madrasa") : navigate("/");
          }
        }}>
        {activeTab === 1 ? "Add Madrasa" : "Add New Question"}
      </button>

      <div className="h-full overflow-auto">
        <div className="h-14"></div>
        {activeTab === 1 && <Madrasas />}
        {activeTab === 2 && <QuestionPapers />}
      </div>
    </div>
  );
};

export default Home;
