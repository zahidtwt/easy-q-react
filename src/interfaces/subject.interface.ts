export interface ISubject {
  _id: string;
  name: string;
  code: string;
  coverPhoto: string;
  active: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubjectPayload extends Omit<ISubject, "_id" | "createdAt" | "updatedAt" | "active"> {}
export interface IEditSubjectPayload extends Omit<ISubject, "createdAt" | "updatedAt"> {}
