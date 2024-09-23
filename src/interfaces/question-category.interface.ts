export interface IQuestionCategory {
  _id: string;
  subjectId: string;
  questionCategoryName: string;
  selectedPatternKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateQuestionCategoryPayload extends Omit<IQuestionCategory, "_id" | "createdAt" | "updatedAt"> {}
export interface IEditQuestionCategoryPayload extends Omit<IQuestionCategory, "createdAt" | "updatedAt"> {}
