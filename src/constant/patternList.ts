export const questionPatternList = {
  word_by_word: {
    id: "1",
    key: "word_by_word",
    title: "word by word",
    patternDetector: [","],
    method: (params: string): string[] => {
      return params.split(",");
    },
  },
  one_line_question: {
    id: "2",
    key: "one_line_question",
    title: "one line question",
    patternDetector: ["?", "|"],
    method: (params: string): string[] => {
      const res = params.split(/(?=[?|।|])/).map((str) => str.replace(/\n/g, "").trim());
      return res;
    },
  },
  question_with_options: {
    id: "3",
    key: "question_with_options",
    patternDetector: ["?", "|", ","],
    method: (params: string): string[] => {
      const lines = params.split("\n");
      const nonEmptyLines = lines.filter((line) => line.trim() !== "");
      return nonEmptyLines;
    },
  },
  table_match: {
    id: "4",
    key: "table_match",
    patternDetector: ["|", ","],
    method: (params: string): string[] => {
      const elements = params.split("\n").map((line) => line.trim());
      return elements;
    },
  },
  feel_in_the_blanks: {
    id: "5",
    key: "feel_in_the_blanks",
    patternDetector: [],
    method: (params: string): string[] => {
      return [params];
    },
  },
  // question_with_story: {
  //   id: "6",
  //   key: "question_with_story",
  //   patternDetector: "||?",
  //   method: (params: string): string[] => {
  //     return [params];
  //   },
  // },
};
