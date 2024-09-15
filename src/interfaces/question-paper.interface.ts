import { IClassRes } from "./class.interface";
import { EducationBoard } from "./education-board";
import { IInstitution } from "./institution";
import { IQuestionCategory } from "./question-category.interface";
import { ISubject } from "./subject.interface";

export interface IExamDetail {
  examName: string;
  examYear: number;
  examDuration: number;
  examFullMarks: number;
}

export interface questionCategory {
  question: string[];
  questionInput: string;
  questionCategoryId: string;
  position: number;
  marks: number;
}

export interface questionCategoryRes {
  question: string[];
  questionInput: string;
  questionCategoryId: IQuestionCategory;
  position: number;
  marks: number;
}

export interface IQuestionPaperPayload {
  _id?: string;
  subject: string;
  classId: string;
  board: string;
  institute: string;
  questionCategory: questionCategory[];
  markView: string;
  subMarkView: string;
  downloadCount: number;
  examName: string;
  examYear: number;
  examDuration: number;
  examFullMarks: number;
}

export interface IQuestionPaperRes {
  _id: string;
  subject: ISubject;
  classId: IClassRes;
  board: EducationBoard;
  institute: IInstitution;
  questionCategory: questionCategory[];
  markView: string;
  subMarkView: string;
  downloadCount: number;
  examName: string;
  examYear: number;
  examDuration: number;
  examFullMarks: number;
  createdAt?: Date;
  updatedAt?: Date;
}
