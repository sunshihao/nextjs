/** 连接websocket */
import { delChatList, addChatList } from "@/store/reducers";

let socket: WebSocket;

// 心跳检测间隔时间（毫秒）
const HEARTBEAT_INTERVAL = 10000;

let timerInterval: NodeJS.Timeout | undefined;

// 初始怀
export const initWebSocket = () => {
  if (!socket) {
    socket = new WebSocket("ws://localhost:8080");
  }

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  socket?.addEventListener("open", (event) => {
    console.log("WebSocket connection established");
    // 启动心跳检测定时器
    timerInterval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
  });

  // receive message
  socket?.addEventListener("message", (event) => {
    blobToObject(event.data);
  });

  socket?.addEventListener("close", (event) => {
    console.log("WebSocket connection closed");

    // 清除心跳检测定时器
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });
};

// 发送mess
export const sendMessageBySock = (message: string) => {
  socket?.send(message);
};

/** blob data to object */
function blobToObject(blob) {
  const reader = new FileReader();

  reader.onload = function () {
    try {
      const dataAsString = reader.result;
      const dataAsObject: UserChat = JSON.parse(dataAsString); // 传入参数转义Object'

      console.log('recver message', dataAsObject)

      if(dataAsObject && dataAsObject.code === "200"){
        addChatList(dataAsObject.content);
      }else {

      }

    } catch (e) {
      //TODO handle the exception
    }
  };

  reader.readAsText(blob);
}

// 发送心跳包
function sendHeartbeat() {
  // 最近一次收到消息的时间
  let lastMessageTime = Date.now();
  if (Date.now() - lastMessageTime > HEARTBEAT_INTERVAL) {
    socket?.send("heartbeat");
  }
}
