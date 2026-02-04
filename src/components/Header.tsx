import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { siteContent } from "@/lib/content";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(10,10,14,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Toolbar disableGutters>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            py: 1,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
            <Box>
              <Typography variant="subtitle1">{siteContent.brand.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {siteContent.brand.tagline}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{ fontSize: 14 }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            <SoundCloudPlayer tracks={siteContent.soundcloud.tracks} />
            <Button
              href={siteContent.brand.bookingUrl}
              variant="contained"
              color="primary"
            >
              Book Now
            </Button>
          </Stack>
        </Container>
      </Toolbar>
      <Box sx={{ display: { xs: "block", lg: "none" }, pb: 2 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <SoundCloudPlayer tracks={siteContent.soundcloud.tracks} />
          <Button
            href={siteContent.brand.bookingUrl}
            variant="contained"
            color="primary"
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </AppBar>
  );
}
