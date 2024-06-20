interface IUserRole {
  _id: string;
  name: string;
  title: string;
  description?: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: IUserRole;
  password: string;
  accountStatus: "active" | "inactive" | "deleted";
  imageURL?: string;
}
