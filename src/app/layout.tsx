import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthenticationProvider from "./components/Authentication";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./components/ReduxProvider";
import LoaderWithBackdrop from "./components/LoaderWithBackdrop";

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
        <ReduxProvider>
          <LoaderWithBackdrop />
          <Toaster />
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
