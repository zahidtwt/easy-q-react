import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import QuestionPaperList from "./question-paper-list";
import useGetQuestionPaper from "../hooks/useGetQuestionPaper";
import { errorHandler } from "@/utils/errorHandler";

const QuestionPapers = () => {
  const { isLoading: loading, isSuccess, data: questionPapers, isError, error } = useGetQuestionPaper({});

  if (isError) return <>{errorHandler(error)}!</>;
  if (loading) return <>Loading...</>;
  return (
    <Card className="p-2 rounded-md shadow-lg ">
      <CardTitle className="border border-gray-400 rounded-md bg-slate-100 text-md font-medium mt-2">
        Your work
      </CardTitle>

      {isSuccess && <QuestionPaperList questionPapers={questionPapers} />}

      <Button
        className="self-center"
        onClick={() => {}}>
        Add new question
      </Button>
    </Card>
  );
};

export default QuestionPapers;
