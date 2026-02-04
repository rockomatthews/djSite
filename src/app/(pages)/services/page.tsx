import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { siteContent } from "@/lib/content";

export default function ServicesPage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Stack spacing={2} maxWidth={720}>
          <Typography variant="h2">Services & Packages</Typography>
          <Typography variant="body1" color="text.secondary">
            Flexible packages with tailored playlists, MC services, and on-site
            coordination.
          </Typography>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.services.map((service) => (
            <Grid item xs={12} md={4} key={service.title}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
