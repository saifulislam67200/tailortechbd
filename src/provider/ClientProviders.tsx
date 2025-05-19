"use client";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";
import { PersistGate } from "redux-persist/integration/react";


export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>{children}</AuthProvider>
      </PersistGate>
    </Provider>
  );
}
