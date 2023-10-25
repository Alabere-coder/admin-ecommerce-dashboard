import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "./providers/modal-provider";
import ToastProvider from "./providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Empire",
  description: "e-empire admin dashboards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Theme>
            <ToastProvider />
            <ModalProvider />
            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
