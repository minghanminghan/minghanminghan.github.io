import "./globals.css"
import { Figtree } from "next/font/google"
import { ThemeProvider } from "./context/ThemeContext"

import SideBar from "./ui/SideBar"
import TextBackground from "./ui/TextBackground"

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
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
