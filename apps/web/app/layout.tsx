import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextUIProviderWrapper } from "./providers";
import { Web3Provider } from "../components/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Web3Provider>
      <NextUIProviderWrapper>
        <UserProvider>
          <body className={inter.className}>{children}</body>
        </UserProvider>
      </NextUIProviderWrapper>
      </Web3Provider>
    </html>
  );
}
