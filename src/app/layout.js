'use client'
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import Navbar component
import { Provider } from "react-redux";
import store from "@/redux/store";

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

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar */}
        <Navbar theme={theme} setTheme={setTheme} />
        {/* Main Content */}
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
