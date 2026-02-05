import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import CTAButtons from "@/components/CTAButtons";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";
import VideoBackground from "@/components/VideoBackground";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero, mediaPreview } = siteContent;

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
      <VideoBackground
        youtubeId={hero.video.youtubeId}
        posterUrl={hero.video.posterUrl}
        is360={hero.video.is360}
        musicLabel={hero.musicToggleLabel}
      />
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
        <Box
          sx={{
            position: { xs: "static", md: "absolute" },
            top: { md: 40 },
            right: { md: 40 },
            mb: { xs: 4, md: 0 },
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <SoundCloudPlayer tracks={siteContent.soundcloud.tracks} />
        </Box>
        <Stack spacing={4} maxWidth={680}>
          <Stack spacing={2}>
            <Typography variant="overline" sx={{ color: "secondary.main" }}>
              {siteContent.brand.location}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}>
              {hero.headline}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {hero.subheadline}
            </Typography>
          </Stack>

          <CTAButtons ctas={hero.ctas} />

          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              bgcolor: "rgba(18,18,25,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
                {mediaPreview.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {mediaPreview.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                {mediaPreview.tracklist.join(" • ")}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
