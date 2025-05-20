import { IOrderItem } from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { items: (IOrderItem & { discount?: number })[] } = {
  items: [
    {
      product_id: "682b09aff8a7aa57f37ddcf7",
      product: {
        name: "Arabian Sanda Biriyarni",
        price: 399,
        image:
          "https://res.cloudinary.com/dqgynvtyz/image/upload/v1746877351/fv3towuoyseo2psgovj2.jpg",
      },
      color: "Red",
      quantity: 5,
      size: "S",
      discount: 10,
    },
    {
      product_id: "682b09aff8a7aa57f37ddcf7",
      product: {
        name: "Arabian Sanda Biriyarni",
        price: 700,
        image:
          "https://res.cloudinary.com/dqgynvtyz/image/upload/v1746877351/fv3towuoyseo2psgovj2.jpg",
      },
      color: "Red",
      quantity: 2,
      size: "S",
      discount: 10,
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
