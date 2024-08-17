export interface ISubject {
  _id: string;
  name: string;
  code: string;
  //   book?: IBook;
  class?: string;
  questionCategory?: string[];
  active: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPattern {
  _id: string;
  input_pattern: string;
  output_pattern: string;
  converterFunc: () => void;
}
export interface IQuestionCategory {
  _id: string;
  title: string;
  pattern: IPattern;
}

export interface IQuestion {
  _id: string;
  question: string;
  answer: string;
  questionCategory: string;
  classId: string;
  subjectId: string;
  // bookId: string;
  // bookVersion: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubjectNew {
  _id: string;
  subjectName: string;
  subjectCode: string;
  classId: string;
  boardId: string;
  // questionCategory: IQuestionCategory[];
  questionCategory: [
    {
      _id: string;
      title: string;
      pattern: {
        _id: string;
        input_pattern: string;
        output_pattern: string;
        converterFunc: () => void;
      };
    },
  ];
  lessonList: [
    {
      lessonId: string;
      lessonName: string;
      questionList: [
        {
          questionCategoryId: string;
          question: string;
        },
      ];
    },
  ];
  active: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubjectPayload extends Omit<ISubject, "_id" | "createdAt" | "updatedAt" | "active"> {}
export interface IEditSubjectPayload extends Omit<ISubject, "createdAt" | "updatedAt"> {}
