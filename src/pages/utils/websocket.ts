/** 基础性连接websocket */
import { add_chat } from "@/store/reducers/chat";
import { set_socket_intance } from "@/store/reducers/socket";
import { store } from "@/store/store";

// 心跳检测间隔时间（毫秒）
const HEARTBEAT_INTERVAL = 10000;

const SOCKET_URL = "ws://localhost:8080";

const socketInstance = (function () {
  let socket: WebSocket; // 保持单例引用

  function createInstance() {
    // 创建单例对象
    const obj = new WebSocket(SOCKET_URL);
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

let timerInterval: NodeJS.Timeout | undefined;

// 初始化
export const initWebSocket = () => {

  const { socketInstance: socketIns } = store.getState().socket;

  console.log('socketInssocketIns', socketIns)

  let socket;
  // 保证socket的全局性
  if (socketIns) {
    socket = socketIns;

    if(socket.readyState !== socket.OPEN){
      console.log('状态监控')
    }

  } else {
    socket = socketInstance.getInstance();
    store.dispatch(set_socket_intance(socket))

    if (timerInterval) {
      clearInterval(timerInterval);
    }
  
    // BUG socket的实例其实仅仅创建了一个只不过作了2次监听
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
      // closeWebSocket() 
      // 清除心跳检测定时器
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    });
  }

  return socket;
};

/**
 * 发送Message
 * */ 
export const sendMessageBySock = (message: string) => {
  const { socketInstance: socketIns } = store.getState().socket;
  console.log('sendMessageBySocksendMessageBySocksendMessageBySock', socketIns)

  if (socketIns) {
    socketIns?.send(message);
  }
};

/**
 * 关闭socketIO
 * */ 
export const closeWebSocket = () => {
  const { socketInstance: socketIns } = store.getState().socket;
  if (socketIns) {
    socketIns.close(1000, "用户主动断开连接");
    store.dispatch(set_socket_intance(undefined));

    console.log('执行了关闭操作', socketIns)
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
