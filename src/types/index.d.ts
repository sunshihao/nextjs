/**
 * 全局性声明文件
 */
type UserChat = {
  code?: string;
  content?: string;
  date?: string;
  message?: string;
  userType?: string;
  userName?: string;
};

type resBody = {
  code?: string;
  success?: boolean;
  date?: string;
  message?: string;
};

type StoreType = {
  chat?: object;
  user?: object;
};
