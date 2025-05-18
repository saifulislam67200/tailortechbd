export type TRoles = "user" | "admin";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: TRoles;
}
