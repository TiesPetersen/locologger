import { Inter } from "next/font/google"
import "./globals.css";
import Head from "./head";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "loco logger",
  description: "keep track of your tops during loco, and see how others are performing!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head/>
          <body className={'w-full max-w-[600px] mx-auto text-sm sm: text-base min-h-screen flex flex-col text-slate-800 ' + inter.className}>
            {children}
          </body>
    </html>
  );
}
