"use client";
import "./globals.css";
// import { Inter } from 'next/font/google'
import { store } from "@/store/store";
import { Provider } from "react-redux";
// import { Inter } from 'next/font/google'

// const inter = Inter({
//   weight: ['400', '600', '700'],
//   subsets: ['latin']
// })

// 不是全局性文件是布局文件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
