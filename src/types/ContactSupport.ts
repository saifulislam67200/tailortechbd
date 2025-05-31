export interface IContactSupport {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt?: Date;
  _id: string;
  isRead?: boolean;
}
