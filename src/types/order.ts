import { IUser } from "./user";

export interface IOrderItem {
  product_id: string;
  product: {
    image: string;
    name: string;
    price: number;
    slug?: string;
    sku?: string;
    currentStock?: number;
  };
  color: string;
  size: string;
  quantity: number;
}

export type OrderStatusType =
  | "pending"
  | "confirmed"
  | "processing"
  | "on-delivery"
  | "delivered"
  | "cancelled"
  | "exchange"
  | "returned"
  | "refunded";
export interface IOrderStatus {
  status: OrderStatusType;
  createdAt?: string;
  note?: string;
}

export interface IShippingAddress {
  name: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  phoneNumber: string;
}
export interface IBillingAddress {
  name: string;
  address: string;
  phoneNumber: string;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  orderId: string;
  shippingAddress: IShippingAddress;
  billingAddress?: IBillingAddress;
  orderItems: IOrderItem[];
  totalProductAmount: number;
  createdAt?: string;
  deliveryFee?: number;
  status: IOrderStatus[];
  paymentStatus: "COD" | "pending" | "paid" | "canceled";
  coupon?: string;
  couponDiscount?: number;
  invoiceId: string;
}
