"use client";

import {
  Box,
  Card,
  CardContent,
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
        minWidth: 240,
        maxWidth: 320,
        bgcolor: "rgba(10,10,14,0.78)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: "#ff5500" }}>
            SoundCloud
          </Typography>
          <FormControl size="small" fullWidth>
            <InputLabel id="soundcloud-track-label">Featured track</InputLabel>
            <Select
              labelId="soundcloud-track-label"
              value={trackUrl}
              label="Featured track"
              onChange={handleChange}
            >
              {tracks.map((track) => (
                <MenuItem key={track.url} value={track.url}>
                  {track.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {embedSrc ? (
            <Box
              component="iframe"
              title="SoundCloud player"
              src={embedSrc}
              sx={{
                border: 0,
                width: "100%",
                height: 120,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.08)",
              }}
              allow="autoplay"
            />
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
