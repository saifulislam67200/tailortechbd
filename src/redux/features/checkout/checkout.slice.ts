import { IOrderItem, IShippingAddress } from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IBillingAddress = {
  name: string;
  address: string;
  phoneNumber: string;
};

type CheckoutState = {
  items: (IOrderItem & { discount?: number })[];
  shippingAddress: IShippingAddress | null;
  billingAddress: IBillingAddress | null;
};

const initialState: CheckoutState = {
  items: [],
  shippingAddress: null,
  billingAddress: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addItemToCheckout: (state, action: PayloadAction<IOrderItem>) => {
      const payload = action.payload;

      const isExistProduct = state.items.find(
        (item) =>
          item.product_id === payload.product_id &&
          item.color === payload.color &&
          item.size === payload.size
      );

      if (isExistProduct) {
        const isquantityChanged = payload.quantity !== isExistProduct.quantity;
        if (isquantityChanged) {
          isExistProduct.quantity = payload.quantity;
        }
      } else {
        state.items.push(payload);
      }
    },

    addItemsOnCheckout: (state, action: PayloadAction<IOrderItem[]>) => {
      state.items = action.payload;
    },

    setCheckoutAddresses: (
      state,
      action: PayloadAction<{
        shipping: IShippingAddress;
        billing: IBillingAddress | null;
      }>
    ) => {
      state.shippingAddress = action.payload.shipping;
      state.billingAddress = action.payload.billing;
    },

    removeAllItemsFromCheckout: (state) => {
      state.items = [];
      state.shippingAddress = null;
      state.billingAddress = null;
    },
  },
});

export const {
  addItemToCheckout,
  removeAllItemsFromCheckout,
  addItemsOnCheckout,
  setCheckoutAddresses,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
