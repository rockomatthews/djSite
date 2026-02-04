import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { siteContent } from "@/lib/content";

export default function AboutPage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Stack spacing={2} maxWidth={720}>
          <Typography variant="h2">{siteContent.about.headline}</Typography>
          <Typography variant="body1" color="text.secondary">
            {siteContent.about.bio}
          </Typography>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.about.stats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography variant="h4">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
