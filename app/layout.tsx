import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Wedin",
  description: "Organize your wedding with Wedin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased sm:min-h-[100vh]`}
      >
        {children}
      </body>
    </html>
  );
}
