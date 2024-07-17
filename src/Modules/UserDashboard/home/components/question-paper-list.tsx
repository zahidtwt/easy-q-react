import RenderListItems from "@/components/render-list-items";
import { CardContent } from "@/components/ui/card";
import { boardNameMapping, classNameMapping, subjectNameMapping } from "@/interfaces/dummy-name-mappings";
import { IQuestionPaper } from "@/interfaces/question.interface";

const QuestionPaperCard = ({ questionPaper }: { questionPaper: IQuestionPaper }) => {
  const boardName = boardNameMapping[questionPaper.Education_Board_id] || "Unknown Board";
  const className = classNameMapping[questionPaper.Class_id] || "Unknown Class";
  const subjectName = subjectNameMapping[questionPaper.Subject_id] || "Unknown Subject";
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white size-20 shadow-md rounded-sm border border-gray-500"></div>
      <p>
        {boardName} {className}
      </p>
      <small>{subjectName} Question</small>
    </div>
  );
};

const QuestionPaperList = ({ questionPapers }: { questionPapers: IQuestionPaper[] }) => {
  return (
    <CardContent>
      <RenderListItems
        items={questionPapers}
        className="grid grid-cols-3 gap-4 mt-4 "
        renderItem={(questionPaper: IQuestionPaper) => (
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
