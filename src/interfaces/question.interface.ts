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

export interface IQuestionPayload {
  question: string[];
  questionCategory: string;
  lesson: string;
}
export interface IQuestion {
  _id: string;
  question: string[];
  answer?: string;
  questionCategory: string | IQuestionCategory;
  lesson: string | ILesson;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestionPayload extends Omit<IQuestion, "_id" | "createdAt" | "updatedAt" | "tags"> {}
export interface IEditQuestionPayload extends Pick<IQuestion, "_id" | "questionCategory" | "question" | "tags"> {}
