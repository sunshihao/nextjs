"use client";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

// 布局文件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body >
        <Provider store={store}>{children}</Provider>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
