import Navigation from "@/components/Navigation";
import "./_styles/globals.css";
import Logo from "@/components/Logo";

export const metadata = {
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis | Welcome",
  },
  description:
    "Luxirious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

import { Josefin_Sans } from "next/font/google";
import Header from "@/components/Header";
import { ReservationProvider } from "@/contexts/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative ${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className=" max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
