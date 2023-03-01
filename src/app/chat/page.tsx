"use client"
import Imager from "next/image";
import "./index.css";
import React, { useEffect } from "react";
import { Stream } from "stream";

export default function Chat() {
  const initWebSocket = () => {
    let voiceFlag = false; // 是否进行语音输入的标志

    function useVoiceFuc() {
      voiceFlag = !voiceFlag;
    }

    /** blob data to object */
    function blobToObject(blob: Stream) {
      const reader = new FileReader();

      reader.onload = function () {
        try {
          const dataAsString: string = reader.result;
          const dataAsObject = JSON.parse(dataAsString); // 传入参数转义Object
          const messagesDiv = document.querySelector("#messages");
          const messElementById = document.getElementById("messages");

          console.log("receive message: ", dataAsObject);

          if (dataAsObject.code == "300") {
            return;
          } else if (dataAsObject.code != "200") {
            alert("AI 回复失败!");
            return;
          }

          if (dataAsObject.user === "AI") {
            messElementById.innerHTML += `<div class="chat-bubble chat-bubble-right">
        					<div class="chat-bubble-header">
        						<span>${dataAsObject.user}</span>
        						<span>${dataAsObject.date}</span>
        					</div>
        					<div class="chat-bubble-content flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5">
        						<p>${dataAsObject.content}</p>
        					</div>
        				</div>`;
          } else {
            messElementById.innerHTML += `<div class="chat-bubble chat-bubble-left">
        					  <div class="chat-bubble-header">
        					    <span>${dataAsObject.user}</span>
        					    <span>${dataAsObject.date}</span>
        					  </div>
        					  <div class="chat-bubble-content">
        					    <p>${dataAsObject.content}</p>
        					  </div>
        					</div>`;
          }
          messElementById.scrollTop = messElementById.scrollHeight;
        } catch (e) {
          //TODO handle the exception
        }
      };

      reader.readAsText(blob);
    }

    // connect socket
    const socket = new WebSocket("ws://localhost:8080");
    // const socket = new WebSocket('ws://82.157.139.89:8080');
    // const socket = new WebSocket('wss://dhc.ink/ws');

    // 心跳检测间隔时间（毫秒）
    const HEARTBEAT_INTERVAL = 10000;

    // 最近一次收到消息的时间
    let lastMessageTime = Date.now();

    // 发送心跳包
    function sendHeartbeat() {
      if (Date.now() - lastMessageTime > HEARTBEAT_INTERVAL) {
        socket.send("heartbeat");
      }
    }

    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection established");

      // 启动心跳检测定时器
      setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
    });

    // receive message
    socket.addEventListener("message", (event) => {
      blobToObject(event.data);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed");

      // 清除心跳检测定时器
      clearInterval(sendHeartbeat);
    });

    const messageForm = document.querySelector("#message-form");
    const messageInput = document.querySelector("#message-input");

    console.log("messageFormmessageForm", messageForm);

    messageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = messageInput.value;

      console.log("message_message", message);

      if (message) {
        socket.send(message);
        messageInput.value = "";
      } else {
      }
    });

    function onSubmitChat() {
      const message = messageInput.value;

      if (message) {
        socket.send(message);
        messageInput.value = "";
      } else {
      }
    }
  };

  useEffect(() => {}, []);

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
        <div id="messages" className="message_area">
          <div className="chat-bubble-container">
            <div className="chat-bubble chat-bubble-left">
              <div className="chat-bubble-header">
                <span>接收方</span>
                <span>2023-02-18 10:37</span>
              </div>
              <div className="chat-bubble-content">
                <p>这是接收方的另一条聊天内容</p>
              </div>
            </div>
            <div className="chat-bubble chat-bubble-right ">
              <div className="chat-bubble-header">
                <span>发送方</span>
                <span>2023-02-18 10:35</span>
              </div>
              <div className="chat-bubble-content flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5">
                <p>这是发送方的另一条聊天内容</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- input area --> */}
        <form id="message-form" className="input_area">
          <button
            id="example_click"
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
            id="message-input"
            placeholder="请输入..."
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
