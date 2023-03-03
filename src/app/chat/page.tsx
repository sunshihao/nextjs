"use client";
import Imager from "next/image";
import React, { useEffect, useState } from "react";
import { Stream } from "stream";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { addChatList, delChatList } from "@/store/reducers";
import { initWebSocket, sendMessageBySock } from "@/pages/utils/websocket";
import { connect } from 'react-redux'


// 心跳检测间隔时间（毫秒）
const HEARTBEAT_INTERVAL = 10000;

const Chat =(props)=> {

  console.log('propspropsprops', props)

  const counterValue = useSelector((state) => {
    console.log("useSelectoruseSelectoruseSelector", state);
    return state?.chatList;
  });

  const dispatch = useDispatch();

  // 输入框信息
  const [message, setMessage] = useState();
  // socket intance
  const [socket, setSocket] = useState<WebSocket>();
  // 语音输入
  const [voiceFlag, setVoiceFlag] = useState<boolean>(false);
  // 定时心跳
  const [timerInterval, setTimerInterval] = useState<T>();
  // 聊天内容
  const [chatList, setChatList] = useState<UserChat[]>([
    {
      userName: "SSSH",
      userType: "human",
      date: "2023-03-02",
      content: "这是接收方的另一条聊天内容",
    },
    {
      userName: "AI",
      userType: "AI",
      date: "2023-03-02",
      content: "这是发送方的一条聊天内容",
    },
  ]);

  const messageRef = React.createRef<T>(); // messageRef

  // 发送信息
  const sendMessageSub = (e) => {
    addData();
    console.log("eventevent", e);
    e.preventDefault();

    console.log("message", message);

    if (message) {
      sendMessageBySock(message); // 发送后清空
      setMessage(undefined)
    }
  };

  const addData = ()=> {
    addChatList({abs:1231})
  }

  useEffect(() => {
    // 初始化
    initWebSocket();
  }, []);

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
          <button
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
          </button>
        </div>
        <div ref={messageRef} className="message_area">
          <div className="chat-bubble-container">
            {chatList.map((item, key) => {
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
        </div>
        {/* input area */}
        <form className="input_area" onSubmit={sendMessageSub}>
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
          <input
            type="text"
            value={message}
            placeholder="请输入..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
}

export default connect(
  state => state,
)(Chat)
