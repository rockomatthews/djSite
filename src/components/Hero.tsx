"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CTAButtons from "@/components/CTAButtons";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero } = siteContent;
  const initialIndex = hero.slides.findIndex((slide) => slide.image === "/gallery/hero3.png");
  const [activeSlide, setActiveSlide] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % hero.slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hero.slides.length]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {hero.slides.map((slide, index) => (
        <Box
          key={slide.image}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: { xs: "brightness(1.2)", md: "none" },
            opacity: index === activeSlide ? 1 : 0,
            transition: "opacity 800ms ease",
            zIndex: 0,
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(8,8,12,0.85) 10%, rgba(8,8,12,0.55) 55%, rgba(8,8,12,0.2) 100%)",
          zIndex: 1,
        }}
      />
      <Container sx={{ position: "relative", zIndex: 2, py: { xs: 6, md: 14 } }}>
        <Stack spacing={4} maxWidth={680}>
          <Stack spacing={2}>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3.75rem" } }}>
              {hero.slides[activeSlide].headline}
            </Typography>
            {hero.slides[activeSlide].subheadline
              .split("\n\n")
              .map((paragraph, index) => (
                <Typography key={index} variant="h6" color="text.secondary">
                  {paragraph}
                </Typography>
              ))}
          </Stack>

          <CTAButtons ctas={hero.ctas} />
        </Stack>
      </Container>
    </Box>
  );
}
