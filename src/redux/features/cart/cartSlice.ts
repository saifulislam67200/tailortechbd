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
    checkedItems: TCartItem[]
};

const initialState: TCartState = {
    items: [],
    isLoading: false,
    checkedItems: []
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
            state.checkedItems = state.checkedItems.filter(item => item.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.items = [];
            state.checkedItems = [];
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setCartState(_state, action: PayloadAction<TCartState>) {
            return action.payload;
        },
        toggleCheckItem(state, action: PayloadAction<TCartItem>) {
            const exists = state.checkedItems.find(item => item.id === action.payload.id);
            if (exists) {
                state.checkedItems = state.checkedItems.filter(item => item.id !== action.payload.id);
            } else {
                state.checkedItems.push(action.payload);
            }
        },

        deleteCheckedItems(state) {
            const checkedIds = new Set(state.checkedItems.map(item => item.id));
            state.items = state.items.filter(item => !checkedIds.has(item.id));
            state.checkedItems = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setLoading, setCartState, toggleCheckItem, deleteCheckedItems } = cartSlice.actions;
export default cartSlice.reducer;
