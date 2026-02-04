import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/components/ThemeRegistry";
import { montserrat } from "@/theme";
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
        <ThemeRegistry>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
