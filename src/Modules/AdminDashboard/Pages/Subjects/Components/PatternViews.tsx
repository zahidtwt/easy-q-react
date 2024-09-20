/*
  follow the questionPatternList constant from src/constant/patternList.ts
  and apply this key to the patternKey prop in the PatternViews component
*/

import { Badge } from "@/components/ui/badge";
import { questionPatternList } from "@/constant/patternList";

const WordByWordPatternView = ({ value, func }: { value: null | string[]; func: (value: string[]) => void }) => {
  if (value === null) return <p>----, ----, ----</p>;

  const selectedQuestion = (value: string) => {
    if (func) {
      func([value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 ml-5">
      {value.map((question, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => selectedQuestion(question)}>
          <Badge variant={"secondary"}>{question}</Badge>
        </div>
      ))}
    </div>
  );
};

const OneLineQuestionPatternView = ({ value, func }: { value: null | string[]; func: (value: string[]) => void }) => {
  if (value === null)
    return (
      <div>
        <p>----------?</p>
        <p>----------|</p>
      </div>
    );

  const selectedQuestion = (value: string) => {
    if (func) {
      func([value]);
    }
  };
  return (
    <ul className="ml-5">
      {value.map((question, index) => (
        <li
          onClick={() => selectedQuestion(question)}
          key={index}>
          <p>{question}</p>
        </li>
      ))}
    </ul>
  );
};

const QuestionWithOptionsPatternView = ({
  value,
  func,
}: {
  value: null | string[];
  func: (value: string[]) => void;
}) => {
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

  const selectedQuestion = (value: string[]) => {
    if (func) {
      func(value);
    }
  };

  return (
    <div>
      {chunkArray(value, 5).map((chunk, index) => (
        <div
          onClick={() => selectedQuestion(chunk)}
          key={index}
          className="mb-3 ml-5 bg-white p-4 w-auto rounded-lg">
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

const TableMatchPatternView = ({ value, func }: { value: null | string[]; func: (value: string[]) => void }) => {
  if (value === null)
    return (
      <div>
        <p>Left Header</p>
        <p>Right Header</p>
        <p>Left Element 1</p>
        <p>Left Element 2</p>
        <p>......</p>
        <p>Left Element n</p>
        <p>|</p>
        <p>Right Element 1</p>
        <p>Right Element 2</p>
        <p>......</p>
        <p>Right Element n</p>
      </div>
    );

  const selectedQuestion = (value: string[]) => {
    if (func) {
      func(value);
    }
  };

  const separator = "|";
  const headers = value.slice(0, 2);
  const separatorIndex = value.indexOf(separator);
  const leftElements = value.slice(2, separatorIndex);
  const rightElements = value.slice(separatorIndex + 1);
  return (
    <div
      className="ml-5 bg-white p-4 w-auto rounded-lg"
      onClick={() => selectedQuestion(value)}>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-400 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leftElements.map((left, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{left}</td>
              <td className="border border-gray-400 p-2">{rightElements[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FillInTheBlanksPatternView = ({ value, func }: { value: null | string[]; func: (value: string[]) => void }) => {
  if (value === null)
    return (
      <div>
        <p>----___----,</p>
        <p>----___----|</p>
        <p>----___----?</p>
      </div>
    );

  const selectedQuestion = (value: string[]) => {
    if (func) {
      func(value);
    }
  };

  return (
    <div
      className="ml-5 "
      onClick={() => selectedQuestion(value)}>
      {/* {value.map((question, index) => (
        <p key={index}>{question}</p>
      ))} */}

      <pre className="bg-white p-4 w-auto rounded-lg">{value[0]}</pre>
    </div>
  );
};

const QuestionWithStoryPatternView = ({ value, func }: { value: null | string[]; func: (value: string[]) => void }) => {
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

  const selectedQuestion = (value: string) => {
    if (func) {
      func([value]);
    }
  };

  return (
    <div>
      {value.map((question, index) => (
        <p
          key={index}
          onClick={() => selectedQuestion(question)}>
          {question}
        </p>
      ))}
    </div>
  );
};

const PatternViews = ({
  patternKey,
  value,
  func,
  // previousValue,
}: {
  patternKey: string;
  value: null | string[];
  func?: (value: string) => void;
  // previousValue?: string;
}) => {
  const selectedQuestion = (value: string[]) => {
    if (func) {
      const inputString = questionPatternList[patternKey as keyof typeof questionPatternList].revert(value);
      // if (previousValue && previousValue !== "") {
      //   // inputString[0] = previousValue + " " + inputString;
      //   if (patternKey === "question_with_options" || patternKey === "one_line_question") {
      //     func(previousValue + "\n" + inputString);
      //   }

      //   if (patternKey === "feel_in_the_blanks" || patternKey === "table_match") {
      //     func(inputString);
      //   }

      //   if (patternKey === "word_by_word") {
      //     func(previousValue + "," + inputString);
      //   }
      // } else {
      // }
      func(inputString);
    }

    // console.log(value);
  };
  const patternElements = {
    word_by_word: (
      <WordByWordPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
    one_line_question: (
      <OneLineQuestionPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
    question_with_options: (
      <QuestionWithOptionsPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
    table_match: (
      <TableMatchPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
    feel_in_the_blanks: (
      <FillInTheBlanksPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
    question_with_story: (
      <QuestionWithStoryPatternView
        value={value}
        func={selectedQuestion}
      />
    ),
  };

  return <div>{patternElements[patternKey as keyof typeof patternElements]}</div>;
};

export default PatternViews;
