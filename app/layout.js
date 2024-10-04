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

  const header = (
    <header className='p-4 sm:p-6 flex items-center justify-between gap-4 bg-yellow-300 m-3 rounded-xl'>
      <Link href={'/'}>
        <h1 className='font-bold text-lg sm:text-xl '>loco logger.</h1>
      </Link>
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
