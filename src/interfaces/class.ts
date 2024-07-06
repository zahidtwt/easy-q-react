export interface IClass {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateClassPayload extends Omit<IClass, "_id" | "createdAt" | "updatedAt"> {}
export interface IEditClassPayload extends Omit<IClass, "createdAt" | "updatedAt"> {}
