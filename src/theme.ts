import { createTheme } from "@mui/material/styles";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4CC2FF" },
    secondary: { main: "#39E5C6" },
    background: {
      default: "#0B0B0F",
      paper: "#121219",
    },
  },
  typography: {
    fontFamily: "var(--font-montserrat), Arial, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
});
