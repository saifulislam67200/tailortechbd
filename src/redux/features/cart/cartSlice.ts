import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TCartItem = {
    id: string;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    image?: string;
};

type TCartState = {
    items: TCartItem[];
    isLoading: boolean;
};

const initialState: TCartState = {
    items: [],
    isLoading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<TCartItem>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.items = [];
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setCartState(_state, action: PayloadAction<TCartState>) {
            return action.payload;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setLoading, setCartState } = cartSlice.actions;
export default cartSlice.reducer;
