import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transaction Manager",
  description: "Poolder programming assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/favicon.ico" sizes="32x32" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
