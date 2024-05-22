export interface EducationBoard {
  id: string;
  name: string;
  address: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateEducationBoardPayload extends Omit<EducationBoard, "id" | "createdAt" | "updatedAt"> {}
export interface IEditEducationBoardPayload extends Omit<EducationBoard, "createdAt" | "updatedAt"> {}
