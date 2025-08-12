import { Inter } from 'next/font/google';
import './globals.css';
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Trackly",
  description: "Track your study habits",
};

export default function RootLayout({ children }) {
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className={'text-[#202A44] ' + baloo.className}> Created with 💛</p>
    </footer>
  )
  
  return (
    <html lang="en">
      <body className={`w-full max-w-[1300px] mx-auto text-sm 
        sm:text-base min-h-screen flex flex-col text-slate-900 ` + inter.className}>
        {children}
        {footer}
      </body>
    </html>
  );
}
