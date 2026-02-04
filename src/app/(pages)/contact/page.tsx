import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { siteContent } from "@/lib/content";

export default function ContactPage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Typography variant="h2">Contact & Booking</Typography>
          <Typography variant="body1" color="text.secondary">
            {siteContent.contact.formHint}
          </Typography>
          <Stack spacing={2} component="form">
            <TextField label="Name" fullWidth required />
            <TextField label="Email" type="email" fullWidth required />
            <TextField label="Event Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Event Details" multiline rows={4} fullWidth />
            <Button variant="contained" size="large">
              Send Inquiry
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Or call/text {siteContent.brand.phone}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
