import TopNav from "../ui/TopNav"
import { ThemeProvider } from "@mui/material/styles"
import { ViewProvider } from "../context/ViewContext"
import theme from "../context/ThemeContext"
import { Box, CssBaseline } from "@mui/material"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <body style={{ cursor: 'none' }}> */}
      <body>
        <ViewProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <TopNav />
          <Box
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 2, sm: 3 }
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
        </ViewProvider>
      </body>
    </html>
  )
}
