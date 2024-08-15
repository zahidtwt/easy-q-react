import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const QuestionPatterns = () => {
  // word meaning, ===> ,
  // make word from juktoborno, ===> ,
  // Answer the Questions, ===> ? / |
  // Answer the descriptive questions, ===> ? / |
  // Read the passage below and answer the questions, ===> || / ? / |
  // Answer the short questions, ===> ? / |
  // antonym word,  ===> ,
  // make sentence, ===> ,
  // fill in the blanks, ===> ,
  // choose the correct answer with the given options, ===> ? / , / ||
  // Match right left from table, ===> | / ,

  const questionPattern = [
    {
      id: "1",
      name: "word_by_word",
      title: "word by word",
      patternDetector: ",",
      element: <p>----, ----, ----</p>,
      method: function name(params: string) {
        return params.split(",");
      },
    },
    {
      id: "2",
      name: "one_line_question",
      title: "one line question",
      patternDetector: "?|",
      element: (
        <div>
          <p>----------?</p>
          <p>----------|</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "3",
      name: "question_with_options",
      patternDetector: "?|,,,",
      element: <p>----------? ----, ----, ----, ----</p>,
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "4",
      name: "table_match",
      patternDetector: "| ,",
      element: (
        <div>
          <p>---- | ----</p>
          <p>---- | ----</p>
          <p>---- | ----</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "5",
      name: "feel_in_the_blanks",
      patternDetector: "|,",
      element: (
        <div>
          <p>----___----,</p>
          <p>----___----|</p>
          <p>----___----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "6",
      name: "question_with_story",
      patternDetector: "||?",
      element: (
        <div className="text-start">
          <p>-----------------</p>
          <p>---------- ||</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
  ];

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Question Patterns</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              //     onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Pattern</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {questionPattern.map((pattern) => (
              <div
                key={pattern.id}
                className="p-3 border-2 rounded-md text-center backdrop-blur-sm bg-slate-600/10">
                {pattern.element}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default QuestionPatterns;
