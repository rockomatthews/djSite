import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import { siteContent } from "@/lib/content";

export default function Home() {
  return (
    <Box id="top">
      <Hero />

      <Container id="about" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 96 }}>
        <Stack spacing={2} maxWidth={720} sx={{ mb: 4 }}>
          <Typography variant="h2">{siteContent.about.headline}</Typography>
          <Typography variant="body1" color="text.secondary">
            {siteContent.about.bio}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {siteContent.about.stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container id="services" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 96 }}>
        <Stack spacing={2} textAlign={{ xs: "left", md: "center" }}>
          <Typography variant="h2">Services built for every crowd</Typography>
          <Typography variant="body1" color="text.secondary">
            Custom setlists, clean transitions, and a polished presence.
          </Typography>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.services.map((service) => (
            <Grid size={{ xs: 12, md: 4 }} key={service.title}>
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

      <GallerySection />

      <Box id="testimonials" sx={{ bgcolor: "rgba(255,255,255,0.03)", py: { xs: 8, md: 12 }, scrollMarginTop: 96 }}>
        <Container>
          <Stack spacing={2} textAlign={{ xs: "left", md: "center" }}>
            <Typography variant="h2">Testimonials</Typography>
            <Typography variant="body1" color="text.secondary">
              Trusted by couples, brands, and nightlife teams.
            </Typography>
          </Stack>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {siteContent.testimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 6 }} key={testimonial.name}>
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

      <Container id="contact" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 96 }}>
        <Stack spacing={2} textAlign={{ xs: "left", md: "center" }}>
          <Typography variant="h2">Booking & availability</Typography>
          <Typography variant="body1" color="text.secondary">
            {siteContent.contact.availability}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button variant="contained" href={siteContent.brand.phoneLink} size="large">
            Call {siteContent.brand.phone}
          </Button>
          <Button variant="outlined" href={siteContent.brand.smsLink} size="large">
            Text Us
          </Button>
          <Button variant="contained" href={siteContent.brand.bookingUrl} size="large">
            Book a Date
          </Button>
        </Stack>
        <Stack spacing={2} component="form" sx={{ mt: 6 }}>
          <Typography variant="h5">Quick inquiry</Typography>
          <Typography variant="body2" color="text.secondary">
            {siteContent.contact.formHint}
          </Typography>
          <Stack spacing={2}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Event Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Event Details" multiline rows={4} fullWidth />
            <Button variant="contained" size="large">
              Send Inquiry
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
