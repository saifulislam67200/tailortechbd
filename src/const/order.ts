import { TPaymentMethod } from "@/types/order";

export const paymentMethodOptions: Record<TPaymentMethod, { label: string }> = {
  cod: { label: "COD" },
  card: { label: "Card" },
  bkash: { label: "Bkash" },
  nagad: { label: "Nagad" },
  rocket: { label: "Rocket" },
  cash: { label: "Cash" },
};
