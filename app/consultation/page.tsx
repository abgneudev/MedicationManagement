import { Box, Typography, Paper, Button, Grid, Card, CardContent, CardHeader } from "@mui/material"
import { VideoCall, Chat, CalendarMonth, ArrowBack } from "@mui/icons-material"
import Link from "next/link"

export default function ConsultationPage() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button component={Link} href="/" startIcon={<ArrowBack />} variant="text" sx={{ mr: 2 }}>
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1">
          Virtual Consultation
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        Connect with healthcare providers from the comfort of your home. Choose between video or chat consultations.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Video Consultation" />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <VideoCall sx={{ fontSize: 60, color: "primary.main" }} />
                <Typography variant="body1" align="center">
                  Face-to-face consultation with a healthcare provider through secure video call.
                </Typography>
                <Button variant="contained" fullWidth>
                  Start Video Consultation
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Chat Consultation" />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Chat sx={{ fontSize: 60, color: "primary.main" }} />
                <Typography variant="body1" align="center">
                  Text-based consultation for non-urgent medication questions.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Start Chat Consultation
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CalendarMonth sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Schedule a Consultation</Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Can't talk now? Schedule a consultation for a time that works for you.
        </Typography>
        <Button variant="contained">Schedule Appointment</Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Consultation Guidelines
        </Typography>
        <Typography variant="body2" paragraph>
          • Ensure you're in a quiet, private location for your consultation
        </Typography>
        <Typography variant="body2" paragraph>
          • Have your medication list and any questions ready
        </Typography>
        <Typography variant="body2" paragraph>
          • Check your internet connection before starting a video consultation
        </Typography>
        <Typography variant="body2" paragraph>
          • For urgent medical issues, please call emergency services
        </Typography>
      </Paper>
    </Box>
  )
}
