import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthenticationProvider from "./components/Authentication";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promage",
  description: "Simplified Dashboard for managing your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </body>
    </html>
  );
}
