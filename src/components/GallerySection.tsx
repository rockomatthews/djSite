"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { siteContent } from "@/lib/content";

export default function GallerySection() {
  const { galleryImages } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setOpenIndex(index);
  const handleClose = () => setOpenIndex(null);

  const handlePrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % galleryImages.length);
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
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {galleryImages.map((src, index) => (
          <Box
            key={src}
            onClick={() => handleOpen(index)}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.08)",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              },
              transition: "transform 150ms ease, box-shadow 150ms ease",
            }}
          >
            <Image src={src} alt="Gallery image" fill style={{ objectFit: "cover" }} />
          </Box>
        ))}
      </Box>

      <Dialog
        open={openIndex !== null}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            background: "rgba(10,10,14,0.92)",
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: 2, md: 3 } }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 2,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
            aria-label="Close gallery"
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
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
              zIndex: 2,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
            aria-label="Next image"
          >
            <ArrowForwardIcon />
          </IconButton>

          {openIndex !== null ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 360, md: 560 },
              }}
            >
              <Image
                src={galleryImages[openIndex]}
                alt="Gallery enlarged"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </Box>
          ) : null}
        </Box>
      </Dialog>
    </Container>
  );
}
