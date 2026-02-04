import { Button, Stack } from "@mui/material";

type CTA = {
  label: string;
  href: string;
  variant: "contained" | "outlined" | "text";
};

type CTAButtonsProps = {
  ctas: CTA[];
};

export default function CTAButtons({ ctas }: CTAButtonsProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ width: { xs: "100%", sm: "auto" } }}
    >
      {ctas.map((cta) => (
        <Button
          key={cta.label}
          href={cta.href}
          variant={cta.variant}
          size="large"
          color={cta.variant === "outlined" ? "secondary" : "primary"}
          fullWidth
        >
          {cta.label}
        </Button>
      ))}
    </Stack>
  );
}
