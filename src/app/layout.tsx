import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/components/ThemeRegistry";
import { montserrat } from "@/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dj-site-phi.vercel.app"),
  title: "DJ Park City",
  description: "Turn your night into a headline. Book Now",
  openGraph: {
    title: "DJ Park City",
    description: "Turn your night into a headline. Book Now",
    type: "website",
    images: [
      {
        url: "/djParkCityLogo.png",
        width: 1024,
        height: 1024,
        alt: "DJ Park City logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Park City",
    description: "Turn your night into a headline. Book Now",
    images: ["/djParkCityLogo.png"],
  },
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
