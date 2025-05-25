import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TCartItem = {
    id: string;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    image?: string;
    color?: string;
    size: string;
    stock: number;
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
            const item = state.items.find(i => i.color === action.payload.color && i.size === action.payload.size && i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<Partial<TCartItem>>) {

            const targetId = action.payload.id?.trim().toLowerCase();
            const targetColor = action.payload.color?.trim().toLowerCase();
            const targetSize = action.payload.size?.trim().toLowerCase();

            state.items = state.items.filter(item => {
                const match = item.id.toLowerCase() === targetId && item.size.trim().toLowerCase() === targetSize && item.color?.trim().toLowerCase() === targetColor;
                return !match;
            });

            state.checkedItems = state.checkedItems.filter(item => {
                const match = item.id.toLowerCase() === targetId && item.size.trim().toLowerCase() === targetSize && item.color?.trim().toLowerCase() === targetColor;
                return !match;
            });
        },
        updateQuantity(
            state,
            action: PayloadAction<{ id: string; color?: string; size: string; quantity: number }>
        ) {
            const { id, color, size, quantity } = action.payload;

            const updateItemQuantity = (items: TCartItem[]) => {
                const item = items.find(i => i.id === id && i.size === size && (color ? i.color === color : true));
                if (item) {
                    item.quantity = quantity;
                }
            };
            updateItemQuantity(state.items);
            updateItemQuantity(state.checkedItems);
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
            const { id, color, size } = action.payload;
            const exists = state.checkedItems.find(item => item.id === id && item.size === size && (item.color) === (color)
            );
            if (exists) {
                state.checkedItems = state.checkedItems.filter(item => !(item.id === id && item.size === size && (item.color) === (color)));
            } else {
                state.checkedItems.push(action.payload);
            }
        },

        deleteCheckedItems(state) {
            const checkedIds = new Set(state.checkedItems.map(item => item.id));
            state.items = state.items.filter(item => !checkedIds.has(item.id));
            state.checkedItems = [];
        },
        toggleSelectAll(state) {
            if (state.checkedItems.length === state.items.length) {
                state.checkedItems = [];
            } else {
                state.checkedItems = [...state.items];
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setLoading, setCartState, toggleCheckItem, deleteCheckedItems, toggleSelectAll } = cartSlice.actions;
export default cartSlice.reducer;
