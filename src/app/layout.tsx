import './globals.css'

// 全局性文件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cn">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}
