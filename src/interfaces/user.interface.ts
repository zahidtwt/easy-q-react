import { IUserRole } from "./userRole.interface";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountStatus: string;
  role: IUserRole;
  email?: string;
  balance?: number;
  totalQuestions?: number;
  totalInstitutes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
