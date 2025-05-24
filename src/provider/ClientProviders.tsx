"use client";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";
import { SelectedColorProvider } from "@/contexts/SelectColor.context";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      <PersistGate loading={null} persistor={persistor}>
        <SelectedColorProvider>
          <AuthProvider>{children}</AuthProvider>
        </SelectedColorProvider>
      </PersistGate>
    </Provider>
  );
}
