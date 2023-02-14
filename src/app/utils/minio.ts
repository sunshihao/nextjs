/** minio */
const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "82.157.139.89",
  port: 9000,
  useSSL: false,
  accessKey: "UMm6qPApdiOQqHAL",
  secretKey: "xasgh8FzwFFha1Lv0aWvHTziiZLXsyiU",
});

// const minioClient = new Minio.Client({
//   endPoint: "play.min.io",
//   port: 9000,
//   useSSL: true,
//   accessKey: "Q3AM3UQ867SPQQA43P2F",
//   secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
// });

/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export function openDB(dbName: string, version = 1) {
  return new Promise((resolve, reject) => {
    //  兼容浏览器
    let db;
    console.log("minioClient---", minioClient);
    // 打开数据库，若没有则会创建
    const request = minioClient.open(dbName, version);
    // 数据库打开成功回调
    request.onsuccess = function (event: any) {
      db = event?.target?.result; // 数据库对象
      console.log("数据库打开成功");
      resolve(db);
    };
    // 数据库打开失败的回调
    request.onerror = function () {
      console.log("数据库打开报错");
    };
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event: any) {
      // 数据库创建或升级的时候会触发
      console.log("onupgradeneeded");
      db = event?.target?.result; // 数据库对象
      // 创建存储库
      const objectStore = db.createObjectStore("mdstage", {
        keyPath: "docId", // 这是主键
        // autoIncrement: true // 实现自增
      });
      db.createObjectStore("excelstage", {
        keyPath: "docId", // 这是主键
        // autoIncrement: true // 实现自增
      });
      db.createObjectStore("drawstage", {
        keyPath: "docId", // 这是主键
        // autoIncrement: true // 实现自增
      });
      db.createObjectStore("mindstage", {
        keyPath: "docId", // 这是主键
        // autoIncrement: true // 实现自增
      });
    };
  });
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData(db: IDBDatabase, storeName: string, data: unknown) {
  const request = db
    .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data);

  request.onsuccess = function () {
    console.log("数据写入成功");
  };

  request.onerror = function () {
    console.log("数据写入失败");
  };
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
function updateDB(db: IDBDatabase, storeName: string, data: unknown) {
  const request = db
    .transaction([storeName], "readwrite") // 事务对象
    .objectStore(storeName) // 仓库对象
    .put(data);

  request.onsuccess = function () {
    console.log("数据更新成功");
  };

  request.onerror = function () {
    console.log("数据更新失败");
  };
}

/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
function deleteDB(db: IDBDatabase, storeName: string, id: string) {
  // console.log('33333333333333333',db,storeName,id);

  const request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName)
    .delete(id);

  request.onsuccess = function () {
    console.log(`网页端暂存数据删除成功，id：${id}，storeName：${storeName}`);
  };

  request.onerror = function () {
    console.log(`网页端暂存数据删除失败，id：${id}，storeName：${storeName}`);
  };
}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
function getDataByKey(db: IDBDatabase, storeName: string, key: string) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName]); // 事务
    const objectStore = transaction.objectStore(storeName); // 仓库对象
    const request = objectStore.get(key); // 通过主键获取数据

    request.onerror = function (event) {
      console.log("事务失败");
    };

    request.onsuccess = function (event) {
      console.log("主键查询结果: ", request.result);
      resolve(request.result);
    };
  });
}

/**
 * 是否恢复暂存数据
 * @param db
 * @param storeName
 * @param key
 * @param resolve
 */
const ifRecoverData = (
  db: IDBDatabase,
  storeName: string,
  key: string,
  resolve: any
) => {
  getDataByKey(db, storeName, key).then((res) => {
    if (res) {
      // ElMessageBox.confirm('检测到您上次退出时有未保存的更改，是否还原？', '警告', {
      //   confirmButtonText: '还原',
      //   cancelButtonText: '取消'
      // }).then(() => {
      //   // 还原本地数据
      //   resolve(res)
      // })
    }
  });
};

export default {
  openDB,
  addData,
  updateDB,
  deleteDB,
  getDataByKey,
  ifRecoverData,
};
