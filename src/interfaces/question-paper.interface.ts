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
  _id: string;
  question: string[];
  questionInput: string;
  questionCategoryId: IQuestionCategory;
  position: number;
  marks: number;
}

export interface IEditQuestionPaperCategoryPayload {
  marks: number;
  position: number;
  question: string[];
  questionInput: string;
  questionCategoryId: string;
  questionPaperId: string;
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
  questionCategory: questionCategoryRes[];
  // markView: string;
  // subMarkView: string;
  primarySymbol: string;
  secondarySymbol: string;
  optionSymbol: string;
  downloadCount: number;
  examName: string;
  examYear: number;
  examDuration: number;
  examFullMarks: number;
  createdAt?: Date;
  updatedAt?: Date;
}
