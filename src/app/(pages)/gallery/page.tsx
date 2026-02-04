import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { siteContent } from "@/lib/content";

export default function GalleryPage() {
  return (
    <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Typography variant="h2">Gallery & Highlights</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Moments from packed dance floors, curated soundscapes, and client events.
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {siteContent.gallery.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card sx={{ height: "100%", bgcolor: "background.paper" }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.caption}
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
