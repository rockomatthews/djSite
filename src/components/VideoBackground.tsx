"use client";

import { Box } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type VideoBackgroundProps = {
  youtubeId: string;
  posterUrl?: string;
  is360?: boolean;
  onMuteChange?: (muted: boolean) => void;
};

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type VideoBackgroundHandle = {
  toggleMute: () => void;
  mute: () => void;
  unmute: () => void;
  isMuted: () => boolean;
};

const VideoBackground = forwardRef<VideoBackgroundHandle, VideoBackgroundProps>(
  (
    { youtubeId, posterUrl, is360 = false, onMuteChange },
    ref
  ) => {
    const [muted, setMuted] = useState(true);
    const playerRef = useRef<any>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const iframeId = useId().replace(/:/g, "_");

    useEffect(() => {
      if (onMuteChange) {
        onMuteChange(muted);
      }
    }, [muted, onMuteChange]);

    useEffect(() => {
      if (!iframeRef.current) return;

      const loadPlayer = () => {
        if (!window.YT || !window.YT.Player) return;
        if (playerRef.current) return;

        playerRef.current = new window.YT.Player(iframeId, {
          events: {
            onReady: (event: any) => {
              event.target.mute();
            },
            onStateChange: (event: any) => {
              if (window.YT && event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
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
    }, [iframeId]);

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

    useImperativeHandle(
      ref,
      () => ({
        toggleMute,
        mute: () => {
          if (!playerRef.current) return;
          playerRef.current.mute();
          setMuted(true);
        },
        unmute: () => {
          if (!playerRef.current) return;
          playerRef.current.unMute();
          setMuted(false);
        },
        isMuted: () => muted,
      }),
      [muted]
    );

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
          sx={{
            width: "100%",
            height: "100%",
            "& iframe": {
              width: "100%",
              height: "100%",
              border: 0,
            },
          }}
        >
          <iframe
            ref={iframeRef}
            id={iframeId}
            title={is360 ? "DJ background 360 video" : "DJ background video"}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&modestbranding=1&rel=0&disablekb=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </Box>
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
    </Box>
    );
  }
);

VideoBackground.displayName = "VideoBackground";

export default VideoBackground;
