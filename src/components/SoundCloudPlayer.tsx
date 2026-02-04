"use client";

import {
  Box,
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
      visual: "false",
    });
    return `https://w.soundcloud.com/player/?${params.toString()}`;
  }, [trackUrl]);

  const handleChange = (event: SelectChangeEvent) => {
    setTrackUrl(event.target.value);
  };

  return (
    <Stack spacing={1} sx={{ minWidth: 220 }}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Select a mix
      </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel id="soundcloud-track-label">Track</InputLabel>
        <Select
          labelId="soundcloud-track-label"
          value={trackUrl}
          label="Track"
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
            height: 60,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.08)",
          }}
          allow="autoplay"
        />
      ) : null}
    </Stack>
  );
}
