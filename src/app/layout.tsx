import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { montserrat, theme } from "@/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ Nova | High-Energy Event DJ",
  description:
    "High-energy DJ services for weddings, corporate events, and nightlife.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
