import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
import EducationBoardList from "./Components/EducationBoardList";
import SelectInstitution from "./Components/SelectInstitution";
import SelectClass from "./Components/SelectClass";
import SelectSubject from "./Components/SelectSubject";
import { EducationBoard } from "@/interfaces/education-board";
import { IInstitution } from "@/interfaces/institution";
import { ISubject } from "@/interfaces/subject.interface";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IClassRes } from "@/interfaces/class.interface";
import { Button } from "@/components/ui/button";
import ExamDetailOfQuestionPaper from "./Components/ExamDetailOfQuestionPaper";
import { IExamDetail, IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import { ArrowLeft } from "lucide-react";
import { useCreateQuestionPaper } from "@/hooks/useQuestionPaper";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const InitializeQuestionPaper = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>({} as EducationBoard);
  const [selectedInstitution, setSelectedInstitution] = useState<IInstitution>({} as IInstitution);
  const [selectedClass, setSelectedClass] = useState<IClassRes>({} as IClassRes);
  const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);
  const [examDetail, setExamDetail] = useState<IExamDetail>({} as IExamDetail);

  const [currentTab, setCurrentTab] = useState<number>(1);

  const dataDecorator = (data: IQuestionPaperRes) => {
    navigate(`/prepare-questions/${data._id}`);
    return data;
  };

  const { mutate: createQuestionPaperFunc, isPending: questionPaperCreationLoading } = useCreateQuestionPaper({
    dataDecorator,
  });

  const createQuestionPaper = () => {
    const payload = {
      subject: selectedSubject._id,
      classId: selectedClass._id,
      board: selectedBoard._id,
      institute: selectedInstitution._id,
      questionCategory: [],
      markView: "1",
      subMarkView: "a",
      downloadCount: 0,
      examName: examDetail.examName,
      examYear: examDetail.examYear,
      examDuration: examDetail.examDuration,
      examFullMarks: examDetail.examFullMarks,
    };

    createQuestionPaperFunc(payload);
  };

  return (
    <div className="relative max-h-full h-full px-3">
      <div className="flex items-center justify-center min-h-screen">
        {currentTab === 1 && (
          <SelectInstitution
            setCurrentTab={setCurrentTab}
            setSelectedInstitution={setSelectedInstitution}
          />
        )}
        {currentTab === 2 && selectedInstitution && (
          <EducationBoardList
            setCurrentTab={setCurrentTab}
            setSelectedBoard={setSelectedBoard}
            selectedInstitution={selectedInstitution}
          />
        )}
        {currentTab === 3 && selectedBoard && (
          <SelectClass
            selectedBoardId={selectedBoard._id}
            setCurrentTab={setCurrentTab}
            setSelectedClass={setSelectedClass}
          />
        )}
        {currentTab === 4 && (
          <SelectSubject
            classId={selectedClass._id}
            setCurrentTab={setCurrentTab}
            setSelectedSubject={setSelectedSubject}
          />
        )}
        {currentTab === 5 && (
          <ExamDetailOfQuestionPaper
            setCurrentTab={setCurrentTab}
            examDetail={examDetail}
            setExamDetail={setExamDetail}
          />
        )}
        {currentTab === 6 && (
          <Card className="max-w-md w-full">
            <CardHeader className="bg-purple-500 text-white text-center font-bold rounded-t-lg p-4 relative">
              <Button
                disabled={questionPaperCreationLoading}
                className="absolute left-2 top-2"
                variant={"ghost"}
                onClick={() => {
                  setCurrentTab((pre) => pre - 1);
                }}>
                <ArrowLeft size={24} />
              </Button>

              {selectedInstitution.name}
            </CardHeader>
            <CardContent className="grid grid-cols-6 gap-4 mt-4  max-h-[40vh]">
              <div className="col-span-4 bg-purple-300 text-center py-2 rounded-lg">
                {examDetail.examName ?? "---- -----"} - {examDetail.examYear ?? "YYYY"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">{selectedClass.name}</div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                সময়ঃ {examDetail.examDuration ? examDetail?.examDuration / 60 + " ঘন্টা" : "----"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">বিষয়ঃ {selectedSubject.name}</div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                পূর্ণমানঃ {examDetail.examFullMarks ?? "----"}
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full">
                <div className="flex justify-center pt-1">
                  <Button
                    className="w-60"
                    disabled={questionPaperCreationLoading}
                    onClick={createQuestionPaper}>
                    {questionPaperCreationLoading ? (
                      <ClipLoader
                        size={24}
                        color={"#ffffff"}
                      />
                    ) : (
                      "Initialize Question Paper"
                    )}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InitializeQuestionPaper;
