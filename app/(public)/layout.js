import { Baloo_2 } from "next/font/google";
import Navbar from "@/components/Navbar";

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ["600","700","800"],
});

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}
