"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { siteContent } from "@/lib/content";

export default function GallerySection() {
  const { galleryImages } = siteContent;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <Container id="gallery" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 96 }}>
      <Stack spacing={2} textAlign={{ xs: "left", md: "center" }}>
        <Typography variant="h2">Gallery & highlights</Typography>
        <Typography variant="body1" color="text.secondary">
          Moments from packed dance floors, curated soundscapes, and client events.
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 4,
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          height: { xs: 320, md: 520 },
        }}
      >
        <Image
          src={galleryImages[index]}
          alt="Gallery spotlight"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 900px) 100vw, 1200px"
        />

        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.55)",
            color: "common.white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
          aria-label="Previous image"
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.55)",
            color: "common.white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
          aria-label="Next image"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(4, minmax(0, 1fr))",
            md: "repeat(8, minmax(0, 1fr))",
          },
          gap: 1,
        }}
      >
        {galleryImages.map((src, thumbIndex) => (
          <Box
            key={src}
            onClick={() => setIndex(thumbIndex)}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 1,
              overflow: "hidden",
              cursor: "pointer",
              border:
                thumbIndex === index
                  ? "2px solid rgba(76,194,255,0.9)"
                  : "1px solid rgba(255,255,255,0.1)",
              opacity: thumbIndex === index ? 1 : 0.7,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Image src={src} alt="Gallery thumbnail" fill style={{ objectFit: "cover" }} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
