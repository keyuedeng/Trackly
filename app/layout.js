import { Inter } from 'next/font/google';
import { Baloo_2 } from "next/font/google";
import './globals.css';

const inter = Inter({subsets: ['latin']});
const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

export const metadata = {
  title: "Trackly",
  description: "Track your study habits",
};

export default function RootLayout({ children }) {
  const header = (
    <header className = 
    "p-2 sm:p-8 flex items-center justify-between gap-4">
      <h1 className = {'text-base sm:text-lg textGradient ' + baloo.className}>Trackly</h1>
      <div className="flex items-center justify-between">
        PLACEHOLDER
      </div>
    </header>
  )
  
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className = {'text-[#202A44] ' + baloo.className}> Created with 💛</p>
    </footer>
  )
  
  
  return (
    <html lang="en">
      <body className={ `w-full max-w-[1200px] mx-auto text-sm 
        sm:text-base min-h-screen flex flex-col text-slate-900 ` + inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
