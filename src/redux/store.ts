import { configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./api/api";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkout.slice";
import userReducer from "./features/user/user.slice";
const persistConfig = {
  key: "root",
  storage,
};
const persistAuthReducer = persistReducer({ ...persistConfig, key: "user" }, userReducer);
const persistCheckoutReducer = persistReducer(
  { ...persistConfig, key: "checkout" },
  checkoutReducer
);
const persistCartReducer = persistReducer({ ...persistConfig, key: "cart" }, cartReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: persistAuthReducer,
    checkout: persistCheckoutReducer,
    cart: persistCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
