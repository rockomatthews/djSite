import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, bgcolor: "transparent" }}>
      <Container>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" color="text.secondary">
            © 3030 |
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 200ms ease",
              transformOrigin: "center bottom",
              "&:hover": {
                transform: "translateY(-36px) scale(4)",
              },
            }}
          >
            <Image
              src="/gallery/rocketshipSites.png"
              alt="Rocketship Sites logo"
              width={48}
              height={48}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
