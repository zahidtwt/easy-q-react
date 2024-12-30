import { IUserRole } from "./userRole.interface";

interface ISubscription {
  isSubscribed: boolean;
  startDate: string;
  endDate: string;
  questionSetQuantity: number;
  accessiblePermissions: string[];
  packageDuration: number;
  description: string;
  _id: string;
}

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
  freeSubscription: ISubscription;
  customSubscription: ISubscription;
  premiumSubscription: ISubscription;
  imageURL?: string;
}
