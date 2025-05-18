export type TRoles = "user" | "admin";

export interface IUser {
  _id: string;
  fullName: string;
  avatar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: string;
  role: TRoles;
}
