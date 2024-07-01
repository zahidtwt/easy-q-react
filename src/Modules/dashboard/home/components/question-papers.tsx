import { Card } from "@/components/ui/card";
import QuestionPaperList from "./question-paper-list";
import { errorHandler } from "@/utils/errorHandler";
import useGetQuestionPaper from "@/hooks/useGetQuestionPaper";

const QuestionPapers = () => {
  const { isLoading: loading, isSuccess, data: questionPapers, isError, error } = useGetQuestionPaper({});

  if (isError) return <>{errorHandler(error)}!</>;
  if (loading) return <>Loading...</>;
  return (
    <Card className="p-2 rounded-md shadow-lg bg-white/20">
      {isSuccess && <QuestionPaperList questionPapers={questionPapers} />}
    </Card>
  );
};

export default QuestionPapers;
