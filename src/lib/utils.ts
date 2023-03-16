import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// AES加密
const AES = require('crypto-js');
const key = AES.enc.Utf8.parse('0123456789ASDFGH'); //十六位十六进制数作为密钥
const iv = AES.enc.Utf8.parse('ASDFGH0123456789'); //十六位十六进制数作为密钥偏移量

// 加密
export function encrypt(word: string) {
  const src = AES.enc.Utf8.parse(word);
  const encrypted = AES.AES.encrypt(src, key, { iv, mode: AES.mode.CBC, padding: AES.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
};
