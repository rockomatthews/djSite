"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { siteContent } from "@/lib/content";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(10,10,14,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Toolbar disableGutters>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            py: { xs: isScrolled ? 0.5 : 1, md: 1 },
            flexDirection: { xs: isScrolled ? "row" : "column", md: "row" },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              justifyContent: { xs: isScrolled ? "flex-start" : "center", md: "flex-start" },
              width: { xs: isScrolled ? 48 : "100%", md: "auto" },
            }}
          >
            <Link href="#top" aria-label="Back to top">
              <Box
                sx={{
                  width: { xs: isScrolled ? 48 : 150, md: 150 },
                  height: { xs: isScrolled ? 48 : 150, md: 150 },
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 180ms ease",
                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                <Image
                  src="/djParkCityLogo.png"
                  alt="DJ Park City logo"
                  width={150}
                  height={150}
                  priority
                />
              </Box>
            </Link>
            <Box />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{ fontSize: 14 }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            <Button href="#contact" variant="contained" color="primary">
              Book Now
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              display: { xs: isScrolled ? "flex" : "none", md: "none" },
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              href="#contact"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Book Now
            </Button>
          </Stack>
        </Container>
      </Toolbar>
      <Box
        sx={{
          display: { xs: isScrolled ? "none" : "block", lg: "none" },
          pb: 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            ...(isScrolled && {
              flexDirection: "row",
              justifyContent: "flex-end",
            }),
          }}
        >
          <Button
            href="#contact"
            variant="contained"
            color="primary"
            fullWidth={!isScrolled}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </AppBar>
  );
}
