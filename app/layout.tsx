import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import StoreProvider from "./ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shoetopia",
  description:
    "Welcome to Shoetopia, your ultimate destination for footwear fashion. Discover a world of endless possibilities, from classic sneakers to elegant heels and everything in between.",
  verification: {
    google: "g3-BCfDeRPf6XBNGCbsB3wcxkkaC4DMGoRzZYSmlhEo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StoreProvider>
            <Navbar />
            <div className="py-20 w-full lg:overflow-hidden ">{children}</div>
            <Footer />
          </StoreProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
