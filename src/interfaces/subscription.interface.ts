import { IUser } from "./user.interface";

export interface IPackage {
  _id: string;
  packageName: string;
  packageType: string;
  questionSetQuantity: number;
  accessiblePermissions: string[];
  packagePrice: number;
  perQuestionSetPrice: number;
  approvedStatus: string;
  recommended: boolean;
  active: boolean;
  packageDuration: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubscription {
  _id: string;
  packageId: string;
  packageType: "free" | "custom" | "premium";
  packageName: string;
  questionSetQuantity: number;
  accessiblePermissions: string[];
  packagePrice: number;
  approvedStatus: "approved" | "pending" | "rejected";
  tnxId: string;
  user: string;
  packageDuration: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface ISubscriptionResponse
// make an interface of ISubscriptionResponse extending ISubscription and change the user type string to IUser\
export interface ISubscriptionResponse extends Omit<ISubscription, "user"> {
  user: IUser;
}

export interface ISubscriptionPackagePayload {
  tnxId: string;
  packageId: string;
  questionSetQuantity: number;
}

export function isUser(user: string | IUser): user is IUser {
  return (user as IUser)._id !== undefined;
}

// export interface IPackageCategory {
//   _id: "free" | "premium" | "custom";
//   packages: IPackage[];
// }

// export interface IPackageList {
//   isSuccess: boolean;
//   error: string | null;
//   data: PackageCategory[];
// }
