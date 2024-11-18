import { Inter } from "next/font/google"
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "../context/AuthContext";
import Head from "./head";
import HeadBar from "@/components/HeadBar";
import { EventProvider } from "@/context/EventContext";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "loco logger",
  description: "keep track of your tops during loco, and see how others are performing!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head/>
        <AuthProvider>
        <EventProvider>
          <body className={'w-full max-w-[600px] mx-auto text-sm sm: text-base min-h-screen flex flex-col text-slate-800 ' + inter.className}>
            <HeadBar/>
            {children}
            <Footer/>
          </body>
        </EventProvider>
        </AuthProvider>
    </html>
  );
}
