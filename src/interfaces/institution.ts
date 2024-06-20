export interface IInstitution {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  educationBoardIds: string[];
  // educationBoardId: string;
  classes: string[];
  userId: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateInstitutionPayload extends Omit<IInstitution, "_id" | "createdAt" | "updatedAt"> {}
export interface IEditInstitutionPayload extends Omit<IInstitution, "createdAt" | "updatedAt"> {}
