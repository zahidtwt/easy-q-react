import { EducationBoard } from "./education-board";
import { ISubject } from "./subject.interface";

export interface IClassRes {
  _id: string;
  name: string;
  educationBoard: EducationBoard;
  subjectList: ISubject[];
  createdAt: string;
  updatedAt: string;
}

export interface IClassPayload {
  _id: string;
  name: string;
  educationBoard: string;
  subjectList: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateClassPayload extends Pick<IClassPayload, "name" | "educationBoard" | "subjectList"> {}
export interface IEditClassPayload extends Pick<IClassPayload, "_id" | "name"> {}
