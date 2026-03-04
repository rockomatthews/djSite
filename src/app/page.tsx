import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/lib/content";

export default function Home() {
  return (
    <Box id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "DJ Park City",
            url: "https://djparkcity.com",
            telephone: "+1-435-901-0628",
            areaServed: "Park City, Utah",
            description:
              "Park City's Premier Mobile DJ Service Since 1997. Modern and traditional music with full sound and lighting.",
            sameAs: [],
          }),
        }}
      />
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

      <Box
        id="services"
        sx={{
          position: "relative",
          py: { xs: 8, md: 12 },
          scrollMarginTop: 96,
          backgroundImage: "url(/gallery/parallax.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(8,8,12,0.7)",
          }}
        />
        <Container sx={{ position: "relative", zIndex: 1 }}>
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
      </Box>

      <GallerySection />

      <Box
        id="testimonials"
        sx={{
          bgcolor: "rgba(255,255,255,0.03)",
          py: { xs: 8, md: 12 },
          scrollMarginTop: 96,
        }}
      >
        <Container>
          <Stack spacing={2} textAlign={{ xs: "left", md: "center" }}>
            <Typography variant="h2">Google Reviews</Typography>
            <Typography variant="body1" color="text.secondary">
              Live Reviews from Google
            </Typography>
          </Stack>
          <Box
            sx={{
              mt: 4,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                width: "max-content",
                animation: "reviewsScroll 40s linear infinite",
                "@keyframes reviewsScroll": {
                  from: { transform: "translateX(0)" },
                  to: { transform: "translateX(-50%)" },
                },
              }}
            >
              {[...siteContent.googleReviews.reviews, ...siteContent.googleReviews.reviews].map(
                (review, index) => (
                  <Card
                    key={`${review.author}-${review.time}-${index}`}
                    sx={{
                      minWidth: { xs: 260, md: 320 },
                      maxWidth: 360,
                      flex: "0 0 auto",
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          {review.author[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{review.author}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.time}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 2 }}>
                        {Array.from({ length: review.rating }).map((_, starIndex) => (
                          <StarIcon key={starIndex} sx={{ color: "#fbbc04" }} />
                        ))}
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {review.text}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              )}
            </Box>
          </Box>
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
            Text Me
          </Button>
        </Stack>
        <Stack spacing={2} sx={{ mt: 6 }}>
          <Typography variant="h5">Quick inquiry</Typography>
          <Typography variant="body2" color="text.secondary">
            {siteContent.contact.formHint}
          </Typography>
          <ContactForm />
        </Stack>
      </Container>
    </Box>
  );
}
