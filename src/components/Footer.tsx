import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { siteContent } from "@/lib/content";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <Container>
        <Stack spacing={2} alignItems={{ xs: "flex-start", md: "center" }}>
          <Typography variant="h6">{siteContent.brand.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {siteContent.brand.tagline}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Link href={siteContent.brand.phoneLink} color="inherit" underline="hover">
              {siteContent.brand.phone}
            </Link>
            <Link href={`mailto:${siteContent.brand.email}`} color="inherit" underline="hover">
              {siteContent.brand.email}
            </Link>
            <Link href={siteContent.brand.bookingUrl} color="inherit" underline="hover">
              Bookings
            </Link>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {new Date().getFullYear()} {siteContent.brand.name}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
