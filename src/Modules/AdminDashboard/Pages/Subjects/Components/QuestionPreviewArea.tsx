import { Button } from "@/components/ui/button";

const QuestionPreviewArea = () => {
  return (
    <div>
      <h2>Question Preview Area</h2>
      <div className="flex justify-center align-middle gap-14">
        <Button
          variant="secondary"
          onClick={() => {
            //   dataDecorator(false);
          }}>
          Back
        </Button>
        <Button
          onClick={() => {
            //   handleQuestionChange();
          }}
          className="cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QuestionPreviewArea;
