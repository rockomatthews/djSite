"use client";

import { Box, Button, Stack } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useMemo, useState } from "react";

type VideoBackgroundProps = {
  youtubeId: string;
  posterUrl?: string;
  is360?: boolean;
  musicLabel?: string;
};

export default function VideoBackground({
  youtubeId,
  posterUrl,
  is360 = false,
  musicLabel = "Music",
}: VideoBackgroundProps) {
  const [muted, setMuted] = useState(true);

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: muted ? "1" : "0",
      controls: "0",
      loop: "1",
      playlist: youtubeId,
      playsinline: "1",
      modestbranding: "1",
      rel: "0",
      showinfo: "0",
    });
    return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
  }, [muted, youtubeId]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <iframe
          key={`${youtubeId}-${muted}`}
          title={is360 ? "DJ background 360 video" : "DJ background video"}
          src={iframeSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            objectFit: "cover",
          }}
        />
      </Box>

      {posterUrl && (
        <Box
          component="img"
          src={posterUrl}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: { xs: 0.25, md: 0 },
          }}
        />
      )}

      <Stack
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Button
          onClick={() => setMuted((prev) => !prev)}
          variant="contained"
          color="secondary"
          startIcon={muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          sx={{
            pointerEvents: "auto",
            px: { xs: 4, md: 6 },
            py: { xs: 2, md: 2.5 },
            fontSize: { xs: "1rem", md: "1.2rem" },
            borderRadius: 999,
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          }}
          aria-label={`${muted ? "Enable" : "Disable"} ${musicLabel}`}
        >
          {muted ? "Tap to Unmute" : "Sound On"}
        </Button>
      </Stack>
    </Box>
  );
}
