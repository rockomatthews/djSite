import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { siteContent } from "@/lib/content";

export default function TestimonialsPage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Stack spacing={2} maxWidth={720}>
          <Typography variant="h2">Testimonials</Typography>
          <Typography variant="body1" color="text.secondary">
            Real feedback from clients and event partners.
          </Typography>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.name}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Typography variant="body1">“{testimonial.quote}”</Typography>
                  <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {testimonial.event}
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
