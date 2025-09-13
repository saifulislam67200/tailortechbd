export interface IComplaint {
  _id: string;
  customerName: string;
  orderId: string;
  feedbackType: string;
  csCategory: string;
  priority: string;
  satisfaction: number;
  status: "pending" | "in-progress" | "resolved" | "implemented" | "refused" | "closed";
  actionTaken: string;
  createdAt?: string;
  updatedAt?: string;
  resolutionDate: string;
}
