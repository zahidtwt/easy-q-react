import { ILesson } from "./lesson.interface";
import { IQuestionCategory } from "./question-category.interface";

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
  question: string[];
  questionCategory: string | IQuestionCategory;
  subject: string;
  lesson: string | ILesson;
  questionInput: string;
  answer?: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILessonListWithQuestion {
  _id: string;
  questions: IQuestion[];
  lesson: ILesson;
}

export interface IQuestionPayload {
  lesson: string;
  questionCategory: string;
  question: string[];
  questionInput: string;
  subject: string;
}
// export interface IQuestionPayload extends Omit<IQuestion, "_id" | "createdAt" | "updatedAt" | "tags"> {}
// export interface IEditQuestionPayload extends Omit<IQuestion, "createdAt" | "updatedAt"> {}
export interface IEditQuestionPayload {
  _id: string;
  lesson: string;
  questionCategory: string | IQuestionCategory;
  question: string[];
  questionInput: string;
  tags: string[];
  subject: string;
}
