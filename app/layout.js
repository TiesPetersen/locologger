import { Inter } from "next/font/google"
import "./globals.css";
import Footer from "@/components/Footer";
import Link from "next/link";
import { AuthProvider } from "../context/AuthContext";
import Head from "./head";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "LOCO Logger",
  description: "Keep track of your tops during LOCO, and see how others are performing!",
};

export default function RootLayout({ children }) {

  const locoStart = Date.parse('4 Oct 2024 23:40') // add 1 hour
  const locoEnd = Date.parse('5 Oct 2024 01:00') // add 1 hour
  const diff = new Date(locoEnd - new Date())

  let timerState = 'running'
  if (locoStart > new Date()) {
    timerState = 'not started'
  }
  if (new Date() > locoEnd) {
    timerState = 'ended'
  }

  const header = (
    <header className='p-4 sm:p-6 flex items-center justify-between gap-4 bg-yellow-300 m-3 rounded-xl'>
      <Link href={'/'}>
        <h1 className='font-bold text-lg sm:text-xl '>loco logger.</h1>
      </Link>
      <div>
        {timerState === 'not started' ? (
          <h1>loco hasn&apos;t started yet.</h1>
        ) : ''}
        {timerState === 'running' ? (
          <h1>
            {diff.getUTCHours()}h {diff.getUTCMinutes()}m left.
          </h1>
        ): ''}
        {timerState === 'ended' ? (
          <h1>loco has ended.</h1>
        ): ''}
      </div>
    </header>
  )

  return (
    <html lang="en">
      <Head/>
      <AuthProvider>
      <body className={'w-full max-w-[600px] mx-auto text-sm sm: text-base min-h-screen flex flex-col text-slate-800 ' + inter.className}>
        {header}
        {children}
        <Footer/>
      </body>
      </AuthProvider>
    </html>
  );
}
