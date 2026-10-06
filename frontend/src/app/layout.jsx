import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Taskboard",
  description: "A simple, focused task manager.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <ToastProvider>
          <Header />
          <main className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
