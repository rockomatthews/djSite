"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CTAButtons from "@/components/CTAButtons";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero } = siteContent;
  const [activeSlide, setActiveSlide] = useState(0);

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
            "linear-gradient(120deg, rgba(8,8,12,0.92) 10%, rgba(8,8,12,0.65) 55%, rgba(8,8,12,0.3) 100%)",
          zIndex: 1,
        }}
      />
      <Container sx={{ position: "relative", zIndex: 2, py: { xs: 10, md: 14 } }}>
        <Stack spacing={4} maxWidth={680}>
          <Stack spacing={2}>
            <Typography variant="overline" sx={{ color: "secondary.main" }}>
              {siteContent.brand.location}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
              {hero.slides[activeSlide].headline}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {hero.slides[activeSlide].subheadline}
            </Typography>
          </Stack>

          <CTAButtons ctas={hero.ctas} />
        </Stack>
        <Box
          sx={{
            position: { xs: "static", md: "absolute" },
            top: { md: 40 },
            right: { md: 40 },
            mt: { xs: 6, md: 0 },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <SoundCloudPlayer tracks={siteContent.soundcloud.tracks} />
        </Box>
      </Container>
    </Box>
  );
}
