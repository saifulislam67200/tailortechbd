import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./api/api";
import checkoutReducer from "./features/checkout/checkout.slice";
import userReducer from "./features/user/user.slice";
const persistConfig = {
  key: "root",
  storage,
};
const persistAuthReducer = persistReducer({ ...persistConfig, key: "user" }, userReducer);
const persistCheckoutReducer = persistReducer({ ...persistConfig, key: "user" }, checkoutReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: persistAuthReducer,
    checkout: persistCheckoutReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
