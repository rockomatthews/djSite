"use client";

import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type Track = {
  title: string;
  url: string;
};

type SoundCloudPlayerProps = {
  tracks: Track[];
};

export default function SoundCloudPlayer({ tracks }: SoundCloudPlayerProps) {
  const [trackUrl, setTrackUrl] = useState(tracks[0]?.url ?? "");

  const embedSrc = useMemo(() => {
    if (!trackUrl) return "";
    const params = new URLSearchParams({
      url: trackUrl,
      auto_play: "false",
      hide_related: "true",
      show_comments: "false",
      show_user: "false",
      show_reposts: "false",
      show_artwork: "true",
      show_teaser: "false",
      buying: "false",
      sharing: "false",
      download: "false",
      color: "ff5500",
      visual: "true",
    });
    return `https://w.soundcloud.com/player/?${params.toString()}`;
  }, [trackUrl]);

  const handleChange = (event: SelectChangeEvent) => {
    setTrackUrl(event.target.value);
  };

  return (
    <Card
      sx={{
        minWidth: 260,
        maxWidth: 340,
        bgcolor: "rgba(8,8,12,0.8)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#ff5500",
              }}
            />
            <Typography variant="subtitle2" sx={{ color: "#ff5500" }}>
              SoundCloud
            </Typography>
          </Stack>
          <FormControl size="small" fullWidth>
            <InputLabel id="soundcloud-track-label">Select a track</InputLabel>
            <Select
              labelId="soundcloud-track-label"
              value={trackUrl}
              label="Select a track"
              onChange={handleChange}
              sx={{
                bgcolor: "rgba(255,255,255,0.06)",
                borderRadius: 2,
              }}
            >
              {tracks.map((track) => (
                <MenuItem key={track.url} value={track.url}>
                  {track.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
          {embedSrc ? (
            <Box
              component="iframe"
              title="SoundCloud player"
              src={embedSrc}
              sx={{
                border: 0,
                width: "100%",
                height: 166,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "rgba(255,255,255,0.06)",
              }}
              allow="autoplay"
            />
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
