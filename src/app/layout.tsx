import TopNav from "../ui/TopNav"
import { ThemeProvider } from "@mui/material/styles"
import { ViewProvider } from "../context/ViewContext"
import theme from "../context/ThemeContext"
import { CssBaseline } from "@mui/material"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ViewProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <TopNav />
          {children}
        </ThemeProvider>
        </ViewProvider>
      </body>
    </html>
  )
}
