/** 连接websocket */
import { add_chat } from "@/store/reducers/chat";
import { store } from "@/store/store";

const socketInstance = (function () {
  let socket: WebSocket; // 保持单例引用

  function createInstance() {
    // 创建单例对象
    const obj = new WebSocket("ws://localhost:8080");
    return obj;
  }

  return {
    getInstance: function () {
      if (!socket) {
        socket = createInstance();
      }
      return socket;
    },
  };
})();

// let socket: WebSocket;

// 心跳检测间隔时间（毫秒）
const HEARTBEAT_INTERVAL = 10000;

let timerInterval: NodeJS.Timeout | undefined;

// 初始怀
export const initWebSocket = () => {
  console.log("iiiiiiiiiiiiiiiiiiii");

  let socket = socketInstance.getInstance();

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

  return socket; 
};

// 发送mess
export const sendMessageBySock = (message: string) => {
  console.log("message", message);
  if (socketInstance.getInstance()) {
    socketInstance.getInstance()?.send(message);
  }
};

// 关闭
export const closeWebSocket = () => {
  if (socketInstance.getInstance()) {
    socketInstance.getInstance().close(1000, "用户主动断开连接");
  }
};

/** blob data to object */
function blobToObject(blob) {
  const reader = new FileReader();

  reader.onload = function () {
    try {
      const dataAsString = reader.result;
      const dataAsObject: UserChat = JSON.parse(dataAsString); // 传入参数转义Object'

      console.log("recver message", dataAsObject);

      if (dataAsObject && dataAsObject.code === "200") {
        store.dispatch(add_chat(dataAsObject));
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
    socketInstance.getInstance()?.send("heartbeat");
  }
}
