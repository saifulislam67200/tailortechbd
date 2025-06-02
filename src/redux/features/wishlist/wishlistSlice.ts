import { IProduct } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TWishlistState {
  items: IProduct[];
  isLoading: boolean;
}

const initialState: TWishlistState = {
  items: [],
  isLoading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<IProduct>) {
      const exists = state.items.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
    setWishlistLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlistLoading } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
