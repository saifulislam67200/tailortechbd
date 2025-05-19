import { IOrderItem } from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { items: IOrderItem[] } = {
  items: [
    {
      product_id: "hello_sanda",
      product: {
        name: "Arabian Sanda Biriyarni",
        price: 399,
        image:
          "https://res.cloudinary.com/dqgynvtyz/image/upload/v1746877351/fv3towuoyseo2psgovj2.jpg",
      },
      color: "red",
      quantity: 20,
      size: "family",
    },
    {
      product_id: "hello vai",
      product: {
        name: "Arabian Sanda Biriyarni",
        price: 700,
        image:
          "https://res.cloudinary.com/dqgynvtyz/image/upload/v1746877351/fv3towuoyseo2psgovj2.jpg",
      },
      color: "red",
      quantity: 20,
      size: "family",
    },
  ],
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
    removeAllItemsFromCheckout: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCheckout, removeAllItemsFromCheckout, addItemsOnCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
