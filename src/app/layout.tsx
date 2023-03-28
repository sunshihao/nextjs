"use client";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";

import { Flowbite } from "flowbite-react";


import { TailwindIndicator } from "@/components/tailwind-indicator";
// import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/
import 'react-toastify/dist/ReactToastify.css';

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
        <Provider store={store}>
          <Flowbite>{children}</Flowbite>
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        {/* <ToastContainer /> */}
        {/* <TailwindIndicator /> */}
      </body>
    </html>
  );
}
