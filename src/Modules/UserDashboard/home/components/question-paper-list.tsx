import RenderListItems from "@/components/render-list-items";
// import { boardNameMapping, classNameMapping, subjectNameMapping } from "@/interfaces/dummy-name-mappings";
import { IQuestionPaperRes } from "@/interfaces/question-paper.interface";
// import { Download, Share, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { IQuestionPaper } from "@/interfaces/question.interface"; // need to remove
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BookCard = ({ questionPaper }: { questionPaper: IQuestionPaperRes }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex bg-white rounded-lg shadow-lg cursor-pointer w-full"
      onClick={() => navigate(`/prepare-questions/${questionPaper._id}`)}>
      {/* Left Side: Book Image */}
      <div className="w-1/3 max-h-40">
        <Avatar className="border border-gray-200 flex justify-center items-center rounded-l-lg rounded-r-none h-full w-full ">
          <AvatarImage
            src={questionPaper.subject.coverPhoto}
            alt={`${questionPaper.subject.name}'s Picture`}
          />
          <AvatarFallback className="uppercase rounded-l-lg rounded-r-none w-full h-40">
            {questionPaper.subject.name.slice(0, 3)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Right Side: Book Details */}
      <div className="w-2/3 m-4 flex justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{questionPaper.subject.name}</h3>
          <p className="text-sm text-gray-600">
            {questionPaper.examName} - {questionPaper.examYear}
          </p>
          <p className="text-sm text-gray-600">{questionPaper.classId.name}</p>
          <p className="text-sm text-gray-600">{moment(questionPaper.createdAt).format("DD-MMMM-YYYY")}</p>
          <p className="text-sm text-gray-600 truncate">{questionPaper.institute.name}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col justify-between">
          {/* <Trash2 className="text-gray-500 cursor-pointer hover:text-red-600" /> */}
          {/* <Share className="text-gray-500 cursor-pointer hover:text-blue-600" /> */}
          {/* <Download className="text-gray-500 cursor-pointer hover:text-green-600" /> */}
        </div>
      </div>
    </div>
  );
};

// export default BookCard;

const QuestionPaperList = ({ questionPapers }: { questionPapers: IQuestionPaperRes[] }) => {
  return (
    <RenderListItems
      items={questionPapers}
      className="space-y-3"
      renderItem={(questionPaper: IQuestionPaperRes) => (
        <BookCard
          questionPaper={questionPaper}
          key={questionPaper._id}
        />
      )}
    />
  );
};

export default QuestionPaperList;
