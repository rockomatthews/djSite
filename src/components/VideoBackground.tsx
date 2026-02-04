"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
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

      <Tooltip title={`${muted ? "Enable" : "Disable"} ${musicLabel}`}>
        <IconButton
          onClick={() => setMuted((prev) => !prev)}
          sx={{
            position: "absolute",
            right: { xs: 16, md: 32 },
            bottom: { xs: 16, md: 32 },
            zIndex: 2,
            bgcolor: "rgba(10,10,14,0.72)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "common.white",
            "&:hover": {
              bgcolor: "rgba(20,20,30,0.9)",
            },
          }}
          aria-label={`${muted ? "Enable" : "Disable"} ${musicLabel}`}
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
