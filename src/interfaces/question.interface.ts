export interface IQuestionPaper {
  _id: string;
  Exam_name: string;
  Total_Marks: number;
  Time: number;
  Institution_id: string;
  Education_Board_id: string;
  Class_id: string;
  Subject_id: string;
  Questions: IQuestion[];
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

export interface IQuestionPayload extends Omit<IQuestion, "_id" | "createdAt" | "updatedAt" | "userId"> {}
export interface IEditQuestionPayload extends Omit<IQuestion, "createdAt" | "updatedAt"> {}
