"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
