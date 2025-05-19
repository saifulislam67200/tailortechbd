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
}

export interface IShippingAddress {
  name: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
}

export interface IOrder {
  user: string;
  shippingAddress: IShippingAddress;
  orderItems: IOrderItem[];
  totalProductAmount: number;
  deliveryFee?: number;
  status: IOrderStatus[];
  paymentStatus: "COD" | "pending" | "paid" | "canceled";
}
