"use client";
import Imager from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  initWebSocket,
  closeWebSocket,
  sendMessageBySock,
} from "@/pages/utils/websocket";
import Useshinput from "@/components/input/index";
import "./index.css";
/**
 * AI Chat
 */
const Chat = () => {
  // 输入框信息
  const [message, setMessage] = useState<string | undefined>();

  // 语音输入
  const [voiceFlag, setVoiceFlag] = useState<boolean>(false);

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
    console.log('messagesEnd', messagesEnd)
    if (messagesEnd && messagesEnd.current) {

      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
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
          {/* <button
            className="py-2.5 px-2.5 text-sm focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
            data-drawer-target="drawer-right-example"
            data-drawer-show="drawer-right-example"
            data-drawer-placement="right"
            aria-controls="drawer-right-example"
          >
            <Imager
              src="/theme.svg"
              width={2}
              height={2}
              alt="Picture of the author"
              style={{ width: "1em" }}
            />
          </button> */}
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
          <div style={{ clear: 'both', height: '1px', width: '100%' }} ref={messagesEnd}></div>

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
          <Useshinput
            message={message}
            onChange={(value) => 
              setMessage(value)
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
    </div>
  );
};

export default Chat;
