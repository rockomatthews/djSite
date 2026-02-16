"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventDetails: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  eventDetails: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Failed to send message.");
      }

      setStatus("success");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" fullWidth required value={formState.name} onChange={handleChange("name")} />
        <TextField label="Email" type="email" fullWidth required value={formState.email} onChange={handleChange("email")} />
        <TextField label="Phone (optional)" fullWidth value={formState.phone} onChange={handleChange("phone")} />
        <TextField
          label="Event Date"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formState.eventDate}
          onChange={handleChange("eventDate")}
        />
        <TextField
          label="Event Details"
          multiline
          rows={4}
          fullWidth
          required
          value={formState.eventDetails}
          onChange={handleChange("eventDetails")}
        />
        <Button type="submit" variant="contained" size="large" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Inquiry"}
        </Button>
        {status === "success" ? (
          <Typography variant="body2" color="secondary.main">
            Thanks! Your message was sent.
          </Typography>
        ) : null}
        {status === "error" ? (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}
