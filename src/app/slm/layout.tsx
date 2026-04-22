import "../globals.css"
import { Figtree } from "next/font/google"
import { ThemeProvider } from "../context/ThemeContext"

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
