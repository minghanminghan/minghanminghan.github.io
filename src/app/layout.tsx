import "./globals.css"
import { Figtree } from "next/font/google"
import { ThemeProvider } from "./context/ThemeContext"

import SideBar from "./ui/SideBar"
import TextBackground from "./ui/TextBackground"
import TopNav from "./ui/TopNav"

const figtree = Figtree({
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={figtree.className}>
        <ThemeProvider>
          <TextBackground/>
          <div className="m-6 md:m-0 md:px-20 md:py-6 gap-3 md:gap-25 flex flex-col md:flex-row md:h-screen">
            <SideBar/>
            <div className="flex-1 min-w-0 md:overflow-y-auto flex flex-col items-center gap-6 md:gap-10 pt-6 text-lg md:text-2xl">
              <TopNav/>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
