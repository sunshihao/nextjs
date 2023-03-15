"use client";
import Imager from "next/image";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // useRouter only works in Client Components
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { userAuthSchema } from "@/lib/validations/auth";
import { toast } from "@/hooks/use-toast";

import { encrypt } from "@/lib/utils"

import "./index.css";

type FormData = z.infer<typeof userAuthSchema>;

/**
 * AI Chat
 */
const Login = () => {
  // 解决form的表单问题
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 输入框信息
  // const [username, setUsername] = useState<string | undefined>();
  // const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();

  //
  const loginSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("datadatadatadata", data);
    const { username, password } = data;

    if (username && password) {
      // 这个不着急封装 好用就行
      const res = await fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "text/html",
        },
        body: JSON.stringify(encrypt(data)), // 称不上好的写法
      }).then((res) => res.json()); // 输出成json

      setIsLoading(false);

      // console.log("resresresres", res);

      if (!res?.success) {
        // TODO 登录成功
        // return toast({
        //   title: "通知",
        //   description: "登录成功",
        //   variant: "destructive",
        // });

        router.push("/chat");

      } else {
        return toast({
          title: "异常",
          description: "登录失败",
        });
      }
    }
  };

  return (
    <div
      dir="ltr"
      style={{ height:"100vh" }}
      className="flex items-center flex-1 w-full overflow-x-hidden min-h-full "
      data-new-gr-c-s-check-loaded="14.1100.0"
      data-gr-ext-installed=""
    >
      <main className="w-full">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: `url(/images/login_bg.avif)`,
            }}
          ></div>

          <form
            className="w-full px-6 py-8 md:px-8 lg:w-1/2"
            onSubmit={handleSubmit(loginSubmit)}
          >
            <div className="flex justify-center mx-auto">
              <Imager
                className="w-auto h-7 sm:h-8"
                src="/sssh-logo.ico"
                alt=""
                width={2}
                height={2}
              />
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </p>

            <a
              href="#"
              className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <div className="px-4 py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>

              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google
              </span>
            </a>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with email
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="username"
              >
                User
              </label>
              <Input
                id="username"
                placeholder="请输入用户名"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("username")}
              />
              {errors?.username && (
                <p className="px-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forget Password?
                </a>
              </div>
              <Input
                id="password"
                placeholder="请输入密码"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <a
                href="#"
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or sign up
              </a>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
