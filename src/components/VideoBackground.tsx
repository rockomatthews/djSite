"use client";

import { Box, IconButton, Stack } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useEffect, useRef, useState } from "react";

type VideoBackgroundProps = {
  youtubeId: string;
  posterUrl?: string;
  is360?: boolean;
  musicLabel?: string;
};

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function VideoBackground({
  youtubeId,
  posterUrl,
  is360 = false,
  musicLabel = "Music",
}: VideoBackgroundProps) {
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: youtubeId,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          disablekb: 1,
        },
        events: {
          onReady: (event: any) => {
            if (muted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      loadPlayer();
      return;
    }

    const existingScript = document.querySelector(
      "script[src=\"https://www.youtube.com/iframe_api\"]"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") {
        previous();
      }
      loadPlayer();
    };
  }, [youtubeId]);

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      setMuted(false);
    } else {
      playerRef.current.mute();
      setMuted(true);
    }
  };

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
        <Box
          ref={containerRef}
          aria-label={is360 ? "DJ background 360 video" : "DJ background video"}
          sx={{
            width: "100%",
            height: "100%",
            "& iframe": {
              width: "100%",
              height: "100%",
              border: 0,
            },
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
          zIndex: 4,
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <IconButton
          onClick={toggleMute}
          aria-label={`${muted ? "Enable" : "Disable"} ${musicLabel}`}
          sx={{
            pointerEvents: "auto",
            width: { xs: 84, md: 96 },
            height: { xs: 84, md: 96 },
            bgcolor: "rgba(0,0,0,0.65)",
            border: "2px solid rgba(255,255,255,0.6)",
            color: "common.white",
            boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.8)",
            },
          }}
        >
          {muted ? (
            <VolumeOffIcon sx={{ fontSize: 44 }} />
          ) : (
            <VolumeUpIcon sx={{ fontSize: 44 }} />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
}
