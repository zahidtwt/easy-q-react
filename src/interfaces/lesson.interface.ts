export interface ILesson {
  _id: string;
  subjectId: string;
  lessonName: string;
  lessonNo: number;
  lessonId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateLesson extends Omit<ILesson, "_id" | "createdAt" | "updatedAt"> {}
export interface IEditLesson extends Omit<ILesson, "createdAt" | "updatedAt"> {}
