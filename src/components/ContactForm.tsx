import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const PRIMARY_EMAIL = "robmatthews1085@gmail.com";
const SMS_GATEWAY_EMAIL = "8478584859@txt.att.net";

export default function ContactForm() {
  return (
    <Box
      component="form"
      action={`https://formsubmit.co/${PRIMARY_EMAIL}`}
      method="POST"
    >
      <input type="hidden" name="_cc" value={SMS_GATEWAY_EMAIL} />
      <input type="hidden" name="_subject" value="New DJ Inquiry" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <Stack spacing={2}>
        <TextField label="Name" name="name" fullWidth required />
        <TextField label="Email" name="email" type="email" fullWidth required />
        <TextField label="Phone (optional)" name="phone" fullWidth />
        <TextField
          label="Event Date"
          name="eventDate"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Event Details"
          name="eventDetails"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" size="large">
          Send Inquiry
        </Button>
        <Typography variant="caption" color="text.secondary">
          You will receive a confirmation email once FormSubmit is connected.
        </Typography>
      </Stack>
    </Box>
  );
}
