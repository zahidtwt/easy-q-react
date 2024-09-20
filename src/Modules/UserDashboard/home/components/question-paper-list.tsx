import RenderListItems from "@/components/render-list-items";
import { CardContent } from "@/components/ui/card";
// import { boardNameMapping, classNameMapping, subjectNameMapping } from "@/interfaces/dummy-name-mappings";
import { IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import { useNavigate } from "react-router-dom";
// import { IQuestionPaper } from "@/interfaces/question.interface"; // need to remove

const QuestionPaperCard = ({ questionPaper }: { questionPaper: IQuestionPaperRes }) => {
  const navigate = useNavigate();
  // console.log(questionPaper);
  const boardName = questionPaper.board.name ?? "Unknown Board";
  const className = questionPaper.classId.name ?? "Unknown Class";
  const subjectName = questionPaper.subject.name ?? "Unknown Subject";
  // const boardName = boardNameMapping[questionPaper.board.name] || "Unknown Board";
  // const className = classNameMapping[questionPaper.classId.name] || "Unknown Class";
  // const subjectName = subjectNameMapping[questionPaper.subject.name] || "Unknown Subject";
  return (
    <div
      className="flex flex-col justify-center items-center cursor-pointer"
      onClick={() => navigate(`/prepare-questions/${questionPaper._id}`)}>
      <div className="bg-white size-20 shadow-md rounded-sm border border-gray-500"></div>
      <p>
        {boardName} {className}
      </p>
      <small>{subjectName} Question</small>
    </div>
  );
};

const QuestionPaperList = ({ questionPapers }: { questionPapers: IQuestionPaperRes[] }) => {
  return (
    <CardContent>
      <RenderListItems
        items={questionPapers}
        className="grid grid-cols-3 gap-4 mt-4 "
        renderItem={(questionPaper: IQuestionPaperRes) => (
          <QuestionPaperCard
            questionPaper={questionPaper}
            key={questionPaper._id}
          />
        )}
      />
    </CardContent>
  );
};

export default QuestionPaperList;
