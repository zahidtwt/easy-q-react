/*
  follow the questionPatternList constant from src/constant/patternList.ts
  and apply this key to the patternKey prop in the PatternViews component
*/

import { Badge } from "@/components/ui/badge";

const WordByWordPatternView = ({ value }: { value: null | string[] }) => {
  if (value === null) return <p>----, ----, ----</p>;
  return (
    <div className="flex flex-wrap gap-2 p-2 ml-5">
      {value.map((question, index) => (
        <div key={index}>
          <Badge variant={"secondary"}>{question}</Badge>
        </div>
      ))}
    </div>
  );
};

const OneLineQuestionPatternView = ({ value }: { value: null | string[] }) => {
  if (value === null)
    return (
      <div>
        <p>----------?</p>
        <p>----------|</p>
      </div>
    );
  return (
    <ul className="ml-5">
      {value.map((question, index) => (
        <li key={index}>
          <p>{question}</p>
        </li>
      ))}
    </ul>
  );
};

const QuestionWithOptionsPatternView = ({ value }: { value: null | string[] }) => {
  const chunkArray = (array: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  if (value === null)
    return (
      <div>
        <p>----------?</p>
        <p>----</p>
        <p>----</p>
        <p>----</p>
        <p>----</p>
      </div>
    );
  return (
    <div>
      {chunkArray(value, 5).map((chunk, index) => (
        <div
          key={index}
          className="mb-3 ml-5">
          <h3 className="question">{chunk[0]}</h3>
          <ul className="answers ml-5">
            {chunk.slice(1).map((answer, idx) => (
              <li
                key={idx}
                className="answer">
                {answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TableMatchPatternView = ({ value }: { value: null | string[] }) => {
  if (value === null)
    return (
      <div>
        <p>---- | ----</p>
        <p>---- | ----</p>
        <p>---- | ----</p>
      </div>
    );
  return (
    <div>
      {value.map((question, index) => (
        <p key={index}>{question}</p>
      ))}
    </div>
  );
};

const FillInTheBlanksPatternView = ({ value }: { value: null | string[] }) => {
  if (value === null)
    return (
      <div>
        <p>----___----,</p>
        <p>----___----|</p>
        <p>----___----?</p>
      </div>
    );
  return (
    <div>
      {value.map((question, index) => (
        <p key={index}>{question}</p>
      ))}
    </div>
  );
};

const QuestionWithStoryPatternView = ({ value }: { value: null | string[] }) => {
  if (value === null)
    return (
      <div className="text-start">
        <p>-----------------</p>
        <p>---------- ||</p>
        <p>----?</p>
        <p>----?</p>
        <p>----?</p>
        <p>----?</p>
      </div>
    );
  return (
    <div>
      {value.map((question, index) => (
        <p key={index}>{question}</p>
      ))}
    </div>
  );
};

const PatternViews = ({ patternKey, value }: { patternKey: string; value: null | string[] }) => {
  const patternElements = {
    word_by_word: <WordByWordPatternView value={value} />,
    one_line_question: <OneLineQuestionPatternView value={value} />,
    question_with_options: <QuestionWithOptionsPatternView value={value} />,
    table_match: <TableMatchPatternView value={value} />,
    feel_in_the_blanks: <FillInTheBlanksPatternView value={value} />,
    question_with_story: <QuestionWithStoryPatternView value={value} />,
  };

  return <div>{patternElements[patternKey as keyof typeof patternElements]}</div>;
};

export default PatternViews;
