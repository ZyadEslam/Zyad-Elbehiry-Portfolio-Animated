import type { Metadata } from "next";
import { Black_Ops_One, Orbitron, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import Nav from "./Components/Layout/Nav";
import Footer from "./Components/Layout/Footer";
import Spacer from "./Components/Sections/Spacer";
import LenisProvider from "./Components/Layout/LenisProvider";
import WhatsappFloat from "./Components/UI/WhatsappFloat";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--black-ops-one",
});

const arefRuqaa = Aref_Ruqaa({
  weight: "400",
  subsets: ["arabic"],
  variable: "--aref-ruqaa",
});

export const metadata: Metadata = {
  title: "Zyad Elbehiry | Software Developer",
  description:
    "Software Developer | Full-Stack Developer | JavaScript | React.js | Next.js | Nodejs | Express.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${blackOps.variable} ${arefRuqaa.variable} h-full antialiased`}
    >
      <body className="min-h-full relative flex flex-col">
        <Nav />
        <LenisProvider>
          <WhatsappFloat/>
          {children}
          <Spacer />
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
