export interface IOrderItem {
  product_id: string;
  product: {
    image: string;
    name: string;
    price: number;
  };
  color: string;
  size: string;
  quantity: number;
}

export interface IOrderStatus {
  status: "pending" | "on-delivery" | "delivered" | "cancelled";
  createdAt?: string;
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
  user: string;
  shippingAddress: IShippingAddress;
  billingAddress?: IBillingAddress;
  orderItems: IOrderItem[];
  totalProductAmount: number;
  createdAt?: string;
  deliveryFee?: number;
  status: IOrderStatus[];
  paymentStatus: "COD" | "pending" | "paid" | "canceled";
  coupon?: string;
}
