import { Baloo_2 } from "next/font/google";
import Link from "next/link";

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

export default function PublicLayout({ children }) {
  return (
    <>
      <header className="p-2 sm:p-8 flex items-center justify-between gap-4">
        <Link href="/">
          <h1 className={'text-base sm:text-lg textGradient ' + baloo.className}>Trackly</h1>
        </Link>
        <div className="flex items-center justify-between">
          PLACEHOLDER
        </div>
      </header>
      {children}
    </>
  );
}
