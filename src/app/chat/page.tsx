"use client";
import Imager from "next/image";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  initWebSocket,
  closeWebSocket,
  sendMessageBySock,
} from "@/pages/utils/websocket";
import { Input } from "@/components/ui/input";
import { Modal, Button } from "flowbite-react";
import "./index.css";
/**
 * AI Chat
 */
const Chat = () => {
  // 输入框信息
  const [message, setMessage] = useState<string | undefined>();

  // 语音输入
  const [voiceFlag, setVoiceFlag] = useState<boolean>(false);

  // 侧边抽屉
  const [drawerFlag, setDrawerFlag] = useState<boolean>(false);

  //
  const messagesEnd = useRef<HTMLDivElement>(null);

  // 进行数据性刷新时都会触发
  const counterValue = useSelector((state: StoreType) => {
    return state.chat;
  }) as UserChat[];

  // console.log("counterValue", counterValue); 疯狂监听store中的值变换 我也是无语 state的每次变化都会被触发

  // 发送信息
  const sendMessageSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message) {
      sendMessageBySock(message); // 发送
      setMessage(undefined);
    }
  };

  const scrollToBottom = () => {
    console.log("messagesEnd", messagesEnd);
    if (messagesEnd && messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // 初始化websocket
    initWebSocket();
    return () => {
      // closeWebSocket();
    };
  }, []);

  useEffect(() => {
    // 底部滚动效果
    scrollToBottom();
  }, [counterValue]);

  return (
    <div id="chatBody">
      {/* <Button color="success">12321</Button> */}
      <div className="content_area">
        <div className="message_title flex justify-between items-center">
          <div className="flex flex-row items-center">
            <Imager
              src="/sssh-logo.ico"
              width={2}
              height={2}
              alt="Picture of the author"
              className="rounded-full"
              style={{ width: "1em", height: "1em", marginRight: "5px" }}
            />
            <span>AI Chat</span>
          </div>
          {/* 侧抽屉 */}
          <button
            className="p-1.5 text-sm focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
            onClick={() => setDrawerFlag(true)}
          >
            <Imager
              src="/theme.svg"
              width={2}
              height={2}
              alt="Picture of the author"
              style={{ width: "1em", height: "1em" }}
            />
          </button>
        </div>
        <div className="message_area">
          <div className="chat-bubble-container">
            {Array.isArray(counterValue) &&
              counterValue.map((item, key) => {
                if (item.userType === "AI") {
                  return (
                    <div key={key} className="chat-bubble chat-bubble-left">
                      <div className="chat-bubble-header">
                        <span>接收方</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="chat-bubble-content">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="chat-bubble chat-bubble-right ">
                      <div className="chat-bubble-header">
                        <span>发送方</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="chat-bubble-content flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <div
            style={{ clear: "both", height: "1px", width: "100%" }}
            ref={messagesEnd}
          ></div>
        </div>
        {/* input area */}
        <form className="input_area" onSubmit={sendMessageSubmit}>
          <button
            type="button"
            style={{ marginRight: "10px" }}
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Imager
              src="/voice_close.svg"
              width={2}
              height={2}
              alt="Picture of the author"
              style={{ width: "2.2em" }}
            />
          </button>
          <Input
            value={message || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <button
            type="submit"
            style={{ marginLeft: "10px" }}
            className="flex w-24 justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <Imager
              src="/send.svg"
              width={2}
              height={2}
              alt="Picture of the author"
              style={{ width: "1.5em" }}
            />
          </button>
        </form>
      </div>
      {/* 侧边栏 */}
      <Modal show={drawerFlag} onClose={() => setDrawerFlag(false)}>
        <div
          className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
          aria-labelledby="drawer-right-label"
        >
          <h5
            id="drawer-right-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            功能区
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setDrawerFlag(false)}
          >
            <Imager
              src="/svg/cancel.svg"
              width={10}
              height={10}
              alt=""
              style={{ width: "1.5em" }}
            />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get access
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
